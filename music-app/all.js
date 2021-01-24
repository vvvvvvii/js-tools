window.addEventListener('load', () => {
    // 1.先處理按鍵按下去會有聲音的部分，宣告 sounds 跟 pads
    const sounds = document.querySelectorAll(".sound");
    const pads = document.querySelectorAll(".pads div");
    // 4. 處理按鍵按下去會有有顏色的球跳動的部分，宣告visual
    const visual = document.querySelector(".visual");
    // 5. 讓跳動的球有顏色
    const colors = [
      "#f8961e",
      "#f94144",
      "#90be6d",
      "#577590",
      "#f3722c",
      "#43aa8b",
      "#f9c74f"
    ]

    pads.forEach((pad,index) => {
        pad.addEventListener("click",function(){
            sounds[index].currentTime = 0; // 3.讓音樂可以回到0秒位置
            sounds[index].play();// 2.點擊按鍵時播放該按鍵的音樂

            createBubbles(index);
        });
    });
    // 5. 建一個 div ，取名為變數 bubble，並讓它產生動畫效果跳動
    const createBubbles = index => {
      const bubble = document.createElement("div"); //建一個 div ，取名為變數 bubble
      visual.appendChild(bubble); //把建好的元素放到 visual 區塊裡，這裡因為上面已經指定 visual = document.querySelector(".visual"); 所以可以確定他就是代表 html 中的 .visual
      bubble.style.backgroundColor = colors[index]; //bubble 的顏色等於上面 colors 陣列的顏色，[] 裡用 index 裝，可以對應到相對應的顏色
      bubble.style.animation = 'jump 1s ease'; //幫 bubble 設動畫效果， jump 設定放在 all.scss
      // 6. 要避免按太多次 visual 不斷新增東西導致系統負荷過重
      bubble.addEventListener("animationend",function(){ //當 bubble 執行動畫完成
        visual.removeChild(this); //把 visual 區移除 bubble 才不會因為按太多鍵讓系統負荷過重
      });
    }
});
