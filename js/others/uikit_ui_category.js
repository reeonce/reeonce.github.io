$(".post-content img").each(function(index) {
	var imgSrc = $(this).attr("src");
	if (/.*2x.png$/.test(imgSrc)) {
		$(this).css("max-width", "50%");
	}
});

var preNode = null;
$(".post-content .catelog-item").each(function(index) {
	var itemName = $(this).attr("name");
	var node = document.createElement("p");
	if (!preNode) {
		$(".post-content").prepend(node);
	} else {
		$(preNode).append(node);
	}
	$(node).html("<a href=\"#" + itemName + "\"> + " + $(this).text() + "</a>");
	preNode = $(node);
});