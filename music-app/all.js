window.addEventListener('load', () => {
    // 1.先處理按鍵按下去會有聲音的部分，宣告 sounds 跟 pads
    const sounds = document.querySelectorAll(".sound");
    const keys = document.querySelectorAll(".keyboards div");

    keys.forEach((key,index) => {
        key.addEventListener("click",function(){
            sounds[index].currentTime = 0; // 3.讓音樂可以回到0秒位置
            sounds[index].play();// 2.點擊按鍵時播放該按鍵的音樂

            
        });
    });
});
