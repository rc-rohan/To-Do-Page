// Selectors
const newTask= document.getElementById('new-task');
const filterTask=document.getElementById('filter-task');
const addTask=document.querySelector('.btn');//add task btn
const clearTask=document.querySelector('.clear-btn');
const addList=document.querySelector('.to-do');//ul selector
const form=document.querySelector('.task-form');



// Load the Previuos tasks
document.addEventListener('DOMContentLoaded',function(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {

            //create li element
            const li = document.createElement('li');
            //create the text node append to li
            li.appendChild(document.createTextNode(task));
            // adding class
            li.className = 'new-task'
            // creating the a element inside the li
            const link = document.createElement("a");
            link.className = 'delete-item';
            link.setAttribute('href', '#');
            // adding i tag inside link
            link.innerHTML = "&#10008;";
            
            // append the link to ul
            li.appendChild(link);

            // append li to ul
            addList.append(li);
         
    });
});


// add Events Listener
form.addEventListener('submit',function(e) {
    
    if(newTask.value===''){
        alert('Add a Task');
    }
    else{
        //create li element
        const li = document.createElement('li');
        //create the text node append to li
        li.appendChild(document.createTextNode(newTask.value));
        // adding class
        li.className= 'new-task'
        // creating the a element inside the li
        const link = document.createElement("a");
        link.className = 'delete-item';
        link.setAttribute('href','#');
        // adding i tag inside link
        link.innerHTML = "&#10008;";
        
        // append li to ul
        addList.append(li);
        // append the link to ul
        li.appendChild(link);

        //store the values in the local storage
        storeTask(newTask.value);
        // clearing the input
        newTask.value = '';   

    }   
    // to prevent the redirect of the page or to prevent the page from submitting the value as we will be taking all the actions
    e.preventDefault();
});

function  storeTask(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


// cancel link listener
addList.addEventListener('click',function(e) {
    // here we will be using event deligation i.e. if we click anywhere in ul we will be listining

    if(e.target.classList.contains('delete-item')){
        // used the if statement to get the click only upon the a tag
        e.target.parentElement.remove();
        
        // remove task from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement);
        
    }
});

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        let text1=taskItem.textContent;
        // getting only the content of the of the li but not the cancel button
        let text2=text1.substr(0,text1.length-1);
        if (text2 === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear task btn
clearTask.addEventListener('click' ,function(){
    while(addList.firstChild){
        addList.removeChild(addList.firstChild);
    }
    // Clear from LS
    clearTasksFromLocalStorage();
});

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// fliter Tasks
filterTask.addEventListener('keyup',function(e){
    // getting the value from the input 
    const text =e.target.value.toLowerCase();

    // getting the value form the li availabel
    document.querySelectorAll('.new-task').forEach(function name(task) {
       const item=task.firstChild.textContent;
       if(item.toLowerCase().indexOf(text) !=-1){
           task.style.display='flex';
       } else{
           task.style.display='none';
       }
    });
    console.log(text);
});


