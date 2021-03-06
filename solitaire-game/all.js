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

//function
function dragAttributeAdd(card){
    card.setAttribute("draggable","true"); //在html加上這個屬性，宣告可被拖曳
    card.classList.add("draggable"); 
    card.classList.add("dropzone");    
}
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
                card.setAttribute("id",`${newNum[0]}${newNum[1]}`); //拖曳時可以用id去重建新的div
                card.setAttribute("data-suit",`${newNum[0]}`); //在html加上這個屬性，讓花色可被比對
                card.setAttribute("data-number",`${newNum[1]}`); //在html加上這個屬性，讓大小可被比對
                startCells[i].appendChild(card);
                if(j==6){
                    dragAttributeAdd(card); 
                }
            }
        }else{ //後四列
            for(let j = 0; j < 6; j++){ //每個陣列共要放六個數
                let random = Math.floor(Math.random() * initPoker.length); //Math.floor()會將所有小數無條件捨去只取最小整數，Math.random() * x 隨機產生 0-x 間的數（含0但不含x）
                let newNum = initPoker[random]; 
                cascadesArr[i].push(newNum);
                initPoker.splice(random, 1); 
                const card = document.createElement('div');
                let positionTop = `${30*j}px`; 
                card.style.top = positionTop; 
                let url = 'url(' + 'image/'+newNum[0]+newNum[1]+'.svg' + ')';
                card.style.backgroundImage = url;
                card.classList.add("card");    
                card.setAttribute("id",`${newNum[0]}${newNum[1]}`); 
                card.setAttribute("data-suit",`${newNum[0]}`); 
                card.setAttribute("data-number",`${newNum[1]}`); 
                startCells[i].appendChild(card);
                if(j==5){
                    dragAttributeAdd(card); 
                }
            }
        }
    }
}

