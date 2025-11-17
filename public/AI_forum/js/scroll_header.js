  $(window).scroll(function() {
	if ($(this).scrollTop() < 730) {
	  $('.scroll_header').css('top', '-100px');
	  $('.fixed_header').css('visibility', 'visible');
	} else {
		$('.scroll_header').css('top', '0px');
		$('.fixed_header').css('visibility', 'hidden');
	}
  });