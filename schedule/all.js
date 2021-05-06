const doneList = document.querySelector('#doneList');
const startHour = document.querySelector('#startHour');
const startMin = document.querySelector('#startMin');
const endHour = document.querySelector('#endHour');
const endMin = document.querySelector('#endMin');
const content = document.querySelector('#content');
const submit = document.querySelector('#submit');
const subtotal = document.querySelector('#subtotal');

/*let data={
    list: [],
    totalTime : 0,
    cheerUpStr : ''
}*/
let data={};

//functions
function init(){
    doneList.innerHTML = '';
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
    doneList.innerHTML += `<li class="doneItem">${item.startHour}:${item.startMin} ~ ${item.endHour}:${item.endMin} ${item.content}</li>`
  })
  subtotal.innerHTML = `
    <h2>今天總共工作了 ${(data.totalTime/60).toFixed(1)} 小時</h2>
    <p>${data.cheerUpStr}</p>
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
//event Listener
submit.addEventListener('click',submitNewItem)
window.addEventListener('load',init);

