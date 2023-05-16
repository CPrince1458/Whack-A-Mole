//declares the arrays needed to store the references to the moles and their holes
var Moles = [];
var Holes = [];

//runs once the page has loaded
document.addEventListener("DOMContentLoaded", function(){
    
    //centers the game, this allows me to use absolute positioning which fixes issues I was having with it moving
    document.getElementById("game").style.left = String(window.innerWidth / 2 - 450) + "px";
    
    //runs 6 times
    for(i = 1; i < 7; i++){
        
        //adds teh references to each mole image to the array
        Moles.push(document.getElementById("mole" + i));
        
        //adds the references for each hole to its array, adds an onClick event listener to each that will run the Whack function
        Holes.push(document.getElementById("hole" + i));
        Holes[i - 1].addEventListener("click", Whack);
        
    }
    
});

//declares the global variables needed to run the game
var timeLeft;
var updateInterval;
var score;
var running;

//runs when the play button is clicked
function Play(){
    
    //runs the update function every 10 milliseconds
    updateInterval = setInterval(Update, 10);
    
    //sete each variable to its starting value
    timeLeft = 30;
    score = 0;
    running = true;
    
    //cals the Popup function to make a mole popup and start the cycle
    Popup();
    
    //references the instructions and info <div>s (had to be in each function for some reason)
    var instructions = document.getElementById("instructions");
    var info = document.getElementById("info");
    
    //makes the instruction dissapear and be replaced by the info screen for while the game is running
    instructions.style.display = "none";
    info.style.display = "block";
    
}

//rubns every 10 milliseconds once the game has been started
function Update(){

    if(timeLeft > 0){
        
        //decreases the time left
        timeLeft = (timeLeft - 0.01).toFixed(2);
        
        //updates the timer shown on screen (variable had to be put within the fnction for whatever reason)
        let timer = document.getElementById("timer");
        timer.innerHTML = "Time Left: " + timeLeft.toString();
        
        //updates the score
        let scoreP = document.getElementById("score");
        scoreP.innerHTML = "Score: " + score;
        
    }
    else{
        
        //changes the timer to decalre time is up
        let timer = document.getElementById("timer");
        timer.innerHTML = "Time is up!";
        
        //stops the update funtion from being called, changes the unning variable
        clearInterval(updateInterval);
        running = false;
    }
    
}

//runs when the reset button is clicked
function Restart() {
    
    //switches the visible <div>
    var instructions = document.getElementById("instructions");
    var info = document.getElementById("info");
    instructions.style.display = "block";
    info.style.display = "none";
 
    //stops the game from running, stops the update function from being called
    running = false;
    clearInterval(updateInterval);
    
}

//declares theglobal variable for the index of which mole is being called
var moleNum;

//first called on game start. then after the mole pops down
function Popup() {
    
    //only runs if the game is running
    if(running == true) {
        
        //picks the number for a random mole to pop up
        moleNum = Math.round(Math.random() * 5);
        
        //sets how long the mole will pop up for
        let length = Math.random() * (0.8 - 0.4) + 0.4;
        
        //changes the animation length, makes the mole pop up
        Moles[moleNum].style.animationDuration = length;
        Moles[moleNum].classList.add("Popup");
        
        //calls the reset function to reset the mole, changes the clicked varibale so the new mole can be clicked
        setTimeout(Reset, (length * 1000) + 100);
        clicked = false;
        
    }
}

//called after the mole pops up
function Reset() {
    
    //removes the animation from the moles so it can later be added back to make it play again
    Moles[moleNum].classList.remove("Popup");
    
    //calls the popup function, the delay was neccessary so the animation was properly removed
    //if there was no delay, the game would freeze and stop workig if the same one was called twice in a row
    setTimeout(Popup, 100);
    
}

//declares the global variabe that determines if the mole has already been clicked
var clicked;

//runs whenever a hole is clicked
function Whack() {
    
    //only runs if the correct one has been clicked and it has not been clicked yet for this popup
    if (Holes.indexOf(this) == moleNum && clicked == false){
        
        //incerases the score, updates the clickedvariable
        score++;
        clicked = true;
    }
    
}