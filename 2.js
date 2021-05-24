let curPartOfText = 0;
let indicator = document.querySelector("div.point");
const elements = ['1 Katherine Mansfield, an outstanding English short-story writer of the 20th century.',
                    '2 She is the author of a number of excellent short stories which deal with human nature and psychology.',  
                    '3  At the age of eighteen she decided to become a professional writer.'];
const index = [elements.length];

function elemPrev(num){
    num = num || 1;
    
    let prevElement = curPartOfText;
    curPartOfText -= num;

    if(curPartOfText < 0){
        curPartOfText = elements.length -1;
    }
}

function elemNext(){
    num = num || 1;

    let prevElement = curPartOfText;
    curPartOfText += num;
    if(curPartOfText >= elements.length){
        curPartOfText = 0;
    }
}

function initialize(){
    document.getElementById("partOfText").innerText = elements[index]
    let some = "";
    document.getElementById("partOfText").innerText = elements[curPartOfText];
    for (let i = 0; i < elements.length; i++) {
        some += '<span class="dot" id = "dot' + i + '"></span>';
    }
    indicator.innerHTML = some
    paintDots(0);
    indicatorDotsAll = document.querySelectorAll("div.point");
    for(let i = 0; i < elements.length; i++){
       document.getElementById("dot" + i).addEventListener('click', function(e){
           let index = parseInt( e.target.id.substr(3));
            document.getElementById("partOfText").innerText = elements[index]
            paintDots(index);
        }, false);
    };

    checkbox.addEventListener('click', function(e){
        if(document.getElementById('checkbox').checked){
            localStorage.setItem("notifications", "off"); 
        }
    })
}

function paintDots(num){
    for(let i = 0; i < elements.length; i++) {
        document.getElementById("dot" + i).style.cssText = 'background-color:rgb(158, 114, 47); cursor:pointer;'
    }
    document.getElementById("dot" + num).style.cssText = 'background-color: rgb(223, 177, 109); cursor:default;';
}

window.onload = function(){
    setTimeout(loadAfterTime, 5000)
    if(localStorage.getItem("notifications") == null){
        localStorage.setItem("notifications", "on");
    }
 };

 function loadAfterTime() { 
     if(localStorage.getItem("notifications") != null){
         if(localStorage.getItem("notifications") == "on"){
            document.getElementById("infDialog").showModal();
         }
     }
     initialize();
 }


 function closeDialog(){
    infDialog.close();
 }
 
document.getElementById("closeDialog").onclick = function() { 
    closeDialog();
}

function rightAllow(){
    curPartOfText += 1;
    if(curPartOfText == elements.length){
        curPartOfText = 0;
    }
    document.getElementById("partOfText").innerText = elements[curPartOfText];
    paintDots(curPartOfText)
}

document.getElementById("rightSwipe").onclick = function(){
    rightAllow()
}

function leftAllow(){
    curPartOfText -= 1;
    if(curPartOfText == -1){
        curPartOfText =  elements.length - 1;
    }
    document.getElementById("partOfText").innerText = elements[curPartOfText];
    paintDots(curPartOfText)
}

document.getElementById("leftSwipe").onclick = function(){
    leftAllow();
}

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '37') {
        leftAllow();
    }
    else if (e.keyCode == '39') {
        rightAllow();
    }
    else if (e.keyCode == '27') {
        rightAllow();
    }
}
