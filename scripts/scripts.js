//detact which brower a user is on

(function() {
	var root;
	root = typeof exports !== "undefined" && exports !== null ? exports : this;
	window.is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
	window.is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
	window.is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
	window.is_safari = navigator.userAgent.indexOf("Safari") > -1;
	window.is_opera = navigator.userAgent.indexOf("Presto") > -1;
	window.is_mac = navigator.userAgent.indexOf('Mac OS') !== -1;
	window.is_windows = !is_mac;
	window.is_mobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(navigator.userAgent);

	if (window.is_chrome && window.is_safari) {
		window.is_safari = false;
	}
	if (window.is_safari) {
		document.documentElement.className += " is-safari";
	} else {
		document.documentElement.className += " is-not-safari";
	}
	if (window.is_chrome) {
		document.documentElement.className += " is-chrome";
	}
	if (window.is_mac) {
		document.documentElement.className += " is-mac";
	}
	if (window.is_windows) {
		document.documentElement.className += " is-windows";
	}
	if (window.is_explorer) {
		document.documentElement.className += " is-explorer";
	}
	if (window.is_mobile) {
		document.documentElement.className += " is-mobile";
	} else {
		document.documentElement.className += " is-not-mobile";
	}
}).call(this);



$(function() {	

	//fastclick 
	FastClick.attach(document.body);

	var started = false;
	var intervalID = null;
	startIntervalOnce = function() {
		if (!started) {
			console.log("I am starting the interval so that whisokers are automated every 2 seconds");
			intervalID = setInterval(function() {
				$(".whiskers").toggleClass("js-logo-animated");
			}, 1500);

			function randomGlitching() {
				// glitches randomly between 0-2 seconds
				var x = Math.floor(Math.random() * 2000);
				setTimeout(function() {
					// do the glitch!
					$(".in-viewport--glitch").toggleClass("js-in-viewport");
					$(".in-viewport--vert-glitch").toggleClass("js-in-viewport")

					randomGlitching();					
				}, x)
			}

			randomGlitching();


			started = true; // this will prevent this interval from firing multiple times
		}
	}

	stopInterval = function() {
		console.log("I am stopping the interval so that whiskers don't aniamte every 2 seconds");
		started = false;
		clearTimeout(intervalID);
	}


	inViewport = _.throttle(function() {
		// need to add a class when certain elements are in the viewport.
		var $tracked = $(".in-viewport");
		$tracked.filter(':not(:in-viewport)')
			.removeClass('js-in-viewport')
		// $tracked.removeClass('js-in-viewport');
		$tracked.filter(':in-viewport').addClass('js-in-viewport');
	}, 50);

	setTimeout(function() {
		$('.scroll-down').fadeIn(1000, "linear");	
	}, 2500);

	$(window).on('scroll', function() {
		if( $(window).scrollTop() === 0) {
			$('body').addClass('js-hide-overflow');
		};
		if( $(window).scrollTop() > 60) {
			$('.scroll-down').fadeOut(1000, "linear");
		};
		if( $(window).scrollTop() > 100) {
			$(".logo").addClass("js-logo-after-scroll");
			startIntervalOnce();
		} else {
			$(".logo").removeClass("js-logo-after-scroll");
			stopInterval();
		}
		//when section is in viewport, highlight nav item
		//when js-in-view-port, take the name attr, find a nav-name attr that has the same name
		$jsInViewport = $('.js-in-viewport');
		if( $jsInViewport ) {
			name = $jsInViewport.attr('name');
			$('.menu-item').removeClass('menu-active');
			$('.menu-item[nav-name="' + name + '"]').addClass('menu-active');
		}

	   if($(window).scrollTop() + $(window).height() == $(document).height()) {
	   		$('.menu-item').removeClass('menu-active');
	       $('.menu-item[nav-name="contact"]').addClass('menu-active');
	   }
		inViewport();
	});

	$('.logo').click(function() {
		$('html, body').animate({
			scrollTop: 0
		}, 400);
		$('body').addClass('js-hide-overflow');
	})

	//when menu item is clicked, scoll down
	$(".menu-items a, .scroll-down a").click(function() {
		section = $(this).attr('href').replace("goto-", '');
		console.log(section);
		$('body').removeClass('js-hide-overflow');
		$('html, body').animate({
			scrollTop: $(section).offset().top + 10
		}, 500);
	});

	$(".menu-items:last-of-type a").click(function() {
		lastSection = $(this).attr('href').replace("goto-", '');
		console.log('last nav item is ' + lastSection);
		$('body').removeClass('js-hide-overflow');
		$('html, body').animate({
			scrollTop: $(document).height()
		}, 500);
	});


	$('.mobile-nav').click(function() {
		$('.menu').toggleClass('open');
		$('.menu-items').toggleClass('mobile-nav-slide')
	});

	
	$('[project-name]').click(function() {
		//get project-name attr, and find the same id name .projects-project-text
		var projectName = $(this).attr('project-name');
		// var projectsProject = $('.' + projectName);
		// var projectBorder = $('.' + projectName + ' ' + '.border');
		var projectInfo = $('.project-info[project="' + projectName + '"]');

		//get the offset left and top
		// var offsetLeft = projectText.offset().left;
		// var offsetTop = projectText.offset().top - $(window).scrollTop();

		//change css values of project boxes
		projectInfo.addClass('popup-open');
		$('.projects-row').css('opacity', '0');
		$('.about-container').css('opacity', '0');
		$('.contact-container').css('opacity', '0');
		projectInfo.css('opacity', '1');

		//     'position': 'fixed', 
		//     'left': offsetLeft + 'px',
		//     'width': projectText.width() + 40,
		//     'height': projectText.height() + 40,
		//     'background-image': 'linear-gradient(-180deg, rgba(43,255,172,.2) 0%, rgba(255,50,236,.2) 54%, rgba(121,244,207,.2) 100%)'
		// });
		// setTimeout(function() {
		// 	projectText.addClass('projectsText-transition');
		// }, 50)
		// setTimeout(function() {
		// 	projectText.addClass('project-fullscreen');
		// }, 100)
		// $('.border').addClass('remove-borders');
		// $('.projects-project-text, .about, .contact').hide();
		// projectText.show();
		// //lock scroll
		$('body').addClass('scroll-lock');
		//expand to fullscreen

		
		//escape case study when clicked outside the popup
		// $(document).click(function() {
		// 	projectText.css({
		// 	    'position': '', 
		// 	    'top': '',
		// 	    'left': '',
		// 	    'width': '',
		// 	    'height': '',
		// 	});
		// 	$('.border').removeClass('remove-borders');
		//     projectText.removeClass('project-fullscreen');
		//     $('body').removeClass('scroll-lock');
		// 	$('.projects-project-text, .about, .contact').show();
		// });
		// $('.project-fullscreen').click(function(event) {
		// 	event.stopPropagation();
		// });

			//close the popup
		$('.close-popup').click(function() {
			$('.border').removeClass('remove-borders');
			$('.projects-row').css('opacity', '1');
			$('.about-container').css('opacity', '1');
			$('.contact-container').css('opacity', '1');
			// setTimeout(function() {
			// 	projectText.css({
			// 	    'position': '', 
			// 	    'top': '',
			// 	    'left': '',
			// 	    'width': '',
			// 	    'height': '',
			// 	    'background-image': ''
			// 	});
			//     $('section').css('display', 'block');
			// },400);
			// setTimeout(function() {
			// 	projectInfo.removeClass('projectsText-transition');
			// },500);
			    $('body').removeClass('scroll-lock');
			projectInfo.css('opacity', '0');
		    projectInfo.removeClass('popup-open');
			// $('.projects-project-text, .about, .contact').show();
		});
	});


	$('.project-link').each(function() {
		//store hrefs
		var link = $(this).attr('href');
		var id = $(this).attr('id');
		$(this).data('projectlinks', {link: link, id: id});
		var storedLinks = $(this).data('projectlinks').link;
		var storedIds = $(this).data('projectlinks').id;
		console.log('stored links ' + storedLinks);
		console.log('stored ids ' + storedIds);
	
		//check the screen size
		$(window).on('resize', function() {
			width = $( window ).width();	
			console.log("screen width is " + width);
				
			if(width < 900 ) {
				//if screen with is < 900px, no project href
				$('.project-link').removeAttr('href');
					console.log('i clicked view project 2');
				$('.view-project').click(function() {
					$('.popup-open .project-link').attr('href', storedLinks);
				});
			} else {
				//if screen with is > 900px, restore href values
				$('.project-link[id="' + storedIds + '"]').attr('href', storedLinks);
			};
		});
	});

	// if( $( window ).width() < 900 ) {

		var link = $('.project-link').attr('href');
		$('.project-link').data('projectlinks', {link: link});
		var storedLinks = $('.project-link').data('projectlinks').link;

		$('.project-link').removeAttr('href');
		$('.view-project').click(function() {
			$('.popup-open .project-link').attr('href', storedLinks);
		});
	// }; 

});

