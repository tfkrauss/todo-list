import "./style.css";
import { format, compareAsc } from "date-fns";
import {TodoTask, TodoList, ListsContainer} from "./list-logic.js";


//Lists array holding all todo lists
const TodoLists = new ListsContainer();

const listModal = document.querySelector("#list-modal-container");
const createListButton = document.querySelector("#create-list-button");
const closeModalButton = document.querySelector("#close-modal-button");
const submitModalButton = document.querySelector("#submit-modal-button");
const sidebarList = document.querySelector("#todo-lists");
const mainDisplayDefaultText = document.querySelector("#main-display-default-text");

let listNameInput = document.querySelector("#list-name");    //list-name input


/*

    Code for the To-Do lists sidebar. Includes buttons, modals, lists display.

*/

//Event listener to hide the create list button and display the list creation modal
createListButton.addEventListener("click", () => {
    listModal.style.display = "flex";
    createListButton.style.display = "none";
})


 
//Function to close the create list modal
function closeListModal(){
    listModal.style.display = "none";
    createListButton.style.display = "block";
}
closeModalButton.addEventListener("click", () => closeListModal())

//Function to submit the created list. Adds to lists array and displays on page.
submitModalButton.addEventListener("click", () => {

    const listName = listNameInput.value
    //If empty string, do nothing.
    if(listName.trim() === "" ){
        return;
    }



    const newList = new TodoList(listName);

    //Add a new list to lists array
    TodoLists.addList(newList);
    console.log("Printing lists:  ");
    TodoLists.printLists();

    TodoLists.setActiveList(newList);

    renderSidebarLists(TodoLists);
    listNameInput.value = "";    //clear input
    closeListModal();
})







function renderSidebarLists(lists){

    sidebarList.innerHTML = "";

    const listsArray = lists.getLists();

    listsArray.forEach((list) => {
        //Add a list button in the To-Do lists
        const newListButton = document.createElement("button");
        newListButton.className = "list-button"
        newListButton.textContent = list.name;
        sidebarList.appendChild(newListButton);


    })
}


const addTaskButton = document.querySelector("#add-task-button");
/*
** Event listener for add task button.
** Add task to current list. Display list. Hide the form and show the add task button.
*/
const addTaskForm = document.querySelector("#add-task-form");
addTaskButton.addEventListener("click", () => {


    //
    addTaskButton.style.display = "none";
    addTaskForm.style.display = "flex";

})

const taskNameInput = document.querySelector("#task-name");
const taskDescriptionInput = document.querySelector("#task-description");
const taskNotesInput = document.querySelector("#task-notes");
const priorityInput = document.querySelector("#priority");
const dueDateInput = document.querySelector("#due-date");

const createTaskButton = document.querySelector("#create-task-button");
createTaskButton.addEventListener("click", (event) => {

    //Ensure required fields are filled
    let isValidForm = addTaskForm.checkValidity();
    if(isValidForm){
        event.preventDefault(); //Prevent page refresh upon submission
    } else{
        return;
    }

    //Get all inputs
    const taskName = taskNameInput.value;
    console.log("Task name " + taskName);
    const taskDescription = taskDescriptionInput.value;
    console.log("Task description " + taskDescription);
    const taskNotes = taskNotesInput.value;
    console.log("Task notes " + taskNotes);
    const taskPriority = priorityInput.value;
    console.log("Task prio " + taskPriority);
    const dueDate = dueDateInput.value;
    console.log("Task due date " + dueDate);

    //Create the new task
    const newTask = new TodoTask(taskName, taskDescription, dueDate, taskNotes, taskPriority);

    //Add new task to the current list
    const currentList = TodoLists.getActiveList();
    currentList.addTask(newTask);
    displayList(currentList);

    //Show add task button, hide form.
    addTaskButton.style.display = "block";
    addTaskForm.style.display = "none";


})

const listTasksContainer = document.querySelector("#list-tasks-container");

function displayTask(task){

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const priorityButton = document.createElement("button");
    priorityButton.classList.add("priority-button");

    const taskTextContainer = document.createElement("div");
    taskTextContainer.classList.add("task-text");

    const taskNameText = document.createElement("p");
    taskNameText.textContent = task.getName();
    taskNameText.classList.add("task-name-text");
    const taskDescriptionText = document.createElement("p");    
    taskDescriptionText.textContent = task.getDescription();
    taskDescriptionText.classList.add("task-description-text");
    const taskDateText = document.createElement("p");
    taskDateText.textContent = task.getDueDate();
    taskDateText.classList.add("due-date-text");
    const taskNoteText = document.createElement("p");
    taskNoteText.textContent = task.getNotes();
    taskNoteText.classList.add("task-note-text");
    //CHANGE PRIORITY DISPLAY EVENTUALLY
    const taskPriorityText = document.createElement("p");
    taskPriorityText.textContent = task.getPriority();
    console.log("Task priority   text content  :    " + task.getPriority())
    taskPriorityText.classList.add("task-priority-display");

    listTasksContainer.appendChild(taskContainer);
    taskContainer.appendChild(priorityButton);
    taskContainer.appendChild(taskTextContainer);
    taskTextContainer.appendChild(taskNameText);
    taskTextContainer.appendChild(taskDescriptionText);
    taskTextContainer.appendChild(taskDateText);
    taskTextContainer.appendChild(taskNoteText);
    taskTextContainer.appendChild(taskPriorityText);
}

/* 
    Function to display the contents of a single list in the main-dispaly div 
    Event listener added to each list-button in the To-Do Lists sidebar
*/

function displayList(TodoList){

    const list = TodoList.getList();

    listTasksContainer.innerHTML = "";

    list.forEach(task => {
        displayTask(task);
    })
}