const loader = document.querySelector('#loader');
const wrap = document.querySelector('.wrap');
const doneList = document.querySelector('#doneList');
const nowTime = document.querySelector('#nowTime');
const timeInput = document.querySelectorAll('.timeInput');
const startHourInput = document.querySelector('#startHour');
const startMinInput = document.querySelector('#startMin');
const endHourInput = document.querySelector('#endHour');
const endMinInput = document.querySelector('#endMin');
const contentInput = document.querySelectorAll('.contentInput');
const submit = document.querySelector('.submit');
const subtotal = document.querySelector('#subtotal');
const deleteAllBtn = document.querySelectorAll('.deleteAllBtn');

let data = {};
let countTimeStart = false; // 自動計時是否開始
let countstartTimeArr = [];

// functions
function loadingEffect() {
  wrap.classList.remove('d-flex');
  wrap.classList.add('d-none');
}
function startNewDay() {
  const newHistoryListItem = {
    date: `${new Date().getMonth() + 1}/${new Date().getDate()}`,
    list: data.list,
    totalTime: data.totalTime,
  };
  data.historyList.push(newHistoryListItem);
  deleteList();
}
function init() {
  loader.classList.add('d-none');
  wrap.classList.remove('d-none');
  wrap.classList.add('d-flex');
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const day = new Date().getDay();
  const dayName = ['日', '一', '二', '三', '四', '五', '六'];
  doneList.innerHTML = `<h3 class="fz-m mb-3">${month}/${date}（${dayName[day]}）</h3>`;
  if (new Date().getHours() === 0 && new Date().getMinutes() === 0
  && new Date().getSeconds() === 0 && new Date().getMilliseconds() === 0) {
    startNewDay();
  }
  if (JSON.parse(localStorage.getItem('doneList')) != null) {
    // 如果 local storage 有東西， data 是 local storage 裡的東西
    data = JSON.parse(localStorage.getItem('doneList'));
  } else {
    // 如果 local storage 沒東西，新增空白 data
    data = {
      historyList: [],
      list: [],
      totalTime: 0,
      cheerUpStr: '',
    };
  }
  data.list.forEach((item, index) => {
    doneList.innerHTML += `<li class="mb-3">
      ${item.startHour}:${item.startMin} ~ ${item.endHour}:${item.endMin} ${item.content}
        <span class="material-icons btn-sm deleteSingleBtn" data-btn="delete-single" data-listindex="${index}">
          delete
        </span>
    </li>`;
  });
  // data.totalTime 不是 0 才秀今天總工時
  subtotal.innerHTML = data.totalTime === 0 ? '<h2 class="fz-lg mb-2">趕緊開始紀錄今天的工作吧！</h2>' : `<h2 class="fz-lg mb-2">今天總共工作了 ${(data.totalTime / 60).toFixed(1)} 小時</h2> <p>${data.cheerUpStr}</p>`;
}
function resetInput() {
  startHourInput.value = '';
  startMinInput.value = '';
  endHourInput.value = '';
  endMinInput.value = '';
  contentInput[0].value = '';
  contentInput[1].value = '';
}
function calculateTime(newItem) {
  data.totalTime
  += 60 * (newItem.endHour - newItem.startHour) + (newItem.endMin - newItem.startMin);
  if (data.totalTime / 60 <= 4) {
    data.cheerUpStr = '是不是對自己太好了呢？加油加油！';
  } else if (data.totalTime / 60 <= 6) {
    data.cheerUpStr = '照著這個步調，你一定可以的！';
  } else if (data.totalTime / 60 <= 8) {
    data.cheerUpStr = '哇！今天的工作時數達標啦！';
  } else {
    data.cheerUpStr = '好像有點努力過頭了～今天辛苦了，早點休息唷！';
  }
}
function submitNewItem(e) {
  const newItem = {};
  let startHourValue;
  let startMinValue;
  let endHourValue;
  let endMinValue;
  if (e === 'submit') {
    startHourValue = Number(startHourInput.value);
    startMinValue = Number(startMinInput.value);
    endHourValue = Number(endHourInput.value);
    endMinValue = Number(endMinInput.value);
    if (startHourValue > 23 || endHourValue > 23 || startMinValue > 59 || endMinValue > 59 || startHourInput.value === '' || endHourInput.value === '' || startMinInput.value === '' || endMinInput.value === '' || (startHourValue === endHourValue && startMinValue === endMinValue) || startHourValue > endHourValue || (startHourValue === endHourValue && startMinValue > endMinValue)) {
      // 測試是否為空值的判斷式，要用沒被 Number() 轉過的，不然 0 會被判斷成空值
      alert('請輸入正確的時間');
      return;
    } else if (contentInput[1].value === '') {
      alert('請填入完成事項');
      return;
    }
    newItem.content = contentInput[1].value;
  } else {
    const startTime = nowTime.innerHTML.split(' ~ ')[0];
    const endTime = nowTime.innerHTML.split(' ~ ')[1];
    startHourValue = Number(startTime.split(':')[0]);
    startMinValue = Number(startTime.split(':')[1]);
    endHourValue = Number(endTime.split(':')[0]);
    endMinValue = Number(endTime.split(':')[1]);
    newItem.content = contentInput[0].value;
  }
  newItem.startHour = startHourValue;
  newItem.startMin = startMinValue;
  newItem.endHour = endHourValue;
  newItem.endMin = endMinValue;
  data.list.push(newItem);
  resetInput(); // 清空表單
  nowTime.innerHTML = '尚未開始計時'; // 確定結束時間被紀錄後，調回預設文字
  calculateTime(newItem);
  localStorage.setItem('doneList', JSON.stringify(data));
  init(); // 初始化
}
function deleteList() {
  data.list = [];
  data.totalTime = 0;
  localStorage.setItem('doneList', JSON.stringify(data));
  init();
}
function deleteItem(e) {
  const index = e.target.dataset.listindex;
  const item = data.list[index];
  // 刪除項目時，總工時也要減少
  data.totalTime -= 60 * (item.endHour - item.startHour) + (item.endMin - item.startMin); 
  data.list.splice(index, 1);
  localStorage.setItem('doneList', JSON.stringify(data));
  init();
}
function countLoop() {
  if (countTimeStart) {
    const time = new Date();
    const endHours = time.getHours();
    const endMins = time.getMinutes();
    const endSecs = time.getSeconds();
    nowTime.innerHTML = `${countstartTimeArr[0]}:${countstartTimeArr[1]}:${countstartTimeArr[2]} ~ ${endHours}:${endMins}:${endSecs}`;
    requestAnimationFrame(countLoop);
  } else {
    cancelAnimationFrame(countLoop);
  }
}
function countTimeStatus() { // 不能放在 countLoop() 會計算錯誤
  if (contentInput[0].value === '') {
    alert('請先填入事項內容');
    return;
  }
  countTimeStart = !countTimeStart;
  if (countTimeStart) {
    nowTime.innerHTML = '';
    countstartTimeArr = [];
    const time = new Date();
    countstartTimeArr.push(time.getHours(), time.getMinutes(), time.getSeconds());
    countLoop();
  } else {
    submitNewItem('timing');
  }
}
function checkBtnType(e) {
  e.preventDefault();
  if (e.target.dataset.btn === 'submit') {
    submitNewItem('submit');
  } else if (e.target.dataset.btn === 'timing') {
    countTimeStatus();
  } else if (e.target.dataset.btn === 'delete-single') {
    deleteItem(e);
  }
}
function inputFocusEffect(e) {
  if (e.keyCode === 13) {
    let nextItem;
    if (Number(e.target.dataset.num) < 4) { // 按 enter 且不是停在最後一個 timeInput 時
      nextItem = timeInput[e.target.dataset.num]; // 下個物件在 timeInput 陣列的 index 為e.target.dataset.num
    } else if (Number(e.target.dataset.num) === 4) { // 點到最後一個 timeInput 要跳 contentInput
      nextItem = contentInput[1];
    } else {
      nextItem = submit;
    }
    nextItem.focus(); // HTMLElement.focus() 讓特定 element 被 focus
  }
}

// event Listener
window.addEventListener('DOMContentLoaded', loadingEffect); // loader effect
window.addEventListener('load', init);
window.addEventListener('click', checkBtnType);
deleteAllBtn.forEach((item) => item.addEventListener('click', deleteList));
timeInput.forEach((item) => item.addEventListener('keydown', inputFocusEffect)); // input 點 enter 會自動跳下一個 input
contentInput.forEach((item) => item.addEventListener('keydown', inputFocusEffect)); // contentinput 點 enter 會自動跳送出
