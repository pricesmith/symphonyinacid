var files = [];
var texts = [];

var elements = [];

var paragraphs = [];
var words = [];
var characters = [];

var SPLITCHAR = true;
var previous = -1;

var INTRO = 0;
var SENTENCES = 1;
var FULL = 2;
var MOTTO = 3;
var END = 4;

function loadFiles() {
	files[INTRO] = loadStrings("/assets/text/intro.txt");
	files[SENTENCES] = loadStrings("/assets/text/sentences.txt");
	files[FULL] = loadStrings("/assets/text/full.txt");
	files[MOTTO] = loadStrings("/assets/text/motto.txt");
	files[END] = loadStrings("/assets/text/end.txt");
}

function loadTexts() {
	for(let g=0; g<files.length; g++) {
		texts[g] = [];
		for(let l=0; l<files[g].length; l++) {
			texts[g][l] = [];
			let line = files[g][l];
			line = line.replace( /[^A-Za-z0-9 !.?]/g, '' ); // non characters
			// line = line.replace( /[^A-Za-z0-9 !â€“.?-]/g, '' ); // non characters
			line = line.replace(/\s\s+/g, ' '); // double spaces
			let words = line.split(' ');
			for(let w=0; w<words.length; w++) {
				texts[g][l][w] = [];
				let word = words[w].split('');
				for(let c=0; c<word.length; c++) {
					texts[g][l][w].push( word[c] );
				}
			}
		}
	}
}




function newText(param) {


	clr();

	if (SCENE==2) {

		SPLITCHAR = true;
		insert( printFile( texts[INTRO] ) );

	} else if (SCENE==3) {
		
		SPLITCHAR = true;
		if (currentWordInd < texts[MOTTO][0].length) {
			insert( printWord( texts[MOTTO][0][currentWordInd] ) );
			currentWordInd++;
		}

	} else if (SCENE==4) {
		
		SPLITCHAR = false;
		insert( printLine( texts[SENTENCES][1] ) );

	} else if (SCENE==5) {
		
		SPLITCHAR = true;
		insert( printLine( texts[SENTENCES][1] ) );
		
	} else if (SCENE==6) {

		SPLITCHAR = true;
		insert( printRandomPartWords( texts[FULL], 50, true ) );
		
	} else if (SCENE==7) {

		SPLITCHAR = false;
		insert( printLines( texts[FULL], 90, 100 ) );
		
	} else if (SCENE==8) {
		
		SPLITCHAR = true;
		insert( printLine( texts[SENTENCES][0] ) );

	} else if (SCENE==9) {

		SPLITCHAR = true;
		if(param) {
			insert( printLine( texts[SENTENCES][2] ) );
		} else {
			let ind = randomn(texts[SENTENCES].length);
			if( ind == previous ) ind++;
			if( ind > texts[SENTENCES].length ) ind = 0;
			previous = ind;
			insert( printLine( texts[SENTENCES][ind] ) );
		}
		
	} else if (SCENE==10) {

		SPLITCHAR = false;
		insert( printRandomPartWords( texts[FULL], 200 ) );
			
	} else if (SCENE==11) {

		SPLITCHAR = false;
		insert( printRandomShortLines( texts[FULL], 10, 20 ) );
			
	} else if (SCENE==12) {

		SPLITCHAR = false;
		insert( printRandomShortLines( texts[FULL], 20, 30 ) );
			
	} else if (SCENE==13) {

		SPLITCHAR = true;
		insert( printRandomPartWords( texts[FULL], 200 ) );
		
	} else if (SCENE==15) {

		SPLITCHAR = false;
		insert( printLines( texts[FULL], 0, 36 ) );
		
	} else if (SCENE==16) {

		SPLITCHAR = true;
		insert( printLines( texts[FULL], 0, 36, true ) );
		
	} else if (SCENE==17) {

		SPLITCHAR = false;
		insert( printLines( texts[FULL], 0, 140 ) );
		
	} else if (SCENE==18) {

		SPLITCHAR = false;
		insert( printRandomPartWords( texts[FULL], 1200, true ) );	
		
	} else if (SCENE==19) {

		SPLITCHAR = false;
		insert( printRandomPartWords( texts[FULL], 400, true ) );
		
	} else if (SCENE==20) {
		
	} else if (SCENE==21||SCENE==23) {

		SPLITCHAR = false;
		insert( printRandomPartWords( texts[FULL], 1100, true ) );
		
	} else if (SCENE==25) {

		SPLITCHAR = false;
		insert( printFile( texts[END] ) );
		
	}
	
  	updateElements();
	
}

