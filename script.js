//select DOM elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
//Try to load saved to dos from the local storage (if any).
const saved = localStorage.getItem('todos');
const todos = saved? JSON.parse(saved) : [];

function saveTodos(){
    //saving the current Todos array to the local storage.
    localStorage.setItem('todos',JSON.stringify(todos));
}
// create a DOM node for the todo objects and append it to ths list
function createTodoNode(todo,index){
    const li = document.createElement('li');

    // checkbox to toggle the completion of the task.
    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox';
    // the !! converts the truthiest into the truth and the falsist into the false.
    checkBox.checked = !!todos.completed;
    checkBox.addEventListener("change",function(){
        todos.completed = checkBox.checked;

        //TODO: visual feedback : strike-through when completed.
        textSpan.style.textDecoration = todos.completed? 'line-through':"";
        saveTodos();
    })
    // text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through'
    }

        //Add double click event listner
        textSpan.addEventListener("dblclick",function(){
            const newText = prompt("Edit todo",todos.text);
            if(newText!==null){
                todos.text = newText.trim()
                textSpan.textContent= todos.text;
                saveTodos()

        } 
    });
        //delete todo button.
        const deleteButton =  document.createElement('button');
        deleteButton.textContent  = "Delete";
        deleteButton.addEventListener('click', function (){
            todos.splice(index,1);
            render();
            saveTodos();
        });

        li.appendChild(checkBox);
        li.appendChild(textSpan);
        li.appendChild(deleteButton);
        return li;



    }


//Render the whole todo list from the todos array.

function render(){
    list.innerHTML='';

    //recreate each item.
    todos.forEach((todo,index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
        
    });
}
function addTodo(){
    const text = input.value.trim();
    if(!text){
        return 
    }
    // push a new element todo object.
    todos.push({text, completed: false});
    input.value = '';
    render();
    saveTodos();
}
addBtn.addEventListener('click',addTodo);
input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        addTodo();
    }
});
render();