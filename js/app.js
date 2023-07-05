// Assignment 1 | COMP1073 Client-Side JavaScript

/* Variables
-------------------------------------------------- */
// Create a new speechSynthesis object
var synth = window.speechSynthesis;
// Learn more about SpeechSynthesis.speak() at https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak
var textToSpeak = 'This is the text string that you will generate with your script';
var buttons = document.querySelectorAll('button');
buttons[6].disabled = true;


/* Functions
-------------------------------------------------- */
function speakNow(string) {
	// Create a new speech object, attaching the string of text to speak
	var utterThis = new SpeechSynthesisUtterance(string);
	// Actually speak the text
	synth.speak(utterThis);
}

/* Event Listeners
-------------------------------------------------- */
// Onclick handler for the button that speaks the text contained in the above var textToSpeak
/*
speakButton.onclick = function() {
	speakNow(textToSpeak);
}
*/                
/* Eric Work*/
let columns = [["The turkey","Mom","Dad","The dog","My teacher","The elephant","The cat"],
			   ["sat on","ate","danced with","saw","doesn't like","kissed"],
			   ["a funny","a scary","a goofy","a slimy","a barking","a fat"],
			   ["goat","monkey","fish","cow","frog","bug"],
			   ["on the moon","on the chair","in my spaghetti","in my soup","on the grass", "in my shoes"]];
			   
function wordGetter(buttonNum){//The amount of times I would get the same number for 2 columns in a row was concerning but I think it's just a coincidence since I can't consistently get it.
	let rand = Math.floor(Math.random() * columns[buttonNum].length);
	console.log("random number: "+rand);
	styler(rand,buttonNum);
	return columns[buttonNum][rand];
}
function styler(randNum ,buttonNum){
	//console.log("Got the following: randNum: "+randNum+" buttonNum: "+(buttonNum+1));
	let columnText = document.getElementsByClassName('col'+(buttonNum+1));
	
	
		for(let x = 0; x <columnText.length; x++){
			columnText[x].style.color = "black";
		}
		if(randNum !="reset")
			columnText[randNum].style.color = "#f4f4f4";
		
	
}

words = [];
var buttons = document.getElementsByClassName('b');
console.log(buttons)

for(let x = 0;x<=4;x++){
	buttons[x].onclick = function(){
		console.log("Button #"+x);
		words[x] = wordGetter(x);
		console.log(words[x]);
		buttons[6].disabled = false;
	}
}

buttons[5].onclick = function(){//Play audio button
	let finalText = "";
	for(let x =0;x<words.length;x++){
		finalText += words[x] + " ";
	}
	console.log("Speaking: "+finalText);
	document.getElementById("finalTextDisplay").textContent = finalText;
	speakNow(finalText);
	
	
}
buttons[6].onclick = function(){//Reset selection
	words = [];
	console.log("Reset words selection")
	document.getElementById("finalTextDisplay").textContent = "";
	for(let x =0;x<=4;x++)
		styler("reset",x);
	buttons[6].disabled = true;
}