//我自己一開始拆解出來的任務
// 1. 每個數字按下去要顯示在上方欄位
// 2. 每個數字要轉換成能加減乘除的號碼
// 3. 將這些數字運算後顯示在上方欄位
// 4. 按reset要清空上方欄位和已紀錄的號碼
// 5. 上方欄位一開始要秀0 -> 8ead97c 完成

//照著youtube教學影片做出的結果：

//1.宣告
const oneBtn = document.getElementById("calc-one");
const twoBtn = document.getElementById("calc-two");
const threeBtn = document.getElementById("calc-three");
const fourBtn = document.getElementById("calc-four");
const fiveBtn = document.getElementById("calc-five");
const sixBtn = document.getElementById("calc-six");
const sevenBtn = document.getElementById("calc-seven");
const eightBtn = document.getElementById("calc-eight");
const nineBtn = document.getElementById("calc-nine");
const zeroBtn = document.getElementById("calc-zero");

const decimalBtn = document.getElementById("calc-decimal"); // .鍵
const clearBtn = document.getElementById("calc-clear"); // AC鍵
const backspaceBtn = document.getElementById("calc-backspace"); // 清除鍵
const displayValElement = document.getElementById("calc-display-val"); //顯示結果區

let calcNumBtns = document.getElementsByClassName("calc-btn-num"); //所有數字鍵都會藉由這個宣告，放進名為calcNumBtns的陣列中
let calcOperatorBtns = document.getElementsByClassName("calc-btn-operator"); //所有計算鍵都會藉由這個宣告，放進名為calcOperatorBtns的陣列中

//4. 預設上方欄顯示為0，宣告變數讓數字打完後可以放在該放的位置儲存
let displayVal = "0"; // 顯示結果區。當數字打完時，或是運算完得到結果後，應該出現在這裡，預設數字為0
let pendingVal = ""; //當數字打完，按下運算按鈕，要輸入下一組數字時，前一組數字必須被儲存下來
let evalStringArray = []; //運算區初始為空陣列
 
let updateDisplayVal = (clickObj) =>{ 
    //3.按按鍵時，讓btnText等於按的數字
    let btnText = clickObj.target.innerHTML; //這裡運用到event Object和event target的觀念。當事件被觸發，瀏覽器會為事件主動創造一個物件，這個物件會包含事件相關的所有資訊例如按鍵按了什麼keyCode、滑鼠點了哪裡clientX、事件名稱type、觸發事件元素target、事件是否在冒泡階段觸發bubbles等等，每個事件物件提供的屬性會根據觸發的事件不同。要取出屬性資訊，需要提供一個參數。在這裡因為要讓執行這個函式時，將按下的按鍵中的數字，帶回btnText這個變數中，因此幫參數取名為clickObj，btnText等於按下（觸發事件）時的參數的內文（innerText）。如此便將按下的數字存起來了。
    //5.顯示結果區如果本來只有0，讓他不要秀0，而是變成空字串（空白），才不會出現例如01234這種數
    if(displayVal === "0"){
        displayVal = '';
    }
    //4.顯示結果區= 目前已經顯示在結果區的數字，加上btnText紀錄起來的數字，全部加好的數再讓displayValElement顯示
    displayVal += btnText;
    displayValElement.innerHTML = displayVal;
}

let performOperation = (clickObj) => {
    //9.讓按鈕秀的就是打的並進行運算
    let operator = clickObj.target.innerHTML; //將按下的運算符號帶回operator這個變數中，幫參數取名為clickObj，operator等於按下（觸發事件）時的參數的內文（innerText）。如此便將按下的運算符號存起來了。
    switch(operator){
        case '+':
            pendingVal = displayVal; //把本來顯示在displayVal變數的資料存放到pendingVal
            displayVal = '0'; //接著清空displayVal讓他顯示0
            displayValElement.innerText = displayVal; //讓0顯示到畫面上
            evalStringArray.push(pendingVal); //把pendingVal push進evalStringArray陣列中
            evalStringArray.push('+'); //把加號也 push 進去
            break;
        case '-':
            pendingVal = displayVal;
            displayVal = '0';
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('-');
            break;  
        case 'x':
            pendingVal = displayVal;
            displayVal = '0';
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('*');
            break;
        case '÷':
            pendingVal = displayVal;
            displayVal = '0';
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('/');
            break;  
        case '=':
            evalStringArray.push(displayVal); //把displayVal變數裡的資料 push 進 evalStringArray 陣列
            let evaluation = eval(evalStringArray.join(' ')); //宣告變數 evaluation 等於：陣列 evalStringArray 執行 eval()。join（）會將陣列中所有元素連接合併成一個字串（例如本來是 ['1' '+' '2'] 會變成 '1+2'），並回傳。eval會將傳入的字串當作js指令來執行，如果傳入的是數字就會進行加減乘除的運算。
            displayVal = evaluation + ''; //讓剛剛執行完的結果以字串顯示，並重新成為displayVal變數
            displayValElement.innerText = displayVal; 
            evalStringArray = []; //執行後要清空，下次才能以空白陣列重新紀錄新的值
            break; 
        default:
            break;
    }
}

//2.讓每個按鈕被監聽
for(let i=0; i < calcNumBtns.length; i++){ //i一開始為0，當i<calcNumBtns.length時，就讓calcNumBtns[i]能夠被監聽，點擊時能執行updateDisplayVal的函式。那calcNumBtns.length會是多少呢？因為上面有宣告calcNumBtns就是所有 class 名稱為 calc-btn-num 的，html在數字的地方都有設這個class，因此0-9共10個數字，都會執行監聽
    calcNumBtns[i].addEventListener("click",updateDisplayVal,false) 
}

for(let i=0; i < calcOperatorBtns.length; i++){ //這裡的解釋跟上方監聽數字按鈕相同
    calcOperatorBtns[i].addEventListener("click",performOperation,false)
}

//6. 讓clearBtn有作用
clearBtn.onclick = () => {
    displayVal = "0"; //按下時顯示區變數為0
    pendingVal = undefined; //本來儲存的pendingVal刪除
    evalStringArray = []; //運算區清空
    displayValElement.innerHTML = displayVal; //顯示區等同顯示區變數
}

//7. 讓backspace btn有作用
backspaceBtn.onclick = () =>{
    let lengthOfDisplayVal = displayVal.length; //取得變數displayVal 目前的數字長度
    displayVal = displayVal.slice(0, lengthOfDisplayVal -1); // 用slice(begin,end)可以操控陣列和字串，會將陣列中的東西複製一份出來。begin為從哪開始複製，end為複製到哪之前要結束。如果沒寫end，則得到所有元素。寫負數時代表從後面開始算起（參https://codepen.io/wei-the-lessful/pen/OJRqEMB）。因此要讓他從第一筆資料抓到倒數第一筆資料前，才會刪掉最後一筆資料，達到backspace的作用。
    
    if(displayVal === ""){ //若顯示區變數為空，讓數字回到預設的0
        displayVal = "0";
    }

    displayValElement.innerHTML = displayVal; //顯示區等同顯示區變數    
}

//8. 讓小數點有自己的函式可以執行（雖然可以直接在html加上calc-btn-num class ，但是這樣會讓小數點可以無限次打上去，例如 100.3.234.34 會變不合理）
decimalBtn.onclick = () => {
    if(!displayVal.includes('.')){ //點擊.這個按鈕時，如果顯示區變數還沒出現過.
        displayVal +="."; //則讓顯示區數字加上.
    }
    displayValElement.innerText = displayVal; //顯示區文字等同顯示區變數
}
