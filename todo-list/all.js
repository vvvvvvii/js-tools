//selectors
const hamburgerMenu = document.querySelector('#hamburger-menu');

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

const filterOption = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded',getTodos); //網頁載好時，執行 getTodos function
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
hamburgerMenu.addEventListener('click',toggleMenu);
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
    //add todo to localstorage
    saveLocalTodos(todoInput.value);

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
        removeLocalTodos(todo); //執行 removeLocalTodos 函式，讓本地端儲存的資料一併刪除
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
//hamburger menu
function toggleMenu(){
    let menu = document.getElementById('mobile-filter');
    hamburgerMenu.addEventListener('click', function() {
        menu.classList.toggle('hamburgerMenu-active');
    });
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
//當我們 add todo 時，讓 todo 項目也存到本地端
function saveLocalTodos(todo){
    //確認本地端有沒有已存在的todo
    let todos;
    //若還沒有，建立空陣列
    if(localStorage.getItem('todos') === null){
        todos = [];
    //若本地端已有，用 json 把已存在的 todos 拿來，並建立內容相同的陣列
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //不論剛剛有沒有拿到東西，把參數 push 進 todos 陣列
    todos.push(todo); 
    //將 todos 資料轉回字串，更新到資料庫中
    localStorage.setItem('todos',JSON.stringify(todos));
}

//叫出存在本地端的 todos
function getTodos(){
    //確認本地端有沒有已存在的todo
    let todos;
    //若還沒有，建立空陣列
    if(localStorage.getItem('todos') === null){
    todos = [];
    //若本地端已有，用 json 把已存在的 todos 拿來，並建立內容相同的陣列
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo; //讓文字等於todo這個參數
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo); 

         const completedButton = document.createElement('button');
         completedButton.innerHTML = '<i class="fas fa-check"></i>';
         completedButton.classList.add('complete-btn');
         todoDiv.appendChild(completedButton);     
    
         const trashButton = document.createElement('button');
         trashButton.innerHTML = '<i class="fas fa-trash"></i>';
         trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);   
    
        todoList.appendChild(todoDiv);
    });   
}

function removeLocalTodos(todo){
    //確認本地端有沒有已存在的todo
    let todos;
    //若還沒有，建立空陣列
    if(localStorage.getItem('todos') === null){
    todos = [];
    //若本地端已有，用 json 把已存在的 todos 拿來，並建立內容相同的陣列
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    /*
    console.log(todo); //藉由這句知道，當我們點擊刪除按鈕， todo 這個參數對應到的是 .todo fall 這個 div
    console.log(todo.children); //todo.children 這個參數對應到的是一個陣列，包含：li.todo-item、button.complete-btn、button.trash-btn，裡面又各自包了很多東西，可以發現我們要刪除的項目資料放在 todoitem 的 innerText / innerHTML 底下
    console.log(todo.children[0].innerText); //再次確認，用 children[0].innerText 的確能拿到要刪除的資料
    console.log(todos.indexOf('real')); //這個詞在陣列上是第幾個位置
    */

    //把 todo 的文字叫出來，找到他在陣列上是第幾個位置，然後用 slice 把它切掉
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1); //1 的位置要填的數字，代表要刪幾個，只刪一個所以填一

    //最後，把結果傳回本地端
    localStorage.setItem("todos",JSON.stringify(todos));
}