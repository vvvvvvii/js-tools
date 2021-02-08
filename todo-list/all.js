/* 
MIT License
Copyright (c) 2019 All contributors to Sortable
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Copyright (c) 2017 Gregory Petrosyan
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
//selectors
const hamburgerMenu = document.querySelector('#hamburger-menu-icon');
const hamburgerExit = document.querySelector('#hamburger-menu-exit');

const dateInput = document.querySelector('#date-input');
const timeInput = document.querySelector('#time-input');
const todoInput = document.querySelector('.todo-input');
const addButton = document.querySelector('.addlist-button');
const todoList = document.querySelector('#todoList');

const completedNum = document.querySelector('#completedNum');
const clearCompleteNum = document.querySelector('#clearCompleteNum');
const taskSort = document.querySelector('#task-sort');

const filterStatus = document.querySelectorAll('.filter-status');
const filterDate = document.querySelectorAll('.filter-date');
const filterSort = document.querySelectorAll('.filter-sort');
const deleteAll = document.querySelectorAll('.deleteAll');

const container = document.querySelector('.container');
const analyzeBtn = document.querySelectorAll('.analyze-btn');
const modal = document.querySelector('.modal');
const modalExit = document.querySelector('.modal-exit');

//event listeners
document.addEventListener('DOMContentLoaded',getTodos); //網頁載好時，執行 getTodos function
addButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
hamburgerMenu.addEventListener('click',openMenu);
hamburgerExit.addEventListener('click',closeMenu);
filterStatus.forEach(function(i){ //前面因為不只一項而使用 querySelectorAll ，會把資料已陣列方式儲存，所以這裡要用 forEach 不然會有錯誤
    i.addEventListener('change',showFilterStatus); //使用change事件才能即時顯示過濾的項目，若使用click會變成第一次要點其他項目之前，就紀錄已經在第一項的那個項目（例如all是預設值，一點就會先記錄到all而不是點完的其他項目）
});
filterDate.forEach(function(i){
    i.addEventListener('change',showFilterDate);
});
filterSort.forEach(function(i){
    i.addEventListener('change',showFilterSort);
});
deleteAll.forEach(function(i){
    i.addEventListener('click',deleteAllTask);
});
clearCompleteNum.addEventListener('click',clearNumCheck);
analyzeBtn.forEach(function(i){
    i.addEventListener('click',analyzeSort);
});
modalExit.addEventListener('click',closeModal);
//functions
function addTodo(event){
    //避免 form 照著原本屬性規定的，直接 submit
    event.preventDefault();
    //建立 to do li 把上方輸入的東西擺進裡面
    const todoLi = document.createElement('li');
    todoLi.classList.add("todo");

    /*想讓架構呈現如下
    <ul class="todo-list">
        <li class="todo"> <!--變數名稱 todoLi-->
            <ul class="todo-item"> <!--變數名稱 newTodo-->
                <li class="todo-date">Date</li> dateInput.value 輸入什麼就顯示什麼 <!--變數名稱 newTodoDate-->
                <li class="todo-time">Time</li> timeInput.value 輸入什麼就顯示什麼 <!--變數名稱 newTodoTime-->
                <li class="todo-sort">Sort</li> sortSelect.value 輸入什麼就顯示什麼 <!--變數名稱 newTodoSort-->
                <li class="todo-detail">item detail</li> todoInput.value 輸入什麼就顯示什麼 <!--變數名稱 newTodoDetail-->
            </ul> 
            <div class="todo-btn"> <!--變數名稱 newTodoButton-->
                <button class="complete-btn"></button> <!--變數名稱 completedButton-->
                <button class="complete-btn"></button> <!--變數名稱 trashButton-->
            </div>        
        </li>
    </ul>*/

    //建立 li 
    const newTodo = document.createElement('ul');
    newTodo.classList.add("todo-item");
    todoLi.appendChild(newTodo); //把 newTodo 放到 todoLi 的下方

    const newTodoDate = document.createElement('li');
    const newTodoTime = document.createElement('li');
    const newTodoSort = document.createElement('li');
    const newTodoDetail = document.createElement('li');
    newTodoDate.classList.add("todo-date");
    newTodoTime.classList.add("todo-time");
    newTodoSort.classList.add("todo-sort");
    newTodoDetail.classList.add("todo-detail");
    
    //如果沒有輸入內容或月份日期格式錯誤需跳警示，且無法加 task
    if (todoInput.value == 0 || todoInput.value == undefined || todoInput.value == null){
        alert("內容欄為必填");
    }else if(dateInput.value ==0 || dateInput.value == undefined || dateInput.value == null){
        alert("日期欄為必填");
    }else if(timeInput.value == 0 || timeInput.value == undefined || timeInput.value == null){
        alert("時間欄為必填");
    }else{
        newTodoDate.innerText = dateInput.value; //輸入什麼就呈現什麼
        newTodoTime.innerText = timeInput.value; 
        newTodoDetail.innerText = todoInput.value;
        //選什麼種類就秀對應圖案
        if(taskSort.value == "job"){
            newTodoSort.innerHTML += `<i class="fas fa-briefcase"></i>`;
        }else if(taskSort.value == "housework"){
            newTodoSort.innerHTML += `<i class="fas fa-home"></i>`;
        }else if(taskSort.value == "sport"){
            newTodoSort.innerHTML += `<i class="far fa-futbol"></i>`;
        }else if(taskSort.value == "routine"){
            newTodoSort.innerHTML += `<i class="fas fa-hourglass"></i>`;
        }else if(taskSort.value == "others"){
            newTodoSort.innerHTML += `<i class="fas fa-palette"></i>`;
        }else{
            newTodoSort.innerHTML += `<i class="fas fa-times"></i>`;
        };

        newTodo.appendChild(newTodoDate); //把 newTodoDate 放到 newTodo 的下方
        newTodo.appendChild(newTodoTime); //把 newTodoTime 放到 newTodo 的下方
        newTodo.appendChild(newTodoSort); //把 newTodoSort 放到 newTodo 的下方
        newTodo.appendChild(newTodoDetail); //把 newTodoDetail 放到 newTodo 的下方

        //add todo to localstorage
        let saveLocal = [dateInput.value,timeInput.value,taskSort.value,todoInput.value];
        saveLocalTodos(saveLocal);

        //建 div 放兩個 btn
        const newTodoButton = document.createElement('div');
        newTodoButton.classList.add("todo-btn");
        todoLi.appendChild(newTodoButton); //把 newTodoButton 放到 todoLi 的下方    

        //check mark btn
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        newTodoButton.appendChild(completedButton); //把 completedButton 放到 newTodoButton 的下方    

        //check trash btn
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('danger-btn');
        newTodoButton.appendChild(trashButton); //把 trashButton 放到 newTodoButton 的下方    

        todoList.appendChild(todoLi);//把 todoLi 放進 todoList 裡
        location.reload();

        //輸入並加到下方後，自動清空輸入欄位，讓使用者可以再輸入其他待辦事項
        dateInput.value = "";
        timeInput.value = "";
        todoInput.value = "";
    };
}
function deleteCheck(e){
    /*console.log(e.target); 用這句可以發現， e.target 等於我們點的位置的 html 標籤*/
    const item = e.target;
    const todo = item.parentElement.parentElement; //若直接打 item.remove() 移除的會是刪除鈕本身，因此須回到父層再刪除
    //delete btn
    if(item.classList[0] === 'danger-btn'){ //item 的第一層 class 為 danger-btn 時
        todo.classList.add("fall"); //在這邊加一個動畫效果，並用css設定動畫效果細節
        removeLocalTodos(todo); //執行 removeLocalTodos 函式，讓本地端儲存的資料一併刪除
        todo.addEventListener('transitionend',function(){ //動畫效果結束後，才執行以下函式將 todo 本身移除
            todo.remove();
        });
    }
    //check btn
    if(item.classList[0] === 'complete-btn'){
        todo.classList.add('completed'); //在 todo 這個 div 加上 completed 的 class
        //console.log(todo.children[0].innerText);
        let date = todo.querySelector(".todo-date").innerText;
        let time = todo.querySelector(".todo-time").innerText;
        let detail = todo.querySelector(".todo-detail").innerText;
        let sort = todo.querySelector(".todo-sort").innerHTML;
        if (sort == `<i class="fas fa-briefcase"></i>`){
            sort = "job";
        }else if(sort == `<i class="fas fa-home"></i>`){
            sort = "housework";
        }else if(sort == `<i class="far fa-futbol"></i>`){
            sort = "sport";
        }else if(sort == `<i class="fas fa-hourglass"></i>`){
            sort = "routine";
        }else{
            sort = "others";
        };
        //讓本地端儲存的資料一併刪除，但紀錄完成了哪些事
        calculateTasks();
        removeLocalTodos(todo); 
        let saveLocalComplete = [date,time,sort,detail];
        saveLocalCompleteTodos(saveLocalComplete);
    }
}
//完成的工作數量會被紀錄
let completedTotalNum = 0;
completedNum.innerHTML= `已完成 ${completedTotalNum} 項工作！`;
function calculateTasks(){
    completedTotalNum += 1;
    completedNum.innerHTML = `已完成 ${completedTotalNum} 項工作！`;
    saveLocalCompleteNum();
    window.setTimeout(function () { //按完計算完成的數量後 500ms 重整一次
        window.location.reload();
    }, 500);
}
function clearNumCheck(){
    if(confirm("確定刪除已完成的豐功偉業數量？")){
        completedTotalNum = 0;
        completedNum.innerHTML= `尚未有完成的工作`;
        localStorage.removeItem('completeTask'); //連同本地端一起清空
        return; 
    }else{
        return;
    }
}
//刪除全部 task
function deleteAllTask(){
    if(confirm("確定刪除所有代辦事項？")){
        todoList.innerText = "";
        localStorage.removeItem('todos'); //連同本地端一起清空
        return; 
    }else{
        return;
    }
}

