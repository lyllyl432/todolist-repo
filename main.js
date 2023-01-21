const displayList = ()=>{
    const todoList = document.querySelector(".to-do-list");
    todoList.innerHTML = "";    
    
    todos.forEach((todo) =>{
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
            localStorage.setItem("todosItem",JSON.stringify(todos))
        }
        const editBtn = document.querySelectorAll(".edit-btn");
        const saveBtn = document.querySelector(".save-btn");
            editBtn.forEach(btn =>{
                btn.addEventListener("click",e=>{
                    const id = e.target.dataset.id;
                    let findItem = todos.find(item => item.id === id);
                    enterInput.value = findItem.content;
                    submitBtn.style.display = "none";
                    saveBtn.style.display = "inline-block";
                    let attr = document.createAttribute("data-id");
                    attr.value = id;
                    saveBtn.setAttributeNode(attr);
    
                })
            })
        saveBtn.addEventListener("click",e =>{
                let id = e.target.dataset.id;
                let findItem = todos.find(item => item.id === id);
                findItem.content = enterInput.value;
                localStorage.setItem("todosItem",JSON.stringify(todos))
        })
    })
}
const getLocalStorage = ()=>{
    return localStorage.getItem("todosItem")?
    JSON.parse(localStorage.getItem("todosItem")):[];
}
window.addEventListener("DOMContentLoaded",()=>{
   todos = getLocalStorage();
   enterInput = document.getElementById("enter");
   submitBtn = document.querySelector(".btn");
   editFlag = false;
    submitBtn.addEventListener("click",e =>{
    e.preventDefault();
    if(enterInput.value !== ""){
        const todo = {
            content: enterInput.value,
            done: false,
            id: new Date().getTime().toString(),
            createAt: new Date().getTime()
        }
        todos.push(todo);
        localStorage.setItem("todosItem",JSON.stringify(todos));
        //Form reset
        enterInput.value = "";
        displayList();
    }
   })
   displayList();
})
