'use strict';

var tourLink = $('#tour-link'),
    tour = $('#tour'),
    navLink = $('.nav-link'),
    section = $('.section-wrap'),
    enter = $('.enter-site'),
    splashTing = $('#splash-ting'),
    subtitle = $('#subtitle'),
    logo = $('#logo'),
    videoElement = $('#video video')[0],
    openMore = $('.much-toggle'),
    contactSpot = $('#contact-spot'),
    dSubtitlePost;

var windowLocation = window.location.pathname;
var postWindowLoc = windowLocation.split('/')[1];

$('body').removeClass();
$('body').addClass(postWindowLoc);

if (postWindowLoc != '') {
	splashTing.addClass('gone');
}

openMore.click(function () {
	contactSpot.toggleClass('visible');
	openMore.toggleClass('visible');
});

var videoTing = $('#video video');
var youtubeTing = $('#splash-ting iframe');
var tourDates = $('#tour-dates-sub');
var contactTop = $('#contact-top');
var contactBottom = $('#contact-bottom');

console.log('%c ✌🏻', 'font-size: 40px');

$.get('//danielcaesar.com/admin/wp-json/wp/v2/pages/', function (data) {

	var dData = data[0].acf;

	dSubtitlePost = dData.subtitles_container;
	// let dSubtitles = dData.background_video_subtitles;

	// dSubtitlePost = dSubtitles.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<br \/>/g, '');

	// console.log(dSubtitles);

	var dVideo = dData.background_video;
	var dYt = dData.splash_youtube_url;
	var updatedDYt = dYt.split('=')[1];

	var dTourDates = dData.tour_container;
	var dTourPre = '';

	var dTourMap = dTourDates.map(function (tour) {

		dTourPre += '\n\t\t<a target="_blank" href="' + tour.tour_link + '" class="tour-date">\n\t\t\t<div class="date">' + tour.tour_date + '</div>\n\t\t\t<div class="place"><span class="first">' + tour.tour_venue + '</span><span class="snd"> ' + tour.tour_city + '</span></div>\n\t\t</a>\n\t\t';
	});

	var dContactTop = dData.contact_top_container;
	var dContactTopPre = '';

	var dContactTopMap = dContactTop.map(function (contact) {

		dContactTopPre += '\n\t\t<div class="contact">\n\t\t\t<div class="contact-title">' + contact.contact_top_title + '</div>\n\t\t\t<a href="mailto:' + contact.contact_top_email + '" class="contact-email">' + contact.contact_top_email + '</a>\n\t\t</div>\n\t\t';
	});

	var dContactBottom = dData.contact_bottom_container;
	var dContactBottomPre = '';

	var dContactBottomMap = dContactBottom.map(function (contact) {

		dContactBottomPre += '\n\t\t<div class="contact">\n\t\t\t<div class="contact-title">' + contact.contact_bottom_title + '\n\t\t\t\t<sup>' + contact.contact_bottom_subtitle + '</sup>\n\t\t\t</div>\n\t\t\t<a href="mailto:' + contact.contact_bottom_email + '" class="contact-email">' + contact.contact_bottom_email + '</a>\n\t\t</div>\n\t\t';
	});

	contactBottom.html(dContactBottomPre);
	contactTop.html(dContactTopPre);
	tourDates.html(dTourPre);

	// if (postWindowLoc == '') {
	// 	youtubeTing.attr('src', `https://www.youtube.com/embed/${updatedDYt}?modestbranding=0&controls=0&autoplay=1&showinfo=0`)
	// } 

	videoTing.attr('src', dVideo);

	if (dSubtitlePost) {
		runSubtitles(dSubtitlePost);
	}
});

enter.click(function () {
	splashTing.addClass('gone');
	setTimeout(function () {
		splashTing.remove();
	}, 700);
});

// mute video

videoElement.addEventListener('click', function () {
	if (videoElement.muted) {
		videoElement.muted = false;
		videoElement.classList.remove('muted');
	} else {
		videoElement.muted = true;
		videoElement.classList.add('muted');
	}
});

// var rndmNum = Math.floor(Math.random() * (videosList.length + 1 - 1 + 0));
// // videoElement.src = videosList[rndmNum];

