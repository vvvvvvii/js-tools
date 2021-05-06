const doneList = document.querySelector('#doneList');
const startHour = document.querySelector('#startHour');
const startMin = document.querySelector('#startMin');
const endHour = document.querySelector('#endHour');
const endMin = document.querySelector('#endMin');
const content = document.querySelector('#content');
const submit = document.querySelector('#submit');
const subtotal = document.querySelector('#subtotal');

let data=[];
let totalTime = 0;
let cheerUpStr = '';

//functions
function init(){
  doneList.innerHTML = '';
  data.forEach(item=>{
    doneList.innerHTML += `<li class="doneItem">${item.startHour}:${item.startMin} ~ ${item.endHour}:${item.endMin} ${item.content}</li>`
  })
  subtotal.innerHTML = `
    <h2>今天總共工作了 ${totalTime/60} 小時</h2>
    <p>${cheerUpStr}</p>
  `
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
  if(startHour.value>23 || endHour.value>23 || startMin.value>59 || endMin.value>59 || startHour.value=="" || endHour.value=="" || startMin.value=="" || endMin.value=="" || (startHour.value==endHour.value&&startMin.value==endMin.value) || startHour.value> endHour.value || (startHour.value==endHour.value&&startMin.value> endMin.value)){ 
      alert('請輸入正確的時間');
      return;
  }else if(content.value==""){
      alert('請填入完成事項');
      return;
  }
  let newItem = {};
  newItem.startHour = Number(startHour.value);
  newItem.startMin = Number(startMin.value);
  newItem.endHour = Number(endHour.value);
  newItem.endMin = Number(endMin.value);
  newItem.content = content.value;
  data.push(newItem);
  resetInput(); //清空表單
  calculateTime(newItem);
  init(); //初始化
}
function calculateTime(newItem){
  totalTime+= 60*(newItem.endHour - newItem.startHour)+(newItem.endMin - newItem.startMin);
  if(totalTime/60<=4){
    cheerUpStr = '是不是對自己太好了呢？加油加油！';
  }else if(totalTime/60<=6){
    cheerUpStr = '照著這個步調，你一定可以的！';
  }else if(totalTime/60<=8){
    cheerUpStr = '哇！今天的工作時數達標啦！';
  }else{
    cheerUpStr = '好像有點努力過頭了～今天辛苦了，早點休息唷！';
  }
}
//event Listener
submit.addEventListener('click',submitNewItem)

init();
