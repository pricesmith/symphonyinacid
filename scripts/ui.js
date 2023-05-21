'use strict'

var audioElem = document.querySelector('audio')
var audioCtx = new (window.AudioContext || window.webkitAudioContext)()

function togglePlay() {
	audioCtx.resume()
	if (audioElem.paused) audioElem.play()
	else audioElem.pause()
}

$(function() {

	function initEvents() {

		$("#play").on('mousedown', togglePlay)

		var i = null;
		$("body").on('mousemove',function() {
			clearTimeout(i);
			$("body").removeClass('no-move');
			i = setTimeout(function () {
				$("body").addClass('no-move');
			}, 1000);
		}).on('mouseleave',function() {
			clearTimeout(i);
			$("body").addClass('no-move');
		});

		$(audioElem)
			.on('play', function() {
				started = true;
				$("body").addClass('started');
				$("body").removeClass('about-visible');
			})
			.on('playing', e => audioCtx.resume())
			.on('timeupdate', function () {
				$('#progress span').css('width', this.currentTime / this.duration * 100 + '%')
			})
			.on('ended', function () {
				$('body').removeClass('no-move')
			})
			.on('playing pause waiting', function () {
				$('body').toggleClass('playing', !this.paused)
			})

	}

	function init() {
		initEvents()
	}

	init()

})
