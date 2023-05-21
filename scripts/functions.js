function mixRGBColors(A, B, perc) {
	A = A.slice(4,-1).split(',');
	B = B.slice(4,-1).split(',');
	R = A[0] * (1-perc) + B[0] * perc;
	G = A[1] * (1-perc) + B[1] * perc;
	B = A[2] * (1-perc) + B[2] * perc;
	return "rgb(" + R + ", " + G + ", " + B + ")";
}

function mixHashColors(color1, color2, perc) {
	color1 = color1.substring(1);
	color2 = color2.substring(1);
	color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)];
	color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)];
	var color3 = [ 
		(1 - perc) * color1[0] + perc * color2[0], 
		(1 - perc) * color1[1] + perc * color2[1], 
		(1 - perc) * color1[2] + perc * color2[2]
	];
	color3 = '#' + int2hex(color3[0]) + int2hex(color3[1]) + int2hex(color3[2]);
	return color3;
}

function hex2rgb(col) {
	col = col.substring(1);
	r = parseInt(col[0] + col[1], 16);
	g = parseInt(col[2] + col[3], 16)
	b = parseInt(col[4] + col[5], 16);
	return rgb(r,g,b);
}
function int2hex(num) {
	var hex = Math.round(num).toString(16);
	if (hex.length == 1) hex = '0' + hex;
	return hex;
}

function rgb(r,g,b) {
	return "rgb(" + r + ", " + g + ", " + b + ")";
}


function index(x, y, w) {
	return y*w + x;
}

function chance(p) {
	return random(1) < p;
}

function randomn(n) {
	return Math.floor(n * Math.random());
}
function randoml(n) {
	return Math.floor((n+1) * Math.random());
}

function randomElem(n) {
	return n[randomn(n.length)];
}

function fmap(p, min, max) {
	return constrain( map(p, min, max, 0, 1), 0, 1);
}

function eased(b, n, e) {
	let ease = e * ff * dynamic * (0.7+0.4*sound);
	if(ease>1) ease = 1;
	return (b + (n - b) * ease);
}

function list(tag) {
	// return document.querySelectorAll(tag);
	return container.getElementsByTagName(tag);
}

function createArray(firstDimension, ...dimensions) {
	let arr = []
	for (let d = 0; d < firstDimension; d++) {
		arr[d] = dimensions.length ? createArray(...dimensions) : 0
	}
	return arr
}

function resetArray(arr) {
	if (Array.isArray(arr[0])) arr.forEach(resetArray)
	else arr.fill(0)
}

function toggleFullscreen() {
	let fs = fullscreen();
	fullscreen(!fs);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function FR(f) {
	return F % f == 0;
}

function vectRotX(vector, angle) {
	let temp = createVector(vector.y, vector.z);
	temp.rotate(angle);
	vector = createVector(vector.x, temp.x, temp.y);
	return vector;
}

function vectRotY(vector, angle) {
	let temp = createVector(vector.x, vector.z);
	temp.rotate(angle);
	vector = createVector(temp.x, vector.y, temp.y);
	return vector;
}

function beziered(v, pow, p, c1, c2, A, B) {
	let e = v % p;
	let b = v - e;
	e /= p;
	e = constrain( map( e, c1, c2, 0, 1), 0, 1);
	let n = 3 * ((1-e) ** 2) * e * A + 3 * (1-e) * (e ** 2) * B + (e ** 3);
	let result = b + n * p;
	if ( pow == 0 ) return result;
	else return beziered(result, pow-1, p, 0, 1, A, B);
}

function htmlEncode(html) {
	html = $.trim(html);
	return html.replace(/[&"'\<\>]/g, function(c) {
		switch (c) {
			case "&":
				return "&amp;";
			case "'":
				return "&#39;";
			case '"':
				return "&quot;";
			case "<":
				return "&lt;";
			default:
				return "&gt;";
		}
	});
};

function randomChar() {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return randomElem(characters);
}

var paddingHor = 1;
var paddingVer = 1;

function isVisible(elem) {
	var rect = elem.getBoundingClientRect();
	var x = rect.left;
	var y = rect.top;
	var w = rect.width;
	var h = rect.height;
	return x + w >= -paddingHor && y + h >= -paddingVer && x <= W + paddingHor && y <= H + paddingVer;
}

// function pickFewOf(arr, count) {
// 	arr = arr.slice();
// 	for (let i = 0; i < count; i++) {
// 		const randomIndex = Math.floor(Math.random() * (arr.length - i)) + i;
// 		[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
// 	}
// 	return arr.slice(0, count);
// }

function pickFewOf(arr, count) {
	let result = [];
	if (arr != undefined && arr.length>0) {
		for(let i=0; i<count; i++) {
			let e = randomElem(arr);
			if(!result.includes(e)) result.push(e); else i--;
		}
	}
	return result;
}

function limit(num, min, max){
  return Math.min(Math.max(num, min), max-1);
}

function addZeros(v, n) {
  return v.toString().padStart(n, "0");
}
