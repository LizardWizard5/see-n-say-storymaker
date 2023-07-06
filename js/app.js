// Assignment 1 | COMP1073 Client-Side JavaScript

/* Variables
-------------------------------------------------- */
// Create a new speechSynthesis object
var synth = window.speechSynthesis;
// Learn more about SpeechSynthesis.speak() at https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak
var textToSpeak = 'This is the text string that you will generate with your script';
var buttons = document.querySelectorAll('button');//Grabs all the button elements
buttons[6].disabled = true;//Starts out the reset button as disabled since there is nothing to reset


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
//Multidimension array with each inner array containing the contenets of the columns in order
let columns = [["The turkey","Mom","Dad","The dog","My teacher","The elephant","The cat"],//Col 1 Length: 7
			   ["sat on","ate","danced with","saw","doesn't like","kissed"],// Col 2 Length: 6
			   ["a funny","a scary","a goofy","a slimy","a barking","a fat"],// Col 3 Length 6
			   ["goat","monkey","fish","cow","frog","bug"],// Col 4 Length 6
			   ["on the moon","on the chair","in my spaghetti","in my soup","on the grass", "in my shoes"]];// Col 5 Length 6
			   
function wordGetter(buttonNum){//The amount of times I would get the same number for 2 columns in a row was concerning but I think it's just a coincidence since I can't consistently get it.
	let rand = Math.floor(Math.random() * columns[buttonNum].length);//Generates a random number between 0 - amount of options in the column (allowing various amounts of options in each column).
	styler(rand,buttonNum);
	
	return columns[buttonNum][rand];//Pulls the word we want using the # of button pressed and the random number generated so [0][3] = The dog
}
function styler(randNum ,buttonNum){//This function is to highlight the text that was selected by the wordGetter function helping the user know what is selected
	//console.log("Got the following: randNum: "+randNum+" buttonNum: "+(buttonNum+1));//Debugging
	let columnText = document.getElementsByClassName('col'+(buttonNum+1));//Gets all the p elements as an array in the column specified by what button is pressed.
	
	for(let x = 0; x <columnText.length; x++){//Sets all the p elements to black to clear any already existing highlighted elements
		columnText[x].style.color = "black";//Sets the color to black
	}
	if(randNum !="reset")//This if statement is to avoid setting things to white when pressing the reset button since the rest button uses this function to clear all the columns highlighted text
		columnText[randNum].style.color = "#f4f4f4";//Sets the selected word color to white.
		
	
}

var words = [];//Declares a var and sets it up as an array to be used to store the random words

console.log(buttons);//Debugging

//This for loop goes through the first 5 buttons and assigns a onclick event to each button. Since each button does the same thing just for a different numbered column, a for loop is great for this.
for(let x = 0;x<=columns.length-1;x++){//I am really proud of this
	buttons[x].onclick = function(){
		console.log("Button #"+x);//Debugging
		words[x] = wordGetter(x);//Sets the specific button as identified by x to set words[x] as the return of the wordGetter function telling it what button # it is.
		speakNow(words[x]);//Speaks the random word as soon as it's selected
		console.log(words[x]);//Debugging
		buttons[6].disabled = false;//Enables the reset button since you can reset stuff
	}
}
/* This will better visualize what is going on above
//Imagine this but 5 times with the values ranging from 0-4 based on the button number
buttons[0-4].onclick = function(){
		console.log("Button #"+0-4);//Debugging
		words[0-4] = wordGetter(0-4);//Sets the specific button as identified by x to set words[x] as the return of the wordGetter function telling it what button # it is.
		speakNow(words[0-4]);//
		console.log(words[0-4]);
		buttons[6].disabled = false;//Enables the reset button since you can reset stuff
	}

*/

buttons[5].onclick = function(){//Play audio button
	textToSpeak="";
	for(let x =0;x<words.length;x++){//This for loop goes through each of the random words and puts them together
		textToSpeak += words[x] + " ";//It's ok to have a space at the end of the text since it doesn't affect what the voices says
	}
	console.log("Speaking: "+textToSpeak);//Debugging
	if(textToSpeak != "")//So when pressing the play button with nothing selected, it doesn't whipe the text.
		document.getElementById("finalTextDisplay").textContent = textToSpeak;//Displays the text while it's being spoken
	speakNow(textToSpeak);//Speaks the output from the for loop
	
	
}
buttons[6].onclick = function(){//Reset selection
	words = [];//Clears the words array
	console.log("Reset words selection")
	//document.getElementById("finalTextDisplay").textContent = "";
	for(let x =0;x<=columns.length-1;x++)//Used to clear any highlighted text from previous selections
		styler("reset",x);//The "reset" tells the styler to not make anything white
	buttons[6].disabled = true;//This is just an extra feature to show there is nothing to reset
}
buttons[7].onclick = function(){//This creates a random selection in the sections
	for(let x = 0;x<=columns.length-1;x++){//Similar to the for loop that goes through the buttons. This one just goes through each column and picks a random words using the wordGetter function
		words[x] = wordGetter(x);//Sets each element in words as a random word
		console.log(words[x]);//Debugging
		buttons[6].disabled = false;//Enables the reset button since you can reset stuff
		//No speak here because you have to wait for the speaker to say each word before it will say the whole word on pressing the play button.
	}
}