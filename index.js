//План действий
//1.Реализовать форму логина в приложении
//2.Реализовать форму регистрации

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const textInputElement = document.getElementById("text-input");


let tasks = [];

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k37k3bk3cg3c03ck";

const host = "https://webdev-hw-api.vercel.app/api/v2/todos"

const fetchTodosAndRender = () => {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
    }
  })
    .then((response) => {
      if(response.status === 401) {
        // token = prompt('Введите верный пароль');
        // fetchTodosAndRender();
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((responseData) => {
      tasks = responseData.todos;
      renderTasks();
    });
};

const renderTasks = () => {
  const tasksHtml = tasks
    .map((task) => {
      return `
        <li li class="task" >
          <p class="task-text">
            ${task.text}
            <button data-id="${task.id}" class="button delete-button">Удалить</button>
          </p>
          </li> `;
        })
        .join("");

listElement.innerHTML = tasksHtml;
const deleteButtons = document.querySelectorAll(".delete-button");

for (const deleteButton of deleteButtons) {
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const id = deleteButton.dataset.id;

    // Подписываемся на успешное завершение запроса с помощью then
    fetch(host + id, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        // Получили данные и рендерим их в приложении
        tasks = responseData.todos;
        renderTasks();
      });

    renderTasks();
  });
}
    };

fetchTodosAndRender();

buttonElement.addEventListener("click", () => {
  if (textInputElement.value === "") {
    return;
  }

  buttonElement.disabled = true;
  buttonElement.textContent = "Задача добавляется...";

  // Подписываемся на успешное завершение запроса с помощью then
  fetch(host, {
    method: "POST",
    body: JSON.stringify({
      text: textInputElement.value,
    }),
    headers: {
      Authorization: token,
    }
  })
    .then((response) => {
      return response.json();
    })
    .then(() => {
      // TODO: кинуть исключение
      textInputElement.value = "";
    })
    .then(() => {
      return fetchTodosAndRender();
    })
    .then(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Добавить";
    })
    .catch((error) => {
      console.error(error);
      alert("Кажется, у вас проблемы с интернетом, попробуйте позже");
      buttonElement.disabled = false;
      buttonElement.textContent = "Добавить";
    });

  renderTasks();
});