function updateElements() {
	elements = list("font");
  	paragraphs = list("p");
  	words = container.querySelectorAll('[word]');
	characters = container.querySelectorAll("[char]");

    for (let i=0; i<elements.length; i++) {
		elements[i].addEventListener("mouseover", function() {
			this.setAttribute('glitch', findNew( this.getAttribute('glitch'), 0, 4 ));
		});
	}
}

function clr() {
	container.innerHTML = '';
}

function insert(html) {
	container.innerHTML += html;
}

function printFile(file, count) {
	let html = "";
	if(count == undefined) count = file.length;
	for(let i=0; i<count; i++) html += printLine(file[i]);
	return html;
}
function printLine(line) {
	let html = "";
	for(const word of line) html += printWord(word);
	return "<p>" + html + "</p>";
}


function printLines(file, from, to, separateP) {
	let html = "";
	for(let i=from; i<to; i++) {
		if(separateP) html += "<p>";
		for(const word of file[i]) html += printWord(word);
		if(separateP) html += "</p>";
	}
	return separateP ? html : "<p>" + html + "</p>";
}

function printRandomPartWords(file, wordsCount, separateP) {
	separateP !== false;
	let html = "";
	let n = randomn(file.length-20);
	if(n<0) n = 0;
	while( wordsCount>0 && file[n] !== undefined) {
		wordsCount -= file[n].length;
		if(separateP) html += printLine(file[n]);
		else for(const word of file[n]) html += printWord(word);
		n++;
	}
	return !separateP ? "<p>" + html + "</p>" : html;
}
function printRandomPartLines(file, linesCount, separateP) {
	separateP !== false;
	let html = "";
	let from = randomn(file.length-linesCount);
	let to = from + linesCount;
	for(let i=from; i<to; i++) {
		if(separateP) html += printLine(file[i]);
		else for(const word of file[i]) html += printWord(word);
	}
	return !separateP ? "<p>" + html + "</p>" : html;
}
function printRandomLines(file, count, separateP) {
	separateP !== false;
	let html = "";
	for(let i=0; i<count; i++) {
		let n = randomn(file.length);
		if(separateP) html += printLine(file[n]);
		else for(const word of file[n]) html += printWord(word);
	}
	return !separateP ? "<p>" + html + "</p>" : html;
}
function printRandomShortLines(file, count, wordsCount) {
	let html = "";
	while(count>0) {
		let n = randomn(file.length);
		if(file[n].length<wordsCount) {
			html += printLine(file[n]);
			count--;
		}
	}
	return html;
}
function printRandomLongLines(file, count, wordsCount) {
	let html = "";
	while(count>0) {
		let n = randomn(file.length);
		if(file[n].length>wordsCount) {
			html += printLine(file[n]);
			count--;
		}
	}
	return html;
}




function printWord(word) {
	let html = "";
	for(const char of word) html += printChar(char);
	let type = word.length >= 4 ? 1 : 0;
	if (!SPLITCHAR) html = `<font>${html}</font>`;
	return `<span word="${type}">${html}</span>`;
}
function printChar(char) {
	let html = char;
	if (SPLITCHAR) {
		let int = html.charCodeAt(0);
		html = `<font char int="${int}">${html}</font>`;
	}
	return html;
}
