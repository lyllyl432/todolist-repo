const displayList = ()=>{
    const todoList = document.querySelector(".to-do-list");
    todoList.innerHTML = "";    
    
    todos.forEach(todo =>{
        let listElement = document.createElement("article");
        listElement.classList.add("list-items");
        listElement.innerHTML = `<input type="text" class="list-input" value="${todo.content}" readonly>
        <div class="btn-container">
        <button class="done-btn" data-id=${todo.id} data-check=${todo.done}>done</button>
        <button class="edit-btn" data-id=${todo.id} data-check=${todo.done}>edit</button>
        <button class="delete-btn">delete</button>
        </div>`
        todoList.appendChild(listElement);
        const input = listElement.querySelector(".list-input");
        // if list is done add the underlineList if loaded
        if(todo.done === true){
            input.classList.add("underlineList");
        }
        todoList.addEventListener("click",event =>{
            if(event.target.classList.contains("done-btn")){
                let flag = true;
                let doneBtn = event.target;
                let id = doneBtn.dataset.id;
                let todoItem = todos.find(item => item.id === id);
                todoItem.done = flag;
                localStorage.setItem("todosItem",JSON.stringify(todos));
                if(todo.done === flag){
                    input.classList.add("underlineList");
                }
            }
       

        })
        const deleteBtn = listElement.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", e =>{
                const btn = e.target;
                console.log(btn);
                let element = btn.parentElement.parentElement;
                todoList.removeChild(element);
                deleteLocalStorage();
                
            })
        const deleteLocalStorage = ()=>{
           todos = todos.filter(t => t.id != todo.id);
           console.log(todos);
            localStorage.setItem("todosItem",JSON.stringify(todos))
        }
        const editBtn = listElement.querySelector(".edit-btn");
        editBtn.addEventListener("click", (e)=>{
            const input = listElement.querySelector(".list-input");
            input.removeAttribute("readonly");
            input.focus();
            input.addEventListener("blur", e =>{
                input.setAttribute("readonly", true);
                todo.content = e.target.value;
                localStorage.setItem("todosItem",JSON.stringify(todos));
                displayList();
            })
        })
    })
}
const getLocalStorage = ()=>{
    return localStorage.getItem("todosItem")?
    JSON.parse(localStorage.getItem("todosItem")):[];
}
window.addEventListener("DOMContentLoaded",()=>{
   todos = getLocalStorage();
   const todoForm = document.querySelector(".todo_form");
   const inputSubmit = document.getElementById("enter");
   todoForm.addEventListener("submit",event =>{
    event.preventDefault();
    if(inputSubmit.value !== ""){

        const todo = {
            content: event.target.elements.content.value,
            done: false,
            id: new Date().getTime().toString(),
            createAt: new Date().getTime()
        }
        todos.push(todo);
        localStorage.setItem("todosItem",JSON.stringify(todos));
        //Form reset
        event.target.reset();
        displayList();
    }
   })
   displayList();
})
