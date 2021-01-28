//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');



//event listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);

//functions
function addTodo(event){
    //避免 form 照著原本屬性規定的，直接 submit
    event.preventDefault();
    //建立 to do div 把上方輸入的東西擺進裡面
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    /*想讓架構呈現如下
    <ul class="todo-list">
        <div class="todo"> <!--變數名稱 todoDiv-->
            <li class="todo-item"></li> <!--變數名稱 newTodo-->
            <button class="complete-btn"></button> <!--變數名稱 completedButton-->
            <button class="complete-btn"></button> <!--變數名稱 trashButton-->
        </div>
    </ul>
    */

    //建立 li 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value; //輸入什麼就呈現什麼
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo); //把 newTodo 放到 todoDiv 的下方
    //check mark btn
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton); //把 completedButton 放到 todoDiv 的下方    
    //check trash btn
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton); //把 trashButton 放到 todoDiv 的下方    
    //把 todoDiv 放進 todoList 裡
    todoList.appendChild(todoDiv);
    //輸入並加到下方後，自動清空輸入欄位，讓使用者可以再輸入其他待辦事項
    todoInput.value = "";
}
function deleteCheck(e){
    /*console.log(e.target); 用這句可以發現， e.target 等於我們點的位置的 html 標籤*/
    const item = e.target;
    //delete
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement; //若直接打 item.remove() 移除的會是刪除鈕本身，因此須回到父層再刪除
        todo.remove();
    }
}