function dragCard(){
    let draggable = document.querySelectorAll('.draggable');
    //console.log(draggable);
    draggable.forEach(function(card){
        card.addEventListener('dragstart',function(e){
            //console.log(card.parentElement.classList[0]);//紀錄這張牌是從哪來的、父層本來是什麼
            let length =  card.parentElement.childNodes.length;
            let lastChild = card.parentElement.childNodes[length-2]; //-2是因為他會記錄到還沒拖曳成功前的狀態，若寫-1會記錄到正要拖曳的那張
            e.dataTransfer.setData('text/plain', [e.target.id,card.parentElement.classList[0],e.target.dataset.suit,e.target.dataset.number,lastChild.id]);
            e.target.style.opacity = ".5";
        });
        card.addEventListener("dragend",function(e){
            e.target.style.opacity = "";
        });
    })
    let dropzones = document.querySelectorAll('.dropzone');
    //console.log(dropzone);
    dropzones.forEach(function(dropzone){
        dropzone.addEventListener('dragenter',function(e){
            e.preventDefault();
            dropzone.style.borderStyle = 'dashed';
            return false;
        });
        dropzone.addEventListener('dragover',function(e){
            e.preventDefault();
            return false;
        });
        dropzone.addEventListener('dragleave',function(e){
            dropzone.style.borderStyle = 'solid';
        });
        dropzone.addEventListener('drop',function(e){
            const dropTarget = e.path[0].classList[0]; //e.path[0].classList[0] 代表目的地
            let sourceData = e.dataTransfer.getData('text/plain'); 
            console.log(e.dataTransfer);
            sourceData = sourceData.split(",");
            const sourceId = sourceData[0];
            const sourceFrom = sourceData[1];
            let sourceSuit = sourceData[2];
            let sourceNum = sourceData[3];
            let sourceSuitColor;

            let targetSuit = e.path[0].dataset.suit;
            let targetNum = e.path[0].dataset.number;
            let targetSuitColor;

            let card = document.getElementById(sourceId);

            if(dropTarget == "cell"){ //移動到cell時
                if(card.children.length == 0 && sourceFrom != "foundation"){ //cell是空的;移過來的牌只有一張，不是兩張以上;不是從foundation移過來的。
                    e.preventDefault();
                    e.target.style.borderStyle = 'solid';
                    e.target.appendChild(card);
                    card.style.top = "inherit";
                    card.style.left = "inherit";
                    let sourceLastChild = sourceData[4]; //取得移動後最後一個牌加上可被拖曳或放牌的屬性
                    let addDraggableCard = document.getElementById(sourceLastChild);
                    dragAttributeAdd(addDraggableCard);
                }else{
                    console.log("dropTarget == cell went wrong");
                }
            }else if(dropTarget == "foundation"){ //移動到foundation時
                if(card.children.length == 0){ //限制一次只能移一張過來
                    if(sourceId == "clubA" || sourceId == "heartA" || sourceId == "diamondA" || sourceId == "spadeA"){ //移到foundation代表裡面本來沒卡片，在此情況下能移過去的只有各花色的Ａ
                        e.preventDefault();
                        e.target.style.borderStyle = 'solid';
                        e.target.appendChild(card);
                        card.classList.add("finish-card"); //只要移到foundation都要加上這個class，讓後面能判斷父層
                        card.style.top = "inherit";
                        card.style.left = "inherit";
                        let sourceLastChild = sourceData[4]; //取得移動後最後一個牌加上可被拖曳或放牌的屬性
                        let addDraggableCard = document.getElementById(sourceLastChild);
                        dragAttributeAdd(addDraggableCard);
                    }
                }
            }else if(dropTarget == "card"){ //移動到card時
                //須先判斷那張card在cell?foundation?card?
                //要讓Ａ對應1、j對應11、Q對應12、K對應13
                switch(sourceNum){
                    case"A": sourceNum = 1; break;
                    case"J": sourceNum = 11; break;
                    case"Q": sourceNum = 12; break;
                    case"K": sourceNum = 13; break;
                }
                switch(targetNum){
                    case"A": targetNum = 1; break;
                    case"J": targetNum = 11; break;
                    case"Q": targetNum = 12; break;
                    case"K": targetNum = 13; break;
                }
                //讓花色對應顏色
                switch(sourceSuit){
                    case"club": sourceSuitColor = "black"; break;
                    case"heart": sourceSuitColor = "red"; break;
                    case"diamond": sourceSuitColor = "red"; break;
                    case"spade": sourceSuitColor = "black"; break;
                }
                switch(targetSuit){
                    case"club": targetSuitColor = "black"; break;
                    case"heart": targetSuitColor = "red"; break;
                    case"diamond": targetSuitColor = "red"; break;
                    case"spade": targetSuitColor = "black"; break;
                }
                //console.log(e.path[0].parentElement.classList[0]); //只適用cell的判斷 因為只上一層
                if(e.path[0].parentElement.classList[0] != "cell" && sourceFrom != "foundation"){ //限制cell不能放兩張以上的牌，且不是從foundation移來的
                    if(e.path[0].classList[3] == "finish-card"){
                        card.classList.add("finish-card"); //只要移到foundation都要加上這個class，讓後面能判斷父層
                    }
                    //移到foundation裡的card的情況
                    if(e.path[0].classList[3] == "finish-card" && sourceSuit == targetSuit && sourceNum-targetNum==1){ //花色相同才可移動到foundation，移動過去的牌只比目的地的數字大一
                        e.preventDefault();
                        e.target.style.borderStyle = 'solid';
                        e.target.appendChild(card);
                        e.target.childNodes[0].style.top = "inherit";
                        e.target.childNodes[0].style.left = "inherit";
                        let sourceLastChild = sourceData[4]; //取得移動後最後一個牌加上可被拖曳或放牌的屬性
                        let addDraggableCard = document.getElementById(sourceLastChild);
                        dragAttributeAdd(addDraggableCard);
                    //移到其他卡上的情況
                    }else if(e.path[0].classList[3] != "finish-card" && sourceSuitColor != targetSuitColor && targetNum-sourceNum==1){ //顏色不同，移動過去的牌只比目的地的數字小一，可移動到其他卡上
                        e.preventDefault();
                        e.target.style.borderStyle = 'solid';
                        e.target.appendChild(card);
                        e.target.childNodes[0].style.top = "30px";
                        e.target.childNodes[0].style.left = "0px";
                        let sourceLastChild = sourceData[4]; //取得移動後最後一個牌加上可被拖曳或放牌的屬性
                        let addDraggableCard = document.getElementById(sourceLastChild);
                        dragAttributeAdd(addDraggableCard);
                    }else{
                        console.log(e.path[0].classList[3]);
                        console.log(sourceSuitColor);
                        console.log(targetSuitColor);
                        console.log(sourceNum);
                        console.log(targetNum);
                    }
                }
            }
        })
    });
}
