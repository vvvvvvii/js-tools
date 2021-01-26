// 1.先處理按鍵按下去會有聲音的部分，宣告 sounds 跟 keys
const sounds = document.querySelectorAll(".sound");
const keys = document.querySelectorAll(".keys");
// 4.宣告工具按鈕及畫布
const tools = document.querySelectorAll(".tools");
const backBtn = document.querySelector(".backspace-btn");
const resetBtn = document.querySelector(".reset-btn");
const canvas = document.querySelector(".canvas");

let displayCanvas = "";
// 5.宣告兩個陣列，讓按下去時可以顯示這兩個陣列的內容
const scale = [
    "1 ",
    "2 ",
    "3 ",
    "4 ",
    "5 ",
    "6 ",
    "7 "
]
const scaleTool = [
    "- ",
    ". ",
    "| "
]

keys.forEach((key,index) => {
    key.addEventListener("click",function(){
        sounds[index].currentTime = 0; // 3.讓音樂可以回到0秒位置
        sounds[index].play();// 2.點擊按鍵時播放該按鍵的音樂
        displayCanvas += scale[index]; // 5.點擊時可顯示對應的文字
        canvas.innerHTML = displayCanvas;
    });
});

tools.forEach((tool,index) => {
    tool.addEventListener("click",function(){
        displayCanvas += scaleTool[index]; // 5.點擊時可顯示對應的文字
        canvas.innerHTML = displayCanvas;
    });
});

// 6.backspace btn
backBtn.onclick = () =>{
    let lengthOfDisplayCanvas = displayCanvas.length; 
    displayCanvas = displayCanvas.slice(0, lengthOfDisplayCanvas -1); 
    canvas.innerHTML = displayCanvas;  
}
// 7.reset btn
resetBtn.onclick = () =>{
    displayCanvas = "";
    canvas.innerHTML = displayCanvas;  
}