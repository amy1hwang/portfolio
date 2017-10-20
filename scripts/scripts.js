$(function() {	
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
		// we need to add a class when certain elements are in the viewport.
		var $tracked = $(".in-viewport");
		$tracked.filter(':not(:in-viewport)')
			.removeClass('js-in-viewport')
		// $tracked.removeClass('js-in-viewport');
		$tracked.filter(':in-viewport').addClass('js-in-viewport');
	}, 50);

	$(window).on('scroll', function() {
		if( $(window).scrollTop() > 100) {
			$(".logo").addClass("js-logo-after-scroll");
			startIntervalOnce();
		} else {
			$(".logo").removeClass("js-logo-after-scroll");
			stopInterval();
		}
		inViewport();
	})



});

