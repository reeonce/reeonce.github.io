$(".post-content img").each(function(index) {
	var imgSrc = $(this).attr("src");
	if (/.*2x.png$/.test(imgSrc)) {
		$(this).css("max-width", "50%");
	}
});