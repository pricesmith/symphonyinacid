var mediaContainer = document.getElementById('media');
var media = [];
var mediaLength = [ 53-2, 23-2, 33-2, 80-2 ];
var mediaFrameTime = [
	1/15,
	1/30,
	1/30,
	1/30
];
var mediaCanvas;
var mediaCtx;
var mediaPixels = [];
var currentMedia = 0;
var sourceW = 128;
var sourceH = 128;
var mediaRatioX, mediaRatioY;
var mediaTranslationX;
var shortPalette = [];

function loadMedia() {
	media = mediaContainer.querySelectorAll('video');
	mediaCanvas = document.createElement('canvas');
	mediaCanvas.width  = sourceW;
	mediaCanvas.height = sourceH;
	mediaContainer.appendChild(mediaCanvas);
	mediaCtx = mediaCanvas.getContext('2d');
	for(let m of media) m.pause();
	console.log('paused');
}

function mediaRandomFrame() {
	media[currentMedia].currentTime = Math.random() * mediaLength[currentMedia];
}

function mediaNextFrame() {
	if( media[currentMedia].currentTime > mediaLength[currentMedia] - mediaFrameTime[currentMedia]) {
		media[currentMedia].currentTime = 0;
	} else {
		media[currentMedia].currentTime = Math.max(0, media[currentMedia].currentTime + mediaFrameTime[currentMedia]);		
	}
}

function loadMediaPixels() {
	mediaNextFrame();
	mediaCtx.drawImage(media[currentMedia], 0, 0, sourceW, sourceH);
	mediaPixels = mediaCtx.getImageData(0, 0, sourceW, sourceH).data;
	mediaRatioY = sourceH / H;
	mediaRatioX = mediaRatioY / baseRatio;
	mediaTranslationX = ratioDiff / 2 * sourceW / baseRatio;
}

function getMediaPixel(x, y) {
	x = limit(x, 0, sourceW);
	y = limit(y, 0, sourceH);
	let ind = (y * sourceW + x) * 4;
	return [ mediaPixels[ind], mediaPixels[ind+1], mediaPixels[ind+2] ];
}

function colorRGBFromMedia(elem, contrast, lightness) {
	contrast ??= 1;
	lightness ??= 0.5;
	
	let rect = elem.getBoundingClientRect();

	let x = rect.left;
	let y = rect.top;
	let w = rect.width;
	let h = rect.height;

	let px = Math.floor((x+w/2) * mediaRatioX - mediaTranslationX );
	let py = Math.floor((y+h/2) * mediaRatioY);
	let pixel = getMediaPixel(px, py);

	let c;

	if(currentMedia==0) {

		c = "#000000";

		let r = pixel[0];
		let g = pixel[1];
		let b = pixel[2];

		if( r>127 && g<127 && b<127 ) c = shortPalette[0];
		if( r<127 && g<127 && b>127 ) c = shortPalette[1];
		if( r>127 && g>127 && b<127 ) c = shortPalette[2];

	} else if(currentMedia==1) {

		let brightness = pixel[0] / 255;
		brightness = 0.6 + 1.2 * (brightness-0.5);
		brightness *= 1.3;
		if(brightness>1) brightness = 1;
		c = color(brightness*255);
	
		if(brightness>0.4&&brightness<0.45) c = shortPalette[0];
		if(brightness>0.65&&brightness<0.7) c = shortPalette[0];
		if(brightness>0.2&&brightness<0.25) c = shortPalette[0];

		if(brightness>0.3&&brightness<0.35) c = shortPalette[1];
		if(brightness>0.1&&brightness<0.15) c = shortPalette[1];

		if(brightness>0.8) c = shortPalette[1];

	} else if(currentMedia==2) {

		let brightness = (1 - pixel[0] / 255);
		c = color(brightness > 0.35 ? 255 : 0);

	} else if(currentMedia==3) {

		let brightness = pixel[0] / 255.0;
		brightness = lightness + contrast * (brightness-0.5);
		if(brightness>1) brightness = 1;
		c = color( 255 * brightness);
		if( chance(0.73) && brightness>0.3 && brightness<0.7 ) c = shortPalette[0];

	}

	return c;

}
