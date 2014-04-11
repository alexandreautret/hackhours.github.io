
$(document).ready(function(){
	/* ------------------------------------------------------------------------ */
	/* Countdown */
	/* ------------------------------------------------------------------------ */
	
	/* ---- Countdown timer ---- */
	$('#counter').countdown({	
		timestamp : new Date(2014, 04, 12, 18, 0, 0, 0).getTime()
	});
	
	// Hide the countdown
	//$('#counter').hide();
	$('#countdown_dashboard').hide();
	$('#counterContainer').hide();
	// Add behaviour on body's click
	$('body').click(function() {
		$('#pre-counter').text('5');
		var sec = $('#pre-counter').text();
		var timer = setInterval(function() {
			if (sec == 1) {
				$('#pre-counter').remove();
				$('#countdown_dashboard').fadeIn();
				clearInterval(timer);
				start();
				setTimeout(function() {
					stop();
					$('#countdown_dashboard').remove();
					$('#counterContainer').show();
				}, 3600000);
			}
			else{
				$('#pre-counter').fadeOut('fast');
				$('#pre-counter').text(--sec);
				$('#pre-counter').fadeIn('fast');
				
			}
		}, 1000);
	});

	$('#countdown_dashboard').countDown({
		targetOffset: {
			'day': 		12,
			'month': 	4,
			'year': 	2014,
			'hour': 	24,
			'min': 		0,
			'sec': 		0
		}
	});
	stop();

});

/* Countdown trick */

// Stop countdown
function stop() {
	$('#countdown_dashboard').stopCountDown();
}

// Start countdown
function start() {
	$('#countdown_dashboard').startCountDown();
}