//hamburger menu
function openMenu(){
    let menu = document.getElementById('mobile-filter');
    menu.classList.add('hamburgerMenu-active');
}
function closeMenu(){
    hamburgerExit.classList.toggle('hamburgerMenuExit-active');
    hamburgerExit.addEventListener('animationend',function(){
        let menu = document.getElementById('mobile-filter');
        menu.classList.remove('hamburgerMenu-active');
    });
}

//filter
function showFilterStatus(e){
    const todos = todoList.childNodes; //可用console.log得知，這句可以取得所有在to do list的項目
    todos.forEach(function(todo){
        //console.log(e.target.value);
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
function showFilterDate(e){
    const todos = todoList.childNodes; 
    todos.forEach(function(todo){
    //console.log(todo.childNodes[0].childNodes[0]); 從這句找到月份所在 dom 位置
    const month = todo.childNodes[0].childNodes[0].innerHTML;
    //console.log(month);
        switch(e.target.value){ 
            case "allMonth": //點 all 時
                todo.style.display = 'flex'; //全都秀
                break;
            case "jan":
                if (month.includes('01/')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "feb":
                if (month.includes('02/')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "mar":
                if (month.includes('03/')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "apr":
                if (month.includes('04/')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "may":
                if (month.includes('05/')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "jun":
                if (month.includes('06/')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "jul":
                if (month.includes('07/')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "aug":
                if (month.includes('08/')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "sep":
                if (month.includes('09/')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "oct":
                if (month.includes('10/')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "nov":
                if (month.includes('11/')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "dec":
                if (month.includes('12/')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
        }
    });
}
function showFilterSort(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        const sort = todo.childNodes[0].childNodes[3].childNodes[0];
        // console.log(todo.childNodes[0].childNodes[3].childNodes[0]); 從這句找 node 所在位置
        switch(e.target.value){ 
            case "allSort": //點 all 時
                todo.style.display = 'flex'; //全都秀
                break;
            case "jobSort": //點工作時
                if (sort.classList.contains('fa-briefcase')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "houseworkSort": //點家事時
                if (sort.classList.contains('fa-home')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "sportSort": //點運動時
                if (sort.classList.contains('fa-futbol')){ 
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "routineSort": //點例行公事時
                if(sort.classList.contains('fa-hourglass')){
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
            case "othersSort": //點其他時
                if(sort.classList.contains('fa-palette')){
                    todo.style.display = 'flex'; 
                } else { //其他的不要秀
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

//analyze
function analyzeSort(){
    //彈出 modal 視窗
    modal.classList.toggle("modal-active");
    const modalBackground = document.createElement('div');
    modalBackground.classList.add("modal-background");
    container.appendChild(modalBackground);

    //將 JSON 抓到的資料轉成d3.js 圖表、放進 modal 中
    let todos;
    todos = JSON.parse(localStorage.getItem('todos'));
    if(localStorage.getItem('todos') === null){
        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = '暫無待辦事項';
    }else{
        let todoSortArray = [];
        todos.forEach(function(todo){
            todoSortArray.push(todo[2]);
        })
        //console.log(todoSortArray); 確定把所有種類都放進這個陣列了
        let counts = {};
        // 利用for迴圈遍歷arr並分析
        for(let i=0;i<todoSortArray.length;i++){
            let num = todoSortArray[i]; // num 會等於 todoSortArray[0]、todoSortArray[1]...(例如 job 、 choose ...)
            counts[num] = counts[num]?counts[num]+1:1; // 看要比較哪個字，就在 num 的位置輸入，會比較 counts 物件，如相同則該物件存值+1，如不同則存值設為1 
        }
        let jobNum = parseInt(counts["job"]);
        let houseworkNum = parseInt(counts["housework"]);
        let sportNum = parseInt(counts["sport"]);
        let routineNum = parseInt(counts["routine"]);
        let othersNum = parseInt(counts["others"]);
        let chart = c3.generate({
            bindto: '.modal-body', //圖要放在html裡的chart這個class中
            data:{
                columns:[
                    ['工作',jobNum],
                    ['家事',houseworkNum], 
                    ['運動',sportNum],
                    ['例行公事',routineNum], 
                    ['其他',othersNum],
                ],
                type:'pie', //圖的種類是圓餅圖
                onclick:function(d,i){ //點擊圖時的效果
                    console.log("onclick",d,i); //各自秀出男性20%、女性80%
                },
                onmouseover:function(d,i){ //滑鼠滑進圖的效果
                    console.log("onmouseover",d,i); //各自秀出男性20%、女性80%
                },
                onmouseout:function(d,i){ //滑鼠滑出圖的效果
                    console.log("onmouseout",d,i);
                }
            }
        });
    }
}
function closeModal(){
    modal.classList.remove('modal-active');
    const modalBackground = document.querySelector('.modal-background');
    container.removeChild(modalBackground);
}
//儲存本地端
function saveLocalTodos(todo) {
    let todos;
    //確認本地端有沒有已存在的todo
    if (localStorage.getItem("todos") === null) {
      todos = [];
    //若本地端已有，用 json 把已存在的 todos 拿來，並建立內容相同的陣列
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    //不論剛剛有沒有拿到東西，把參數 push 進 todos 陣列
    console.log(todo);
    todos.push(todo);
    //將 todos 資料轉回字串，更新到資料庫中
    localStorage.setItem("todos", JSON.stringify(todos));
}
function saveLocalCompleteTodos(todo){
    let completeTodos;
    //確認本地端有沒有已存在的todo
    if (localStorage.getItem("complete") === null) {
      completeTodos = [];
    //若本地端已有，用 json 把已存在的 todos 拿來，並建立內容相同的陣列
    } else {
      completeTodos = JSON.parse(localStorage.getItem("complete"));
    }
    //不論剛剛有沒有拿到東西，把參數 push 進 todos 陣列
    completeTodos.push(todo);
    //將 todos 資料轉回字串，更新到資料庫中
    localStorage.setItem("complete", JSON.stringify(completeTodos));
}
function saveLocalCompleteNum(){
    let completedNum;
    completedNum = completedTotalNum;
    //把結果傳回本地端
    localStorage.setItem("completeTask",JSON.stringify(completedNum));
}
//叫出存在本地端的 todo-date 、 todo-time 、 todos 、完成數目
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
    todos.sort();
    //console.log(todos); 檢查 todo 有被分成一條task一個陣列的狀態
    todos.forEach(function(todo) {
        //建立 li 
        const todoLi = document.createElement('li');
        todoLi.classList.add("todo");
        const newTodo = document.createElement('ul');
        newTodo.classList.add("todo-item");
        todoLi.appendChild(newTodo); //把 newTodo 放到 todoLi 的下方
        
        const newTodoDate = document.createElement('li');
        const newTodoTime = document.createElement('li');
        const newTodoSort = document.createElement('li');
        const newTodoDetail = document.createElement('li');
        newTodoDate.classList.add("todo-date");
        newTodoTime.classList.add("todo-time");
        newTodoSort.classList.add("todo-sort");
        newTodoDetail.classList.add("todo-detail");
        newTodoDate.innerText = todo[0]; //輸入什麼就呈現什麼
        newTodoTime.innerText = todo[1]; //輸入什麼就呈現什麼
        newTodoDetail.innerText = todo[3]; //輸入什麼就呈現什麼
        
        //看選到什麼種類，就秀相對應的圖案
        if(todo[2] == "job"){
            newTodoSort.innerHTML += `<i class="fas fa-briefcase"></i>`;
        }else if(todo[2] == "housework"){
            newTodoSort.innerHTML += `<i class="fas fa-home"></i>`;
        }else if(todo[2] == "sport"){
            newTodoSort.innerHTML += `<i class="far fa-futbol"></i>`;
        }else if(todo[2] == "routine"){
            newTodoSort.innerHTML += `<i class="fas fa-hourglass"></i>`;
        }else if(todo[2] == "others"){
            newTodoSort.innerHTML += `<i class="fas fa-palette"></i>`;
        }else{
            newTodoSort.innerHTML += `<i class="fas fa-times"></i>`;
        };
        
        newTodo.appendChild(newTodoDate); //把 newTodoDate 放到 newTodo 的下方
        newTodo.appendChild(newTodoTime); //把 newTodoTime 放到 newTodo 的下方
        newTodo.appendChild(newTodoSort); //把 newTodoSort 放到 newTodo 的下方
        newTodo.appendChild(newTodoDetail); //把 newTodoDetail 放到 newTodo 的下方
        
        //建 div 放兩個 btn
        const newTodoButton = document.createElement('div');
        newTodoButton.classList.add("todo-btn");
        todoLi.appendChild(newTodoButton); //把 newTodoButton 放到 todoLi 的下方    
        
        //check mark btn
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        newTodoButton.appendChild(completedButton); //把 completedButton 放到 newTodoButton 的下方    
            
        //check trash btn
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('danger-btn');
        newTodoButton.appendChild(trashButton); //把 trashButton 放到 newTodoButton 的下方    
        todoList.appendChild(todoLi);//把 todoLi 放進 todoList 裡
        
        //過期呈現紅色
        //取得目前日期與時間
        let d = new Date();
        //把目前日期和時間轉成數字
        let thismonth = parseInt(`${d.getMonth()+1}`); 
        let today = parseInt(`${d.getDate()}`); 
        let hourNow = parseInt(`${d.getHours()}`);
        let minNow = parseInt(`${d.getMinutes()}`);

        let taskDate= todo[0];
        taskDate = taskDate.split("/",2); //以 / 開始拆開前後的月份和日期
        let taskMonth = taskDate[0];
        let taskDay = taskDate[1];

        let taskTime = todo[1];
        taskTime = taskTime.split(":",2); //以 : 開始拆開前後的月份和日期
        let taskHour = taskTime[0]; 
        let taskMin = taskTime[1];

        if(taskMonth <= thismonth && taskDay <= today && taskHour < hourNow && taskMin < minNow){ //若過期
            todoLi.classList.remove("todo");
            todoLi.classList.add("overdue-todo");
        }
    });
    if(localStorage.getItem('completeTask') === null){
        completedNum.innerHTML = `尚未有完成的工作`;
        completedTotalNum = 0;
    }else{
        completedTotalNum = JSON.parse(localStorage.getItem('completeTask'));
        completedNum.innerHTML = `已完成 ${completedTotalNum} 項工作！`;
    }
};
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
    console.log(todo); //藉由這句知道，當我們點擊刪除按鈕， todo 這個參數對應到的是 .todo-btn fall 這個 div
    console.log(todo.children); //todo.children 這個參數對應到的是一個陣列，包含：li.todo-item、button.complete-btn、button.danger-btn，裡面又各自包了很多東西，可以發現我們要刪除的項目資料放在 todoitem 的 innerText / innerHTML 底下
    console.log(todo.children[0].innerText); //再次確認，用 children[0].innerText 的確能拿到要刪除的資料
    console.log(todos.indexOf('real')); //這個詞在陣列上是第幾個位置
    */
    //把 todo 的文字叫出來，找到他在陣列上是第幾個位置，然後用 slice 把它切掉
    console.log(todos);
    const todoIndex = todo.children[0].innerText;
    console.log(todos.indexOf(todoIndex));
    todos.splice(todos.indexOf(todoIndex),1); //1 的位置要填的數字，代表要刪幾個，只刪一個所以填一

    //最後，把結果傳回本地端
    localStorage.setItem("todos",JSON.stringify(todos));
}

//sortable setting 外掛
new Sortable(todoList, {
    animation: 150,
    ghostClass: 'sortable-ghost' //拖曳時的 css 樣式名稱
});

//flatpickr 外掛
flatpickr(dateInput,{
    altInput: true,
    altFormat: "n/j",
    dateFormat: "m/d",
    minDate: "today", //限定只能選今天以後的日期
    maxDate: "12/31", //限定只能選今年
    disableMobile: "true"
});
flatpickr(timeInput,{
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    disableMobile: "true"
});