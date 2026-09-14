
  /*hover scroll-to-top*/
  $(window).scroll(function() {
	if ($(this).scrollTop() > 2000) {
	  $('.scroll-to-top').addClass('scroll_active');
	} else {
	  $('.scroll-to-top').removeClass('scroll_active');
	}
  });
  
  $('.scroll-to-top').click(function() {
	$('html, body').animate({scrollTop : 0}, {
	  duration: 1500, // 1.5秒 (1500 ミリ秒)
	  easing: 'easeInOutQuint'
	});
	return false;
  });

  