$(function() {

	var currentLocation = 'master';
	var title1 = 'Control';

	$('#title1').text(title1);



	$('#topDisplay').hide(function() {
		$('#topDisplay').load('/divs/' + currentLocation + '/' + 'topDisplay', function(){
			$('#topDisplay').fadeIn();
		});
	});

	$('#navigation').hide(function() {
		$('#navigation').load('/divs/' + currentLocation + '/' + 'navigation', function(){
			$('#navigation').fadeIn();
		});
	});

	$('#contents').hide(function() {
		$('#contents').load('/divs/' + currentLocation + '/' + 'everything', function(){
			$('#contents').fadeIn();
		});
	});

});
