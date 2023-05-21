function getPalette() {
	return `#999999 #00ffff #ff3300 #ffff00 #444444 #777777 #222222 #aaaaaaa #cccccc #ff0000 #0000ff`.split(' ').map(c => hex2rgb(c));
}

var palette = getPalette();

function randomColor(current) {
	let result = randomElem(palette);
	while(result == current) result = randomElem(palette);
	return result;
}
