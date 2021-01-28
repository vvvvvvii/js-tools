//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

const filterOption = document.querySelector('.filter-todo');

//event listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

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
    //delete btn
    if(item.classList[0] === 'trash-btn'){ //item 的第一層 class 為 trash-btn 時
        const todo = item.parentElement; //若直接打 item.remove() 移除的會是刪除鈕本身，因此須回到父層再刪除
        todo.classList.add("fall"); //在這邊加一個動畫效果，並用css設定動畫效果細節
        todo.addEventListener('transitionend',function(){ //動畫效果結束後，才執行以下函式將 todo 本身移除
            todo.remove();
        });
    }
    //check btn
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed'); //在 todo 這個 div 加上 completed 的 class(再按一次會不見)
    }
}
//filter
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){ //點擊時，跑迴圈並讓點擊的 value 值（會是 all completed uncompleted）進 switch 判斷式
            case "all": //點 all 時
                todo.style.display = 'flex'; //全都秀
                break;
            case "completed": //點 completed 時
                if (todo.classList.contains('completed')){ //只秀出 class 中有加入 completed 這個 class 的
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted": //點 uncompleted 時
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
        }
    });
}
