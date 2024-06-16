const tasks = [
  { title: "Comprar comida para o gato", type: "Urgente" },
  { title: "Consertar Computador", type: "Importante" },
  { title: "Beber água", type: "Normal" },
  { title: "Enviar relatório trimestral", type: "Importante" },
  { title: "Fazer exercícios físicos", type: "Normal" },
  { title: "Agendar consulta médica", type: "Urgente" },
  { title: "Ler pelo menos um capítulo de um livro", type: "Normal" },
  { title: "Limpar a despensa", type: "Importante" },
  { title: "Pagar a conta de energia", type: "Urgente" },
  { title: "Assistir a um documentário interessante", type: "Normal" },
];

function createTaskItem(title, type) {
  let spanType;
  if (type.toLowerCase() == "urgente") {
    spanType = "span-urgent"
  } else if (type.toLowerCase() == "importante") {
    spanType = "span-important"
  } else if (type.toLowerCase() == "normal") {
    spanType = "span-normal"
  };
  const listItem = document.createElement("li");
  const div = document.createElement("div");
  const span = document.createElement("span");
  const p = document.createElement("p");
  const button = document.createElement("button");
  listItem.classList.add("task__item");
  div.classList.add("task-info__container");
  span.classList.add("task-type");
  span.classList.add(spanType);
  button.classList.add("task__button--remove-task");
  p.innerText = `${title}`
  listItem.appendChild(div)
  listItem.appendChild(button)
  div.appendChild(span)
  div.appendChild(p)
  button.addEventListener("click", function (event) {
    const parentItem = event.target.parentElement;
    const allTasks = document.getElementsByClassName("task__item");
    let parentItemIndex;
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i] == parentItem) {
        parentItemIndex = i
      }
    }
    tasks.splice(parentItemIndex, 1)
    renderElements(tasks)
  });
  return listItem
}

function renderElements(array) {
  const templateItems = document.getElementsByClassName("task__item").length
  for (let i = 0; i < templateItems; i++) {
    document.getElementsByClassName("task__item")[0].remove()
  }
  const tasksList = document.getElementsByClassName("tasks__list")[0];
  for (let i = 0; i < tasks.length; i++) {
    listItem = createTaskItem(tasks[i].title, tasks[i].type)
    tasksList.appendChild(listItem)
  }
}

renderElements(tasks)

const newTask = document.getElementsByClassName("form__button--add-task")[0];

newTask.addEventListener("click", function (event) {
  event.preventDefault();
  let titleInput = document.querySelector(".form__input--text");
  let typeInput = document.querySelector(".form__input--priority");
  let title = titleInput.value;
  let type = typeInput.value;
  if (title == "" || type == "") {
    return alert("Por favor preencha as informações da tarefa")
  }
  tasks.push({ title: title, type: type });
  renderElements(tasks);
  titleInput.value = '';
  typeInput.value = '';
});