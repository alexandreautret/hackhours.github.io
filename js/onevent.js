// JavaScript Document
//Author Name: Saptarang
//Author URI: http://www.saptarang.org
//Themeforest: http://themeforest.net/user/saptarang?ref=saptarang
//Creation Date: 22nd December, 2013
//Description: A default stylesheet for OnEvent - Special Event Landing Page Template Designed & Developed By Saptarang.


$(document).ready(function() {

	// Global Color
	$('head style').append('h1,h2,h3,h4,h5,h6, .navigation ul li a, blockquote,.btnMain,.btnColor2,.btnColor3,.btnLte {font-family:"'+Heading_Font+'"; } html, body, div, p, table, tr, td, th, tbody, tfoot, ul, li, ol, dl, dd, dt, fieldset, cite, input, select, textarea, button, a, section, article, aside, header, footer, nav {font-family:"'+Site_Font+'"; }  body {background-color:#'+page_background_color+';} .navbar-header, .btn, .schedule-box h6.section-head span, header.colored, .panel-heading a, .navigation nav ul li {background-color:#'+main_color+'; }  a, #home li a:hover, .styled div, h3 span, .speaker .col-md-2 i, #directionsPanel .adp-summary, #schedule .nav-tabs li.active h5, #lots .nav-tabs li.active h5  {color:#'+main_color+'}  #schedule .nav-tabs li.active i, #schedule .nav-tabs li a:hover h5, #lots .nav-tabs li.active i, #lots .nav-tabs li a:hover h5, .schedule-box li h6 strong {color:#'+main_color+';}    div.section, #home {border-top:5px solid #'+main_color+';  }  ::selection {background-color:#'+main_color+'; color:#fff;} ::-moz-selection {background-color:#'+main_color+'; color:#fff;} ');

	
	// Gallery Captions
	$(' #eg-thumbs > li ').each( function() { $(this).hoverdir(); } );
	
	// Image Lightbox
	 $("a[rel^='prettyPhoto']").prettyPhoto({overlay_gallery: true});
	 $('.gallery a').append('<span class="link"><i class="fa fa-search-plus"></i></span>');
	 
	// equal heights columns
	$('.container').each(function(){  
			var highestBox = 0;
			$('.column', this).each(function(){
				if($(this).height() > highestBox) 
				   highestBox = $(this).height(); 
			});  
			$('.column',this).height(highestBox);
	});   
	
	// Top Arrow
	$(window).scroll(function() {
			if ($(window).scrollTop() > 1000) { 
				$('a.top').fadeIn('slow'); 
			} else { 
				$('a.top').fadeOut('slow');
			}
	}); 
	
	$('#register').hide();
	$('.be-jury').click(function(event) {
			event.preventDefault();
			$('#register').slideToggle('fast');
	});
	
	// Tooltip
	$('a.tips').tooltip();
	
	// responsive Video Target your .container, .wrapper, .post, etc.
    $(".container").fitVids();
	
	// Tabs Active
	$('#schedule .nav-tabs li, #lots .nav-tabs li').append('<span class="arrow"></span>');
	$('#schedule .nav-tabs li span.arrow, #lots .nav-tabs li span.arrow').hide();
	
	// Counter
	var endDate = "April 11, 2014 17:45:00";
        $('.countdown.styled').countdown({
          date: endDate,
          render: function(data) {
			  var years = this.leadingZeros(data.years, 2);
			  if (years != '00') {
            $(this.el).html("<div><span>" + this.leadingZeros(data.years, 2) + " </span><strong>years</strong></div><div><span>" + this.leadingZeros(data.days, 3) + " </span><strong>days</strong></div><div><span>" + this.leadingZeros(data.hours, 2) + "  </span><strong>hrs</strong></div><div><span>" + this.leadingZeros(data.min, 2) + "</span><strong>min</strong></div><div><span>" + this.leadingZeros(data.sec, 2) + " </span><strong>sec</strong></div>");
			  } else {
			  $(this.el).html("<div><span>" + this.leadingZeros(data.days, 3) + " </span><strong>days</strong></div><div><span>" + this.leadingZeros(data.hours, 2) + "  </span><strong>hrs</strong></div><div><span>" + this.leadingZeros(data.min, 2) + "</span><strong>min</strong></div><div><span>" + this.leadingZeros(data.sec, 2) + " </span><strong>sec</strong></div>");
			  }
          }
        });
	
	// Accordion Symbols
	$('.panel-heading a').click(function() {
			var thisParent = $(this).parent().next();
		if(thisParent.hasClass('in')) {
				$(this).parent().removeClass('active');
		} else {
				$('.panel-heading').removeClass('active');
				$(this).parent().addClass('active');
		}
	});
	
	//page Scroll
	$('nav a[href^=#], a.top[href^=#]').click(function(event) {
			event.preventDefault();
			$('html,body').animate({
            scrollTop: $(this.hash).offset().top - 80},
            1000);	
	});
	
	// Year Update
	var curYear = new Date().getFullYear();
	$('.year').html(curYear);
	
	// Subscription Form Validation
	   $("#subscribeForm input").focus(function() {
		  $(this).prev("label").hide();
		  $(this).prev().prev("label").hide();	 		 	
	  });
	   
	  $("#subscribeForm").submit(function() {
		  // validate and process form here
		  var emailSubscribe = $("#emailSubscribe").val();
		  if (emailSubscribe == "") {
				$('#emailSubscribe').addClass('reqfld');
				$('<span class="error" style="display:none; color:#cc0000"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#emailSubscribe').fadeIn(400);
				$("#emailSubscribe").focus(function() {  $('#emailSubscribe').removeClass('reqfld');  $(this).prev().fadeOut(400);});
				return false;
		   } else if(emailSubscribe.indexOf('@') == -1 || emailSubscribe.indexOf('.') == -1) {
				$('#emailSubscribe').addClass('reqfld');
				$('<span class="error" style="display:none;  color:#cc0000">Invalid!</span>').insertBefore('#emailSubscribe').fadeIn(400);
				$("#emailSubscribe").focus(function() {  $('#emailSubscribe').removeClass('reqfld');  $(this).prev().fadeOut(400);});
				return false;
		  }
		  
		  var dataString = 'emailSubscribe=' + emailSubscribe;
		  $.ajax({
			type: "POST",
			url: "form/subscribe.php",
			data: dataString,
			success: function() {
			  $("#subscribeForm").hide();
			  $("<div id='subscribesuccess' class='alert alert-success' style='border:#"+sub_successBox_Border_Color+" 1px "+sub_successBoxBorderStyle+"; background:#"+sub_successBoxColor+";' ></div>").insertAfter('.subscribeHeading');
			  $('#subscribesuccess').html("<h5 style='color:#"+sub_textColor+";'>"+sub_submitMessage+"</h5>")
			  .hide().delay(300)
			  .fadeIn(1500);
			  
			  $('#subscribeForm').delay(6000).slideUp('fast');
			  
			}
		  });
		  return false;
	});	
	
	// Register Form
	   $("#register input, #register textarea").focus(function() {
		  $(this).prev("label").hide();
		  $(this).prev().prev("label").hide();	 		 	
	  });
	   
	  $("#register").submit(function() {
				// validate and process form here
				var name = $("#name").val();
					  if (name == "") {
					  $('#name').addClass('reqfld');
					  $('<span class="error" style="display:none; margin-top:0px; color:#cc0000"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#name').fadeIn(400);
					  $("#name").focus(function() {  $('#name').removeClass('reqfld');  $(this).prev().fadeOut(400);});
					  return false;
				} 
				  
				var phone = $("#phone").val();
					  if (phone == "") {
					  $('#phone').addClass('reqfld');
					  $('<span class="error" style="display:none; color:#cc0000"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#phone').fadeIn(400);
					  $("#phone").focus(function() {  $('#phone').removeClass('reqfld');  $(this).prev().fadeOut(400);});
					  return false;
				}
				
				var email = $("#email").val();
				if (email == "") {
					  $('#email').addClass('reqfld');
					  $('<span class="error" style="display:none; color:#cc0000"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#email').fadeIn(400);
					  $("#email").focus(function() {  $('#email').removeClass('reqfld');  $(this).prev().fadeOut(400);});
					  return false;
				 } else if(email.indexOf('@') == -1 || email.indexOf('.') == -1) {
					  $('#email').addClass('reqfld');
					  $('<span class="error" style="display:none;  color:#cc0000">Invalid!</span>').insertBefore('#email').fadeIn(400);
					  $("#email").focus(function() {  $('#email').removeClass('reqfld');  $(this).prev().fadeOut(400);});
					  return false;
				}
				
				var comment = $("#comment").val();
					  if (comment == "") {
					  $('#comment').addClass('reqfld');
					  $('<span class="error" style="display:none; color:#cc0000"><i class="fa fa-exclamation-circle"></i></span>').insertBefore('#comment').fadeIn(400);
					  $("#comment").focus(function() {  $('#comment').removeClass('reqfld');  $(this).prev().fadeOut(400);});
					  return false;
				}
				
				//$('#register').animate({opacity:'0.3'}, 500);
				
				var dataString = 'name='+ name + '&email=' + email + '&phone=' + phone + '&comment=' + comment;
          comment = comment.replace(/\r\n|\r|\n/g,"%0D%0A")
              var link = "mailto:vincent.beutin@gmail.com"
                      + "?cc=alexandre.autret@gmail.com"
                      + "&subject=" + "Jury: "+ name
                      + "&body=" +comment+"%0D%0A %0D%0A"+name+"%0D%0A"+phone+"%0D%0A"+email
                  ;

              window.location.href = link;


	  });
	  
	  
	//Speaker OverlayColor
		  
	var getcolor = $('.speaker i').css("color");
	var matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
	var match = matchColors.exec(getcolor);
	var transColor = "rgba("+match[1] + ', ' + match[2] + ', ' + match[3]+", 0.9)";
	$('figcaption').css("background-color", transColor);
	  
	// Load Results of 3rd Edition
	$.getJSON("./js/json/results_edition3.json", function(data) {
		// Podium
		var first 	= data.results.podium.first;
		var second 	= data.results.podium.second;
		var third 	= data.results.podium.third;
		var fourth 	= data.results.fourth;
		var teams = [first, second, third, fourth];
		createPodium(teams, 3, '#podium', '#jury_price', null, ['first', 'second', 'third', 'fourth']);
		// Other teams
		var other_teams = data.results.other_teams;
		var mid_array 	= Math.round(data.results.other_teams.length/2);
		createPodium(other_teams, mid_array, '#other_teams_1', '#other_teams_2', '#', null);
	});
});

