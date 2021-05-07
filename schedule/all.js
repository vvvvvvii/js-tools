const loader= document.querySelector('#loader');
const wrap= document.querySelector('.wrap');
const doneList = document.querySelector('#doneList');
const startHour = document.querySelector('#startHour');
const startMin = document.querySelector('#startMin');
const endHour = document.querySelector('#endHour');
const endMin = document.querySelector('#endMin');
const content = document.querySelector('#content');
const submit = document.querySelector('#submit');
const subtotal = document.querySelector('#subtotal');
const deleteAllBtn = document.querySelector('#deleteAllBtn');

let data={};

//functions
function loadingEffect(){
  wrap.classList.remove('d-flex');
  wrap.classList.add('d-none');
}
function init(){
  loader.classList.add('d-none');
  wrap.classList.remove('d-none');
  wrap.classList.add('d-flex');
  const month = new Date().getMonth()+1;
  const date = new Date().getDate();
  const day = new Date().getDay();
  const dayName = ["日","一","二","三","四","五","六"];
  doneList.innerHTML = `<h3 class="fz-m mb-3">${month}/${date}（${dayName[day]}）</h3>`;
  if(JSON.parse(localStorage.getItem('doneList'))!=null){
    //如果 local storage 有東西， data 是 local storage 裡的東西
    data = JSON.parse(localStorage.getItem('doneList'));
  }else{
    //如果 local storage 沒東西，新增空白 data
    data={
      list: [],
        totalTime : 0,
        cheerUpStr : ''
    }
  }
  data.list.forEach(item=>{
    doneList.innerHTML += `<li class="mb-3">${item.startHour}:${item.startMin} ~ ${item.endHour}:${item.endMin} ${item.content}</li>`
  })
  //data.totalTime 不是 0 才秀今天總工時
  subtotal.innerHTML = data.totalTime==0 ? `<h2 class="fz-lg mb-2">趕緊開始紀錄今天的工作吧！</h2>` : `<h2 class="fz-lg mb-2">今天總共工作了 ${(data.totalTime/60).toFixed(1)} 小時</h2> <p>${data.cheerUpStr}</p>`
}
function resetInput(){
  startHour.value = "";
  startMin.value = "";
  endHour.value = "";
  endMin.value = "";
  content.value = "";
}
function submitNewItem(e){
    e.preventDefault();
    let startHourValue = Number(startHour.value);
    let startMinValue = Number(startMin.value);
    let endHourValue = Number(endHour.value);
    let endMinValue = Number(endMin.value);
    if(startHourValue>23 || endHourValue>23 || startMinValue>59 || endMinValue>59 || startHour.value=="" || endHour.value=="" || startMin.value=="" || endMin.value=="" || (startHourValue==endHourValue&&startMinValue==endMinValue) || startHourValue> endHourValue || (startHourValue==endHourValue&& startMinValue>endMinValue)){  
        //測試是否為空值的判斷式，要用沒被 Number() 轉過的，不然 0 會被判斷成空值
        alert('請輸入正確的時間');
        return;
    }else if(content.value==""){
        alert('請填入完成事項');
        return;
    }
  let newItem = {};
  newItem.startHour = startHourValue;
  newItem.startMin = startMinValue;
  newItem.endHour = endHourValue;
  newItem.endMin = endMinValue;
  newItem.content = content.value;
  data.list.push(newItem);
  resetInput(); //清空表單
  calculateTime(newItem);
  saveLocalStorage();
  init(); //初始化
}
function calculateTime(newItem){
  data.totalTime+= 60*(newItem.endHour - newItem.startHour)+(newItem.endMin - newItem.startMin);
  if(data.totalTime/60<=4){
    data.cheerUpStr = '是不是對自己太好了呢？加油加油！';
  }else if(data.totalTime/60<=6){
    data.cheerUpStr = '照著這個步調，你一定可以的！';
  }else if(data.totalTime/60<=8){
    data.cheerUpStr = '哇！今天的工作時數達標啦！';
  }else{
    data.cheerUpStr = '好像有點努力過頭了～今天辛苦了，早點休息唷！';
  }
}
function saveLocalStorage(){
    localStorage.setItem('doneList',JSON.stringify(data));
}
function clearLocalStorage(){
    if(confirm("是否確定開始新的一天？舊的紀錄會跟喝下孟婆湯一樣回不來ㄛ！")){
        localStorage.clear(); //local storage 資料歸 0
        init();
    }
}
//event Listener
window.addEventListener('DOMContentLoaded',loadingEffect);
window.addEventListener('load',init);
submit.addEventListener('click',submitNewItem);
deleteAllBtn.addEventListener('click',clearLocalStorage);

