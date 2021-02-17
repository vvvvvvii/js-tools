const startCells = document.querySelectorAll('.start-cell');
const cells = document.querySelectorAll('.cell');
const foundations = document.querySelectorAll('.foundation');
let  cascadesArr = [[], [], [], [], [], [], [], []];

//event listener
document.addEventListener('DOMContentLoaded',addCard);
    
//function
function addCard(){
    for (let i=0 ; i < startCells.length ; i++){
        const newCard = document.createElement('div'); //這句記得放在for迴圈中，放在外面只會新增一次
        newCard.classList.add("card");    
        startCells[i].appendChild(newCard);
    }
}
/*想讓卡片區架構呈現如下
<li>
    <div class="start-cell"> 4列7張 4列6張
       <div class="card"></div> 動態生成每張卡片背景圖 top 都要 +30 z-index+1
       <div class="card"></div>
       <div class="card"></div>
       <div class="card"></div>
       <div class="card"></div>
       <div class="card"></div>
       <div class="card"></div>
    </div>
</li>
*/

for(let i = 0; i < cascadesArr.length; i++){ 
    let randomNumber = Math.floor(Math.random() * 13)+1; //Math.floor()會將所有小數無條件捨去只取最小整數，Math.random() * x 隨機產生 0-x 間的數（含0但不含x），要在最外圍加一才不會取到 0，也因為外面已經要加一，這裡要設定13，不然會取到14
    console.log(randomNumber);
    for(let j = 0; j < randomNumber; j++){
      cascadesArr[i].push(Math.floor(Math.random() * 13)+1); //分別將隨機數字推進八個陣列中
    }
}
console.log(cascadesArr);
/*要限制
同一個數字只能出現4次
花色如何隨機產生？並對應到數字？
目前產生了56個數 應該只產生52個數才對
前四列只能有七個數
後四列只能有六個數
*/
