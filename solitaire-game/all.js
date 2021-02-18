const startCells = document.querySelectorAll('.start-cell');
const cells = document.querySelectorAll('.cell');
const foundations = document.querySelectorAll('.foundation');

let suit = ["club", "heart", "diamond", "spade"];
let number = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let initPoker = [];
let cascadesArr = [[], [], [], [], [], [], [], []];

const container = document.querySelector('.container');

//event listener
document.addEventListener('DOMContentLoaded',addCard);
container.addEventListener('dragstart',dragCard); //因為直接在上面寫 const cards=document.querySelectorAll選不到（下面還沒跑完），會跳空陣列，所以用這種方式搭配e.target去選card的div
container.addEventListener('dragover',dragoverCard); 
container.addEventListener('drop',dropCard); 
container.addEventListener('dragend',dragendCard);
//function
function addCard(){
    //初始化撲克牌
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 13; j++) {
            let item = [suit[i], number[j]];
            initPoker.push(item);
        }
    }
    //console.log(initPoker); //確認得到52張牌
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
                let url = 'url(' + 'image/'+newNum[0]+newNum[1]+'.svg' + ')';
                card.style.backgroundImage = url;
                card.classList.add("card");    
                card.setAttribute("draggable","true"); //在html加上這個屬性，宣告可被拖曳
                card.setAttribute("data-suit",`${newNum[0]}`); //在html加上這個屬性，讓花色可被比對
                card.setAttribute("data-number",`${newNum[1]}`); //在html加上這個屬性，讓大小可被比對
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
                let url = 'url(' + 'image/'+newNum[0]+newNum[1]+'.svg' + ')';
                card.style.backgroundImage = url;
                card.classList.add("card");    
                card.setAttribute("draggable","true");
                card.setAttribute("data-suit",`${newNum[0]}`); 
                card.setAttribute("data-number",`${newNum[1]}`); 
                startCells[i].appendChild(card);
            }
        }
    }
    //console.log(cascadesArr);
}
function dragCard(e){ 
    const item = e.target;
    if(item.classList[0]==="card"){
        e.dataTransfer.setData("text",[item.dataset.suit,item.dataset.number,item.style.backgroundImage]); //存放資料
    }else{
        e.preventDefault(); //其他不能拖曳
    }
}
function dragoverCard(e){
    e.preventDefault();
}
function dropCard(e){
    e.preventDefault();
    const item = e.target;
    const cell = item.parentNode;
    let draggableData = e.dataTransfer.getData("text"); //取出資料
    draggableData = draggableData.split(","); //將資料轉成陣列

    if(item.classList[0]==="card"){
        const card = document.createElement('div'); 
        let positionTop = `${30+parseInt(item.style.top)}px`; //拖過去的卡片要低原本卡片 30px
        card.style.top = positionTop;
        card.style.backgroundImage = draggableData[2]; //讓取出的圖片資料等同背景圖案
        card.classList.add("card");    
        card.setAttribute("draggable","true"); //在html加上這個屬性，宣告可被拖曳
        card.setAttribute("data-suit",`${draggableData[0]}`); //在html加上這個屬性，讓花色可被比對
        card.setAttribute("data-number",`${draggableData[1]}`); //在html加上這個屬性，讓大小可被比對
        cell.appendChild(card); //回到父層再加上東西
    }else if(item.classList[0]==="cell" && item.classList[1]!=="full"){
        const card = document.createElement('div'); 
        card.style.backgroundImage = draggableData[2];
        card.classList.add("card");    
        card.setAttribute("draggable","true");
        card.setAttribute("data-suit",`${draggableData[0]}`); 
        card.setAttribute("data-number",`${draggableData[1]}`); 
        cell.appendChild(card); 
        item.classList.add("full");
    }else if(item.classList[0]==="foundation"){
        const card = document.createElement('div');
        card.style.backgroundImage = draggableData[2]; 
        card.classList.add("card");    
        cell.appendChild(card);
    }
}
function dragendCard(e){
    const item = e.target;
    item.remove();
}
