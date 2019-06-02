
$(function() {

	$('#divStorage').hide();

	var currentLocation = 'master';
	var title1 = 'Control';
	$('#title1').text(title1);

	$('#topDisplay').hide(function() {
		$('#topDisplay').load('/divs/' + 'topDisplay', function(){
			$('#title2').text('Control Overview');
			$('#topDisplay').fadeIn();
		});
	});

	$('#navigation').hide(function() {
		$('#navigation').load('/divs/' + 'navigation', function(){
			$('#navigation').fadeIn();
		});
	});

	$('#contents').hide(function() {
		$('#contents').load('/divs/' + 'everything', function(){
			$('#contents').fadeIn();
		});
	});

	$('#divStorage').load('/divs/' + 'storage');
});
