const host = "https://webdev-hw-api.vercel.app/api/v2/todos";

//let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

export function getTodos({ token }) {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        }
    })
        .then((response) => {
            if (response.status === 401) {
                // token = prompt('Введите верный пароль');
                // fetchTodosAndRender();
                throw new Error("Нет авторизации");
            }

            return response.json();
        })
}

export function deleteTodo({ token, id }) {
    return fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
        method: "DELETE",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            return response.json();
        })
}

export function addTodo({ text, token }) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text,
        }),
        headers: {
            Authorization: token,
        }
    })
        .then((response) => {
            return response.json();
        })
}

//https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md
export function loginUser({ login, password }) {
    return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password
        }),
    }).then((response) => {
        if(response.status === 400) {
            throw new Error('Неверный логин или пароль');
        }
         return response.json();
    })
}