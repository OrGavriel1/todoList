import { createTodoHTML } from "./createUi";

let todoList = [];
fatchList();
createListElement();
// storeList();
let btnAddTodo = document.getElementById("btnAddTodo");

function fatchList() {
  let tempList = JSON.parse(localStorage.getItem("todoList"));

  if (tempList) {
    // add editToggle property to all objects in the array
    const todoListData = tempList.map((el) => {
      el.editToggle = false;
      return el;
    });
    todoList = todoListData;
  }
}
function createListElement() {
  todoList.map((todo) => {
    createTodoHTML(todo);
  });
}

btnAddTodo.addEventListener("click", () => {
  let inputTodo = document.getElementById("inputTodo");
  const todoText = inputTodo.value;
  if (todoText) addTodo(todoText);
  inputTodo.value = "";
});

function addTodo(todoText) {
  let count = 0;
  if (todoList.length) {
    const lastIndex = todoList.length - 1;
    count = todoList[lastIndex].id + 1;
  }
  let tempTodo = {
    text: todoText,
    complete: false,
    id: count,
    editToggle: false
  };
  todoList.push(tempTodo);
  createTodoHTML(tempTodo);
  storeList();
}

function storeList() {
  const todoListData = todoList.map((el) => {
    // remove editToggle from every element in the todo array
    const { editToggle, ...todoData } = el;
    return todoData;
  });
  localStorage.setItem("todoList", JSON.stringify(todoListData));
}
// checkbox event
function onCompleTgl(event) {
  const targetId = event.target.id.split("-")[1];
  const currentLi = document.getElementById(`todo-${targetId}`);
  const checkBtnHtml = document.getElementById(`checkbox-${targetId}`);
  const todo = getTodo(targetId);
  // change local
  todo.complete = !todo.complete;
  storeList();
  if (todo.complete) {
    checkBtnHtml.style.color = "blue";
    currentLi.classList.add("complete");
  } else {
    checkBtnHtml.style.color = "rgb(197, 197, 255)";
    currentLi.classList.remove("complete");
  }
}
function onEditToggle(event) {
  const targetId = event.target.id.split("-")[1];
  const todo = getTodo(targetId);
  const checkbox = document.getElementById(`checkbox-${targetId}`);
  const txtHTML = document.getElementById(`text-${targetId}`);
  const inputHTML = document.getElementById(`input-${targetId}`);
  const saveBtnHtml = document.getElementById(`save-${targetId}`);
  // const editBtnHTML = document.getElementById(`edit-${targetId}`);
  const delBtnHTML = document.getElementById(`delete-${targetId}`);

  if (todo.editToggle) {
    todo.text = inputHTML.value;
    txtHTML.innerHTML = todo.text;
    storeList();
  }
  todo.editToggle = !todo.editToggle;

  checkbox.style.visibility = todo.editToggle ? "hidden" : "visible";
  txtHTML.style.display = todo.editToggle ? "none" : "block";
  inputHTML.style.display = todo.editToggle ? "block" : "none";
  // editBtnHTML.innerHTML = todo.editToggle ? "שמירה" : "עריכה";
  saveBtnHtml.style.visibility = todo.editToggle ? "visible" : "hidden";
  delBtnHTML.style.display = todo.editToggle ? "none" : "block";
}
function deleteTodo(event) {
  const targetId = event.target.id.split("-")[1];
  const selectedLi = document.getElementById(`todo-${targetId}`);
  const index = getTodoIndex(targetId);

  todoList.splice(index, 1); // local data
  selectedLi.remove(); // ui
  storeList(); // server data
}
function getTodoIndex(id) {
  return todoList.findIndex((el) => el.id == id);
}
function getTodo(id) {
  return todoList.find((el) => el.id == id);
}

export { onCompleTgl, onEditToggle, deleteTodo };
