const startCells = document.querySelectorAll('.start-cell');
const cells = document.querySelectorAll('.cell');
const foundations = document.querySelectorAll('.foundation');

let suit = ["club", "heart", "diamond", "spade"];
let number = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let initPoker = [];
let cascadesArr = [[], [], [], [], [], [], [], []];

//event listener
document.addEventListener('DOMContentLoaded',addCard);
    
//function
function addCard(){
    //初始化撲克牌
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 13; j++) {
            let item = [suit[i], number[j]];
            initPoker.push(item);
        }
    }
    console.log(initPoker); //確認得到52張牌
    for(let i=0; i<8; i++){ //產生隨機數字放進八個陣列中
        if(i<4){ //前四列
            for(let j = 0; j<7; j++){ //每個陣列共要放七個數
                let random = Math.floor(Math.random() * initPoker.length); //Math.floor()會將所有小數無條件捨去只取最小整數，Math.random() * x 隨機產生 0-x 間的數（含0但不含x）
                //對應poker陣列得到對應的花色及陣列
                let newNum = initPoker[random]; 
                cascadesArr[i].push(newNum); //分別放進前四列
                initPoker.splice(random, 1); //用過的從陣列剪掉
                //對應cascadesArr陣列產生div顯示在螢幕上
                const card = document.createElement('div'); //這句記得放在for迴圈中，放在外面只會新增一次
                let positionTop = `${30*j}px`; //讓牌依第幾排往下露出一點點
                card.style.top = positionTop;
                card.style.backgroundImage = 'image/'+newNum[0]+newNum[1]+'.svg'
                console.log()
                //"url('image/Card_club%2010.svg')";
                card.innerHTML = newNum;
                card.classList.add("card");    
                startCells[i].appendChild(card);
            }
        }else{ //後四列
            for(let j = 0; j < 6; j++){ //每個陣列共要放六個數
                let random = Math.floor(Math.random() * initPoker.length); //Math.floor()會將所有小數無條件捨去只取最小整數，Math.random() * x 隨機產生 0-x 間的數（含0但不含x）
                //對應poker陣列得到對應的花色及陣列
                let newNum = initPoker[random]; 
                cascadesArr[i].push(newNum);
                initPoker.splice(random, 1); 
                //對應cascadesArr陣列產生div顯示在螢幕上
                const card = document.createElement('div');
                let positionTop = `${30*j}px`; //讓牌依第幾排往下露出一點點
                card.style.top = positionTop; 
                card.innerHTML = newNum;
                card.classList.add("card");    
                startCells[i].appendChild(card);
            }
        }
    }
    console.log(cascadesArr);
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