// var sm = document.getElementById('sm');

// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
// 	setTimeout(function () {
// 		videoElement.play();
// 	}, 500);
// }

// videoElement.volume = 0.4;

// var firstSubtitle = 


// var thirdSubtitle = [{
// 	time1: 0,
// 	time2: 1.5,
// 	text: '[danny]<br>myself still'
// }, {
// 	time1: 2.5,
// 	time2: 3.5,
// 	text: '[danny]<br>what?'
// }, {
// 	time1: 3.5,
// 	time2: 6,
// 	text: '[camera]<br>but yo like, where\'s your site at bro?'
// }, {
// 	time1: 7,
// 	time2: 9,
// 	text: '[danny]<br>yo, who the fuck knows dawg?'
// }, {
// 	time1: 9,
// 	time2: 11,
// 	text: '[camera]<br>is a man like daniel caesar loafting bro?'
// }, {
// 	time1: 11,
// 	time2: 13,
// 	text: '[danny]<br>just waiting on the mans'
// }, {
// 	time1: 13,
// 	time2: 14,
// 	text: '[camera]<br>just waiting on \'em, eh?'
// }, {
// 	time1: 14,
// 	time2: 15,
// 	text: '[camera]<br>it\'s a light ting, still'
// }];

// var fourthSubtitle = [{
// 	time1: 2,
// 	time2: 3.5,
// 	text: '[camera]<br>is that daniel caesar?'
// }, {
// 	time1: 3.5,
// 	time2: 5.5,
// 	text: '[camera]<br>oh... shit damn'
// }, {
// 	time1: 6.5,
// 	time2: 8.5,
// 	text: '[camera]<br>yo, when\'s your site comin\' doe?'
// }, {
// 	time1: 9,
// 	time2: 10.5,
// 	text: '[danny]<br>it\'s never coming'
// }];

function runSubtitles(theSubtitle) {
	var subtitleArray = theSubtitle;

	var notHere = 0;

	console.log(videoElement);

	videoElement.addEventListener('timeupdate', function (e) {

		notHere = -1;

		if (subtitleArray.length > 0) {
			subtitleArray.forEach(function (element, index) {
				if (videoElement.currentTime >= element.time1 && videoElement.currentTime <= element.time2) {
					var theSubtitleContent = '[' + element.speaking + ']<br>' + element.text;
					subtitle.html(theSubtitleContent);

					notHere = index;
				}
			});
		}

		if (notHere === -1) {
			subtitle.html('');
		}
	});
}

// switch (rndmNum) {
// 	case 0:
// 		subtitleArray = firstSubtitle;
// 		break;
// 	case 1:
// 		subtitleArray = secondSubtitle;
// 		break;
// 	case 2:
// 		subtitleArray = thirdSubtitle;
// 		break;
// 	case 3:
// 		subtitleArray = fourthSubtitle;
// 		break;
// }


window.onpopstate = function (event) {
	$('body').removeClass();
	$('body').addClass(event.state);
};

logo.click(function () {
	$('.section-wrap').animate({
		scrollTop: '0px'
	}, 300);

	history.pushState(null, null, '/');
	$('body').removeClass();
});

navLink.click(function () {
	var link = $(this).data('link');
	$('.section-wrap').animate({
		scrollTop: '0px'
	}, 300);

	console.log('clack');

	if (link == 'home') {
		history.pushState(null, null, '/');
	} else {
		history.pushState(link, link, '/' + link);
	}

	$('body').addClass('come-up');

	setTimeout(function () {
		$('body').removeClass();
	}, 300);
	setTimeout(function () {
		$('body').addClass(history.state);
	}, 350);
	// section.addClass('hidden');
	// $('' + link).toggleClass('hidden');
	// $('body').toggleClass('open');
});

// navLink.addEventListener('click', function() {
// 	let link = this.getAttribute('data-link');
// 	console.log(link);
// })

// tourLink.addEventListener('click', function () {
// 	tour.classList.toggle('hidden');

// 	// if (tour.classList != 'hidden') {
// 	// 	tourLink.innerHTML = 'Close';
// 	// } else {
// 	// 	tourLink.innerHTML = 'Tour Dates';
// 	// }
// });