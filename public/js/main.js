/* Main Example File */
$(document).ready(function () {

	$.getJSON("/api/button/count", function (data) {

		$('#counter').html(data.clicks);

	});

	$('button').on('touchstart click', function (e) {

		e.stopPropagation();
		e.preventDefault();

		$.getJSON("/api/button/add", function (data) {

			$('#counter').html(data.clicks);

		});
	})

});
