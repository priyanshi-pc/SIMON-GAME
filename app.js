let gameSeq = [];
let userSeq = [];
let level = 0;
let h2 = document.querySelector("h2");
let h3 = document.createElement("h3");

let btns = ["red", "yellow", "green", "purple"];

let startBtn = document.getElementById("start");
let started= false;
startBtn.addEventListener("click", function() {
    if(started == false){
        console.log("game started");
        started = true;
    } 

    if(!document.querySelector("body").contains(h3)) {
        h2.after(h3);
    }
    h3.style.display = "block"; 

    levelUp();
});

function levelUp() {

    userSeq = [];
    level++;
    

    if(checkHighScore()) {
        return;
    }

    h2.innerText = `LEVEL ${level}`;
    h3.innerText = `SCORE : ${Math.max(level-1, 0)}`;
    

    let randIndex = Math.floor(Math.random() * 4) ;
    let randColor = btns[randIndex];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);

}

function checkAns(idx) {
    
    if (!started) return;            //jab tak game start na ho, no btn will be pressed

    if(userSeq[idx] === gameSeq[idx]) {                 //“Ye line check kar rahi hai ki user ne jo last button press kiya hai, vo game ke sequence ke same position wale button se match karta hai ya nahi.”
        if(userSeq.length == gameSeq.length) {          //we are at last index
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `GAME OVER! Your Score : ${level-1}`;
        h3.style.display = "none";                  //h3 ko hide kar diya,when game over
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        
        reset();
    }
}


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 100);
};


function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 100);
}



function btnPress() {
    let btn = this;
    userFlash(btn);
    
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1);            //checking last pressed btn only
}

let allbtn = document.querySelectorAll(".btn");
for(btn of allbtn) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    userSeq =[];
    gameSeq = [];
    level = 0;
    started = false;
}


let highScore = 0;
function checkHighScore() {

    let score = Math.max(level - 1,0);

    if(score === 5) {
        h2.innerHTML = `🎉 HIGH SCORE! You reached ${score}!<br>Press START to play again.`;
        h3.style.display = "none";
        reset();
        return true;
    }

    return false;
}