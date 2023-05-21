const FPS = 30;
	
var W, H, RATIO, vw, vh;
const baseRatio = 4/3;
var ratioDiff;

const body = document.body;
const main = document.querySelector('main');
const container = document.getElementById('container');

var SCENE = 1;
var FRAME = 0;
var FRAMEprev = FRAME;

var SCROLL_SPD = 0;

var started = false;
var fontSize;


function preload() {
	loadFiles();
}

function setup() {
	noCanvas();
	frameRate(60);

	document.getElementById('show-about').addEventListener("click", function() {
    	body.classList.add('about-visible');
    	audioElem.pause();
	});
	document.getElementById('close-about').addEventListener("click", function() {
    	body.classList.remove('about-visible');
	});
	let words = body.querySelectorAll('[word]');
	for(let w of words) {
		w.addEventListener("mouseover", function() {
			this.setAttribute('glitch', findNew( this.getAttribute('glitch'), 0, 4 ));
		});
	}
	body.classList.add("loaded");

	loadMedia();
	loadTexts();
    randomShortPalette();
	
	windowResized();
	// jumpToScene(SCENE);

	updateElements();

}

function draw() {
	if(started) {
		if( frameCount % 2 == 0 ) {
			notesFromTrack();
			onEveryFrame();
		}
		scrollPage();
	}
}

function windowResized() {
	W = window.innerWidth;
	H = window.innerHeight;
	RATIO = W / H;
	vw = W / 100;
	vh = H / 100;
	ratioDiff = RATIO - baseRatio;
	fontSize = Math.sqrt(vw * vh) * 1.3;
	// vw -= ratioDiff * 2.1;
	// let fontSize = W > H ? vw : vh;
	// vw -= ratioDiff * 3.6 * 1.5;
	document.documentElement.style.setProperty('--fs', `${fontSize}px`);
}
