const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoListArea = document.getElementById('todo-list');

const saveData = localStorage.getItem('myTodoList');

let todoList = saveData ? JSON.parse(saveData) : [];

updateView();

addButton.addEventListener('click', function() {
    const inputValue = todoInput.value;
    if (inputValue === "") {
        alert("内容を入力してください");
        return;
    }

    const todoObj = {
        text: inputValue,
        date: new Date().toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    todoList.push(todoObj);
    todoInput.value = "";
    updateView();
});

function updateView() {
    todoListArea.innerHTML = "";

    const countDisplay = document.createElement('p');
    countDisplay.textContent = `現在のタスク:${todoList.length} 件`;
    todoListArea.appendChild(countDisplay);
    
    todoList.forEach(function(item, index) {
        const li = document.createElement('li');
        li.textContent = `${item.date} | ${item.text}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.style.merginLeft = '10px';

        deleteButton.addEventListener('click', function() {
            todoList.splice(index, 1);
            updateView();
        });

        li.appendChild(deleteButton);
        todoListArea.appendChild(li);
    });

    localStorage.setItem('myTodoList', JSON.stringify(todoList));
}