// Create fields for the podium of a given array
function createPodium(array, minVal, divName1, divName2, position, href){
	// Get the position
	// If not set, get it dynamically
	var pos 		= '';
	var div 		= '';
	var index 		= 0;
	var description = 'description_';
	for(var i in array){
		index++;
		var team = array[i];
		div = (i < minVal)? divName1 : divName2;
		pos = (position)? position : index;
		var desc = (href)? description+href[i] : description+i;
		$(div).append('<div class="panel panel-default">'
						+'<div class="panel-heading">'
							+'<div class="col-md-11" style="padding:0;">'
								+'<h4 class="panel-title">'
									+'<a data-toggle="collapse" data-parent="#pods" href="#'+desc+'">'
										+pos+'<span>'+team.name+'</span>'
									+'</a>'
								+'</h4>'
							+'</div>'
							+'<div class="col-md-1 col-sm-2 col-xs-2 open-podium readIcon" > '
								+'<a data-toggle="collapse" data-parent="#pods" href="#'+desc+'">'
									+'<i class="fa fa-chevron-circle-down"></i>'
								+'</a>'
							+'</div>'
						+'</div>'
						+'<div id="'+desc+'" class="panel-collapse collapse">'
							+'<div class="panel-body">'
								+'<strong>'+team.members+'</strong>'
								+'<p>'+team.description+'</p>'
							+'</div>'
						+'</div>'
					+'</div>');
	}
};

