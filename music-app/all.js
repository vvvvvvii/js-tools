// 1.先處理按鍵按下去會有聲音的部分，宣告 sounds 跟 pads
const sounds = document.querySelectorAll(".sound");
const keys = document.querySelectorAll(".keyboards div");

const svgC = document.querySelectorAll(".svgC");
const svgD = document.querySelectorAll(".svgD");
const svgE = document.querySelectorAll(".svgE");
const svgF = document.querySelectorAll(".svgF");
const svgG = document.querySelectorAll(".svgG");
const svgA = document.querySelectorAll(".svgA");
const svgB = document.querySelectorAll(".svgB");

//5.宣告陣列，讓按鍵對應到要調整透明度的項目
const svg = [
    svgC,
    svgD,
    svgE,
    svgF,
    svgG,
    svgA,
    svgB
];

keys.forEach((key,index) => {
    key.addEventListener("click",function(){
        sounds[index].currentTime = 0; // 3.讓音樂可以回到0秒位置
        sounds[index].play();// 2.點擊按鍵時播放該按鍵的音樂
        //4. 按下按鍵時讓顏色透明度為1 顯示顏色
        /*svg[index].*/paint(); //key[0]對應svg[0] key[1]對應svg[1]
    });
});

//目的是要讓這裡變成svgC[0].style.opacity = "1" svgC[1].style.opacity = "1"...etc
//paint 要取出對應 index 的值（keys[0]=svgC keys[1]=svgD）
//取出後要取出如 svgC 的每一筆資料
//將取出的每筆資料都加上   .style.opacity = "1"

function paint(){
    //svgC[0].setAttribute("opacity","1"); //有成功變色
    svgC.forEach(function(item,index){
        item.setAttribute("opacity","1");
    })
}

/*
var array = [1,2,3,4,5];
var allDiv = document.querySelectorAll('div');
allDiv.forEach(function(item, i){
  item.setAttribute('id', array[i]);
});

*/







/*
    bf0000:
    svg_257
    svg_154
    svg_264
    svg_170
    svg_174
    svg_166
    svg_236
    svg_220
    svg_280
    svg_224
    svg_234
    svg_261
    svg_274
    svg_282
    svg_173
    svg_293
    svg_298


*/