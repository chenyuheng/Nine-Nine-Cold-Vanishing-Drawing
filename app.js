
strokesPath = [];

let partsPath = "pic/笔画/亭前垂柳珍重待春风_00";
let bgPath = "pic/亭前垂柳珍重待春风.png";
let status = 0;
selfAdapt();

function switchStatus() {
    if (status == 1) {
        partsPath = "pic/笔画/亭前垂柳珍重待春风_00";
        bgPath = "pic/亭前垂柳珍重待春风.png";
        status = 0;
    } else {
        partsPath = "pic/花瓣/梅花_00";
        bgPath = "pic/梅花.png";
        status = 1;
    }
    initialize();
}

function selfAdapt() {
    let height = Math.min(window.innerHeight, window.innerWidth) * (2 / 3);
    let width = height / 1.2;
    let style = document.createElement("style");
    style.innerText = "img{height:" + height + "px;}"
        + "#imageContainer{height:" + (height + 60) + "px;width:"+ (width + 60) +"px;}"
        + "#main{height:" + (height + 100) + "px;width:"+ (width + 100) +"px;}";
    document.getElementsByTagName("head")[0].appendChild(style);
}

window.onresize = function(){
    selfAdapt();
}

function initialize() {
    initializePaths();
    display(getDayDiff());
}

function initializePaths() {
    let i;
    strokesPath = [];
    for (i = 0; i < 81; i++) {
        strokesPath.push(partsPath
            + (i < 10 ? "0" : "") + i + "_" + parseInt(i / 9 + 1) + "-" + (i % 9 + 1)  + ".png");
    }
}

function getDayDiff() {
    let now = new Date();
    let 冬至日 = [21, 22, 22, 22, 21, 22, 22, 22, 21, 22, 22, 22, 21, 22, 22, 22, 21, 22, 22, 22, 21, 21, 22, 22, 21, 21, 22, 22, 21, 21, 22, 22, 21, 21, 22, 22, 21, 21, 22, 22, 21, 21, 22, 22, 21, 21, 22, 22, 21, 21];
    // 从2000年到2019年的冬至日数。数据来源：https://www.timeanddate.com/calendar/seasons.html?year=2000
    let 冬至 = new Date();
    if (now.getMonth() >10) { // 以十二月初为新一年的九九消寒图的界限
        冬至.setFullYear(now.getFullYear());
    } else {
        冬至.setFullYear(now.getFullYear() - 1);
    }
    冬至.setMonth(11); // 十二月
    冬至.setDate(冬至日[冬至.getFullYear() - 2000]); // 2050年前都有效
    let timeDiff = now.getTime() - 冬至.getTime();
    let dayDiff = timeDiff / 1000 / 60 / 60 / 24;
    return dayDiff + 1;
}

function display(day) {
    let imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = "";
    let bg = document.createElement("img");
    bg.setAttribute("src", bgPath);
    let bgDiv = document.createElement("div");
    bgDiv.setAttribute("class", "image");
    bgDiv.appendChild(bg);
    imageContainer.appendChild(bgDiv);
    let i;
    for (i = 0; i < day && i < 81; i++) {
        let image = document.createElement("img");
        image.setAttribute("src", strokesPath[i]);
        let imageDiv = document.createElement("div");
        imageDiv.setAttribute("class", "image");
        imageDiv.appendChild(image);
        imageContainer.appendChild(imageDiv);
    }
}