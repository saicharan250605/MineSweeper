let minesweepcontainer=document.querySelector("#minesweepContainer");
let grids=document.querySelectorAll(".boxes");
let toughnessButtons=document.querySelectorAll(".toughness-buttons");
let toughnessDiv=document.querySelector(".toughness");
let heading=document.querySelector("h1");
let toughnessText=document.querySelector(".toughness-text");
let countofRightSelection=0;
let originalcount=0;
let isGameOver=false;
let randomArray=5;

toughnessButtons.forEach((value)=>{
    value.onclick=() =>{
        toughnessDiv.style.display="none";
        heading.style.display="none";
        if(value.innerText==='Expert'){
        originalcount=25;
        toughnessText.innerHTML="<p>Choose <span class='number-count'>25</span> safe blocks to win</p>";
        countofRightSelection=document.querySelector(".number-count");
        Selectbomb(25);
        displaybomb();
        setTimeout(modeSelected,5000);
        }
        else{
        originalcount=30;
        toughnessText.innerHTML="<p>Choose <span class='number-count'>30</span> safe blocks to win</p>";
        countofRightSelection=document.querySelector(".number-count");
        if(value.innerText==='Beginner')
            Selectbomb(10);
        if(value.innerText==='Intermediate')
            Selectbomb(20);
        displaybomb();
        setTimeout(modeSelected,5000);
        }
    }
});

let Selectbomb = (bombcount) =>{
    let randomNumbers = new Set();
    while(randomNumbers.size!=bombcount){
        randomNumbers.add(Math.floor(Math.random()*64));
    }
    randomArray=[...randomNumbers];
    randomNumbers.clear();
};

let displaybomb = () =>{
    for(let i of randomArray){
        grids[i].classList.add("bomb-image");     
    }
};
let displaymiddlefinger=()=>{
    for(let i of randomArray){
        grids[i].setAttribute("class","middlefinger");
    }
    minesweepcontainer.classList.add("removeMainContainerwhenlost");
    toughnessText.classList.add("removeMainContainerwhenlost");
    document.querySelector("#won").innerText="Sorry you lost";
    document.querySelector("#won").classList.add("lostclass");
};
let handler =(event)=>{
    let singlegrid=event.target;
    let safegrid=singlegrid.getAttribute("class");
    if(safegrid=="boxes bomb-image" && isGameOver==false){
        isGameOver=true;
        grids.forEach((value)=>{
            value.removeEventListener("click",handler);
        });
        toughnessText.style.color="red";
        toughnessText.innerHTML="<p>You Lost</p>";
        displaymiddlefinger();
    }
    else if((safegrid=="boxes") && isGameOver==false) {
    originalcount--;
    if(originalcount==0){
        isGameOver=true;
        minesweepcontainer.classList.add("removeMainContainerwhenwon");
        toughnessText.classList.add("removeMainContainerwhenwon");
        document.querySelector("#won").classList.add("wonclass");
        toughnessText.innerHTML="<p>You Won</p>";
        toughnessText.style.color="green";
    }
    countofRightSelection.innerText=originalcount;
    singlegrid.innerHTML="<span class='tickMark'>&#x2714;</span>";
    singlegrid.style.boxShadow="inset -3px -3px 4px black, inset 3px 3px 5px black";
    singlegrid.removeEventListener("click",handler);
    }
};
let modeSelected= () =>{
    grids.forEach((value)=>{
        value.addEventListener("click",handler);
    });
    // for(let i=0;i<=63;i++){
    //     let idname=`hi${i}`;
    //     let singlegrid=document.querySelector(`#${idname}`);
    //     singlegrid.addEventListener("click",handler);
    // }
};