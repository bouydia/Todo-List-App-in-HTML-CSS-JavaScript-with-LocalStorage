window.addEventListener('load',()=>{
     todos=JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput=document.querySelector('#name');
    const newTodoForm=document.querySelector('#new-todo-form')
    const username=localStorage.getItem('username') || ''
    
    nameInput.value=username
    
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username',e.target.value)
    })
    
    newTodoForm.addEventListener('submit', (e) =>{
        e.preventDefault();

        const todo={
            content:e.target.elements.content.value,
			category: e.target.elements.category.value,
            done:false,
            createAt:new Date().getTime()
        }
        
        todos.push(todo);
        localStorage.setItem('todos',JSON.stringify(todos));
        
        e.target.reset();
        
        displayTodos()  
    })
    displayTodos()
})

function displayTodos(){
    const todoList=document.querySelector("#todo-list")
    todoList.innerHTML=''
    
    todos.sort((a,b) =>  b.createAt - a.createAt);
    localStorage.setItem('todos',JSON.stringify(todos));
    
    todos.forEach((todo)=>{
        const todoItem=document.createElement('div')
        todoItem.classList.add("todo-item")
        const label=document.createElement('label')
        const input=document.createElement('input')
        const span=document.createElement('sapn')
        const content=document.createElement('div')
        const actions=document.createElement('div')
        const deleteBtn=document.createElement('button')
        const editBtn=document.createElement('button')
        input.type='checkbox'
        input.checked=todo.done
        span.classList.add('bubble')
        if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
        
        content.classList.add('todo-content')
        actions.classList.add('actions')
        deleteBtn.classList.add('delete')
        editBtn.classList.add('edit')
        
        content.innerHTML=`<input type="text" value="${todo.content}" readonly>`
        deleteBtn.innerHTML='Delete'
        editBtn.innerHTML='Edit'
        
        label.appendChild(input)
        label.appendChild(span)
        actions.appendChild(editBtn)
        actions.appendChild(deleteBtn)
        todoItem.appendChild(label)
        todoItem.appendChild(content)
        todoItem.appendChild(actions)
        
        todoList.appendChild(todoItem)
        
        if(todo.done){
            todoItem.classList.add('done')
        }
        
        input.addEventListener('change',e=>{
            todo.done=e.target.checked
            localStorage.setItem('todos',JSON.stringify(todos));
            if(todo.done){
                todoItem.classList.add('done')
            }
            else{
                todoItem.classList.remove('done')
            }
            displayTodos()
        })
        
        editBtn.addEventListener('click',e=>{
            const input=content.querySelector('input')
            input.removeAttribute('readonly')
            input.focus();
            input.addEventListener('blur',e=>{
                input.setAttribute('readonly',true)
                todo.content=e.target.value;
                localStorage.setItem('todos',JSON.stringify(todos));
                displayTodos()
            })
        })
        
        deleteBtn.addEventListener('click',e=>{
            todos=todos.filter(t=>t!=todo)
            localStorage.setItem('todos',JSON.stringify(todos));
            displayTodos()
        })
    })
    
}

