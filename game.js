const color=["u", "i", "j", "k"];
let sequence =[];
let tally=0;
let level=0;
let highScore=0;
// make the buttons react when clicked
for (let i=0; i<color.length; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click",function(){ 
        if(tally===0){
            setTimeout(function(){
                nextColor();
            },500);   
        }
        else{
            check(color[i]);
        }
    });
}
// detect keyboard keys
document.addEventListener("keypress", function(event) {
    if(tally===0){
        setTimeout(function(){
            nextColor();
        },500);   
    }
    else{
        check(event.key);
    }
});
// Add another color to the sequence and play sequence
function nextColor(){
    let newColor = Math.floor(Math.random()*4);
    sequence.push(color[newColor]);
    level++;
    document.getElementById("level-title").innerHTML=`Level ${level}`;
    let i=0;
    function myLoop(){ 
        setTimeout(function(){   
            makeSound(sequence[i]);
            buttonAnimation(sequence[i]);
            i++;
            if (i<sequence.length){
                myLoop();
            }
        },500);
    }
    myLoop();
    tally=1;
}
// Check to see if the color is correct
function check(answer){
    if(answer===sequence[tally-1] && tally===level){
        makeSound(answer);
        buttonAnimation(answer);
        tally=0;
        setTimeout(function(){
            nextColor();
        },500);
        if(level>highScore){
            highScore=level
        }
        document.getElementById("high-score").innerHTML=`High Score: Level ${highScore}`; 
    }
    else if(answer===sequence[tally-1]){
        makeSound(answer);
        buttonAnimation(answer);
        tally++;
    }
    else{
        let wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        document.getElementById("level-title").innerHTML="Please any button to start";
        tally=0;
        level=0;
        sequence=[];
    }
}
 
// make the sound of the button
function makeSound(key){
    switch (key) {
        case "u":
            let green = new Audio('sounds/green.mp3');
            green.play();
            break;
        case "i":
            let red = new Audio('sounds/red.mp3');
            red.play();
            break;
        case "j":
            let yellow = new Audio('sounds/yellow.mp3');
            yellow.play();
            break;
        case "k":
            let blue = new Audio('sounds/blue.mp3');
            blue.play();
            break;
    }
}
// make the button flash when clicked
function buttonAnimation(currentkey) {
    var activeButton= document.querySelector("." + currentkey);
    activeButton.classList.add("pressed");
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    },100);
   }


