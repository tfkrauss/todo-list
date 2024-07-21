import { format, compareAsc } from "date-fns";


/* 
    Class to create an invidivual task object.

*/
export class TodoTask{

    static COMPLETE = 1;
    static IN_PROG = 0;
    static TO_DO = 2;

    static HIGH = 2;
    static MED = 1;
    static LOW = 0;

    //Takes in args as strings. Priority and status must be set via methods after object creation.
    constructor(title, description, dueDate, notes){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority; 
        this.status; 
        this.notes = notes;
        this.id;    //FIGURE OUT HOW TO ASSIGN ID
    }

    //Method to set the id of the task object. Used in the TodoList object.
    setId(id){
        this.id = id;
    }

    //Methods to change the priority
    setPriorityHigh(){
        this.priority = TodoTask.HIGH;
    }
    setPriorityMed(){
        this.priority = TodoTask.MED;
    }
    setPriorityLow(){
        this.priority = TodoTask.LOW;
    }

    //Methods to change status
    setStatusComplete(){
        this.status = TodoTask.COMPLETE;
    }
    setStatusInProg(){
        this.status = TodoTask.IN_PROG;
    }
    setStatusToDo(){
        this.status = TodoTask.TO_DO;
    }

    //Method invoked when editing a task. Priority & status are changed seperately by invoking methods
    editTask(title, description, dueDate, notes){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.notes = notes;
    }

    //Print all attributes
    printTask(){
        console.log(this.title + this.description + this.dueDate + this.notes + this.priority + this.status);
    }
}

/* 
    Class to create an individual TodoList.
    A todo list is an array of task objects. Individual tasks are retrieved by ID.
*/

export class TodoList{

    //Initialize TodoList with an empty list. List contains task objects
    constructor(name){
        this.list = [];
        this.name = name;
        this.id = null;
        this.nextTaskId = 0;
    }

    //Method to set the id of the TodoList object.
    setId(id){
        this.id = id;
    }

    //Method to set task id. Invoked upon adding task to list array.
    setTaskId(task){
        task.setId(this.nextTaskId);
        this.nextTaskId++;
    }

    //Add a task to list.
    addTask(task){
        this.setTaskId(task);
        this.list.push(task);
    }

    //Function to remove a task from a list. Given a task id, loops through the list to find the task and index. Uses splice to remove task from list array.
    removeTask(taskId){
        this.list.forEach((task, index) => {
            if(task.id === taskId){
                this.list.splice(index, 1);
            }
        })
    }

    //Function to print all tasks
    printList(){
        this.list.forEach((task) => {
            task.printTask();
        })
    }

    getName(){
        return this.name;
    }

}


/*
    Class to create container for all TodoLists
*/

export class ListsContainer{

    //Initialize array to contain all lists
    constructor(){
        this.listsArray = [];
        this.nextListId = 0;
        this.activeList = null;    //Pointer to the currently selected list. 
    }

    //Method to add a list
    addList(list){        
        this.setListId(list);
        this.listsArray.push(list);
        console.log("Added list", list)
        console.log("Current lists array:", this.listsArray);
    }

    //Method to assign an id to a list. Invoked upon adding a list object.
    setListId(list){
        list.setId(this.nextListId);
        this.nextListId++;
    }

    //Method to remove list. Loop through listsArray, splice to remove given list. 
    removeList(listId){
        this.listsArray.forEach((list, index) => {
            if(list.id === listId){
                this.listsArray.splice(index, 1);
            }
        })
    }

    printLists(){
        this.listsArray.forEach((list) => {
            console.log(list.getName());
        })
    }

    //Returns index of the list
    getList(listId){
        return this.listsArray.find(list => listId===list.id) || null;
    }

    //Return the full lists array
    getLists(){
        return this.listsArray;
    }

    //Setter to change the active list pointer. Invoked upon clicking a new list from sidebar
    setActiveList(list){
        this.activeList = list;
    }

    //Getter for active list.
    getActiveList(){
        return this.activeList;
    }


}