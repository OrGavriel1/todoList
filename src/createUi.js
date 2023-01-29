import { onCompleTgl, deleteTodo, onEditToggle } from "./index";

// function createCheckBox(todo) {
//   let checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.checked = todo.complete;
//   checkbox.setAttribute("id", `checkbox-${todo.id}`);
//   checkbox.addEventListener("change", onCompleTgl);
//   checkbox.classList.add("todoCB");

//   return checkbox;
// }
function createCheckBox(todo) {
  let checkbox = document.createElement("i");
  checkbox.classList.add("fa", "fa-check");
  checkbox.checked = todo.complete;
  checkbox.setAttribute("id", `checkbox-${todo.id}`);
  checkbox.addEventListener("click", onCompleTgl);
  checkbox.classList.add("todoCB");

  return checkbox;
}

function createText(todo) {
  let txtHTML = document.createElement("p");
  txtHTML.innerHTML = todo.text;
  txtHTML.setAttribute("id", `text-${todo.id}`);
  txtHTML.classList.add("todoText");
  txtHTML.addEventListener("click", onEditToggle);
  return txtHTML;
}
function createInput(todo) {
  let inputHTML = document.createElement("input");
  inputHTML.setAttribute("id", `input-${todo.id}`);
  inputHTML.value = todo.text;
  inputHTML.style.display = "none";
  inputHTML.classList.add("todoInput");
  inputHTML.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      onEditToggle(e);
    }
  });

  return inputHTML;
}
// function createEditBtn(todo) {
//   let editBtnHTML = document.createElement("button");
//   editBtnHTML.setAttribute("id", `edit-${todo.id}`);
//   editBtnHTML.addEventListener("click", onEditToggle);
//   // editBtnHTML.innerHTML = "עריכה";
//   editBtnHTML.classList.add("todoEdit");
//   editBtnHTML.style.visibility = "hidden";

//   return editBtnHTML;
// }
function createSaveBtn(todo) {
  let saveBtnHTML = document.createElement("button");
  saveBtnHTML.setAttribute("id", `save-${todo.id}`);
  saveBtnHTML.addEventListener("click", onEditToggle);
  saveBtnHTML.classList.add("todoSave");
  saveBtnHTML.style.visibility = "hidden";
  saveBtnHTML.classList.add("icon-save");

  return saveBtnHTML;
}

function createDltBtn(todo) {
  let delBtnHTML = document.createElement("button");
  delBtnHTML.setAttribute("id", `delete-${todo.id}`);
  delBtnHTML.addEventListener("click", deleteTodo);
  delBtnHTML.classList.add("todoDlt");
  delBtnHTML.classList.add("fa", "fa-remove");

  return delBtnHTML;
}
function CreateDiv(todo) {
  let divHTML = document.createElement("div");
  divHTML.setAttribute("id", `group1-${todo.id}`);
  divHTML.classList.add("group1");
  divHTML.appendChild(createCheckBox(todo));
  divHTML.appendChild(createText(todo));
  divHTML.appendChild(createInput(todo));

  return divHTML;
}

function createTodoHTML(todo) {
  const todosListHTML = document.getElementById("todosList");

  let liHTML = document.createElement("li");
  liHTML.setAttribute("id", `todo-${todo.id}`);
  liHTML.classList.add("hbox");
  liHTML.classList.add("todoLi");

  liHTML.appendChild(CreateDiv(todo));
  // liHTML.appendChild(createEditBtn(todo));
  liHTML.appendChild(createSaveBtn(todo));

  liHTML.appendChild(createDltBtn(todo));

  todosListHTML.appendChild(liHTML);
}

export {
  createTodoHTML,
  createSaveBtn /*,createEditBtn*/,
  createDltBtn,
  createInput,
  createText
};
