import "./style.css";
import { format, compareAsc } from "date-fns";
import {TodoTask, TodoList, ListsContainer} from "./list-logic.js";

/** 

const walkDog = new TodoTask("walk dog", "Describe walk dog", "02/11/2014", "Notes to walk dog");
walkDog.setPriorityHigh();
walkDog.setStatusComplete();
walkDog.printTask();


const walkDog2 = new TodoTask("walk dog2", "Describe walk dog2", "13/11/2014", "Notes to walk dog2");
walkDog2.setPriorityLow();
walkDog2.setStatusToDo();
walkDog2.printTask();



const walkDogList = new TodoList("walkDogList");
walkDogList.addTask(walkDog);
walkDogList.addTask(walkDog2);
walkDogList.printList();

const walkDogList2 = new TodoList("walkDogList2");
walkDogList2.addTask(walkDog2);

const lists = new ListsContainer();
lists.addList(walkDogList);
lists.addList(walkDogList2);
lists.printLists();
lists.removeList(0);

console.log("1 list removed:")
lists.printLists();

*/

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




/* 
    Function to display the contents of a single list in the main-dispaly div 
    Event listener added to each list-button in the To-Do Lists sidebar
*/

function displayList(list){

    //Remove default text
    mainDisplayDefaultText.style.display = "none";

    //Create div to display list contents
    const listContents = document.createElement("div");
    const listHeader = document.createElement("h1");
    listHeader.textContent = list.name;

    //Loop through the list and display all tasks
    list.forEach((task) => {
        //Code to display the tasks. Will call functions from list-logic.js
    })

}

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
    const newTask = new TodoTask(taskName, taskDescription, dueDate, taskNotes);

    //Add new task to the current list
    TodoLists.getActiveList().addTask(newTask);

    //Show add task button, hide form.
    addTaskButton.style.display = "block";
    addTaskForm.style.display = "none";


})
