// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const refreshButton = document.querySelector(".refresh-btn");
const quoteSpace = document.querySelector(".quote-text");
const quoteBox = document.querySelector(".quote-div");


// Event Listeners
document.addEventListener("DOMContentLoaded",getTodos)
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);
refreshButton.addEventListener("click",refreshList);

// Functions
function addTodo(event){
    // to prevent form from submitting
    event.preventDefault();
    // New todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    const newTodo= document.createElement("li");
    newTodo.innerText=todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add todo to local storage
    saveTodoLocal(todoInput.value);

    // Check mark complete todoButton
    const completeButton= document.createElement("button");
    completeButton.innerHTML='<i class="fas fa-check" ></i>';
    completeButton.classList.add("complete-btn");
    completeButton.setAttribute("data-toggle", "modal");
    completeButton.setAttribute("data-target", "myModal");
    todoDiv.appendChild(completeButton);

    // delete todoButton
    const deleteButton= document.createElement("button");
    deleteButton.innerHTML='<i class="fas fa-trash"></i>';
    deleteButton.classList.add("del-btn");
    todoDiv.appendChild(deleteButton);

    //append to todoList
    todoList.appendChild(todoDiv);

    // Clear todo input
    todoInput.value = "";
}

// function to delete or check as completed
function deleteCheck(e){
    const item = e.target;
    // delete todo
    if (item.classList[0]==="del-btn"){
        const todoCasing = item.parentElement;
        //add animation
        todoCasing.classList.add("fall");
        //remove from local localStorage
        removeLocalTodos(todoCasing);
        // remove element
        todoCasing.addEventListener("transitionend",function(){
            todoCasing.remove();
        })
    }

    //check mark
    if (item.classList[0]==="complete-btn"){
        const todoCasing = item.parentElement;
        todoCasing.classList.toggle("completed");
        saveCompletedTodoLocal(todoCasing.firstElementChild.innerText);
        removeLocalTodos(todoCasing);
        getQuotes();
        
    }

}

//function to filter todos
function filterTodo(e){
    // const todos = todoList.childNodes;
    // console.log(todos);
    const todos = todoList.children;
    for (i=0; i<=todos.length-1; i++){
        switch (e.target.value) {
            case "all":
                todos[i].style.display = "flex";
                
                break;

            case "completed":
                if(todos[i].classList.contains("completed")){
                    todos[i].style.display = "flex";
                }else{
                    todos[i].style.display = "none";
                }

                break;

            case "uncompleted":
                if(!todos[i].classList.contains("completed")){
                    todos[i].style.display = "flex";
                }else{
                    todos[i].style.display = "none";
                }

                break;
        
            default:
                break;
        }
    }
}

//function to save the todos to local storage
function saveTodoLocal(todo){
    //check do i have anything in there
    let todos ;
    if (localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

//function to save the todos to local storage for completed todos
function saveCompletedTodoLocal(todo){
    //check do i have anything in there that is completed
    let todosCompleted ;
    if (localStorage.getItem("todosCompleted")===null){
        todosCompleted = [];

    }else{
        todosCompleted = JSON.parse(localStorage.getItem("todosCompleted"));
    }

    todosCompleted.push(todo);
    localStorage.setItem("todosCompleted",JSON.stringify(todosCompleted));


    
}

//function to get todos from local storage and display it again
function getTodos(todo){
    //check do i have anything in there 
    let todos ;
    if (localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todosCompleted = JSON.parse(localStorage.getItem("todosCompleted"));
    todos.forEach(function(todo){

        //if (!todosCompleted.includes(todo)){
            // New todo div
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");

            // create li
            const newTodo= document.createElement("li");
            newTodo.innerText=todo;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);

            // Check mark complete todoButton
            const completeButton= document.createElement("button");
            completeButton.innerHTML='<i class="fas fa-check"></i>';
            completeButton.classList.add("complete-btn");
            todoDiv.appendChild(completeButton);

            // delete todoButton
            const deleteButton= document.createElement("button");
            deleteButton.innerHTML='<i class="fas fa-trash"></i>';
            deleteButton.classList.add("del-btn");
            todoDiv.appendChild(deleteButton);

            //append to todoList
            todoList.appendChild(todoDiv);
        //}
        
    })
}

//function to remove local todos
function removeLocalTodos(todo) {
    //check do i have anything in there
    let todos ;
    if (localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));

}

// function to refresh list and remove completed todos
function refreshList(){

    //check do i have anything in there that is completed
    let todosCompleted ;
    if (localStorage.getItem("todosCompleted")===null){
        todosCompleted = [];

    }else{
        todosCompleted = JSON.parse(localStorage.getItem("todosCompleted"));
    }

    if (todosCompleted===[]){
        window.alert("Hey there🙋‍♂️, there is no completed todos to clear up yet");
    }else{
        todosCompleted=[];
        localStorage.setItem("todosCompleted",JSON.stringify(todosCompleted));
        window.alert("Whoop Whoop 🤩🤩, well done your completed todos have been cleared from local storage. Now set more goals to accomplish💪🤘");
        
        
    }   

}

// function to remove completed todos from list of todos
function removeCompleted(){
    //check do i have anything in there
    let todos ;
    if (localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //check do i have anything in there that is completed
    let todosCompleted ;
    if (localStorage.getItem("todosCompleted")===null){
        todosCompleted = [];

    }else{
        todosCompleted = JSON.parse(localStorage.getItem("todosCompleted"));
    }

    for (i=0; i<=todos.length-1; i++){
        if (todosCompleted.includes(todos[i])){
            todos.splice(todos.indexOf(todos[i]),1);
        }
        
    }

    localStorage.setItem("todos",JSON.stringify(todos));
}


// function to get random number to randomize quote
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//AJAX functions here:
const getQuotes = async () => {
    const urlToFetch = "https://type.fit/api/quotes";
    const usedNumber= randomIntFromInterval(1,300);
    try {
      const response = await fetch(urlToFetch);
      if (response.ok){
        // console.log(response);
        const jsonResponse = await response.json();

        // console.log(usedNumber);
        const quote = jsonResponse[usedNumber].text;
        const author = jsonResponse[usedNumber].author;
        quoteSpace.innerText = quote+" "+author;
        // window.alert(quote+" "+author);
  
      }
    } catch (error) {
      console.log(error);
    }

    quoteBox.style.display="block";
    setTimeout(function(){ quoteBox.style.display="none"; }, 5000);
  
}