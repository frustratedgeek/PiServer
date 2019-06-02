
var everything = document.getElementById('navigateEverything');
var kitchen = document.getElementById('navigateKitchen');
var lounge = document.getElementById('navigateLounge');
var hall = document.getElementById('navigateHall');
var bathroom = document.getElementById('navigateBathroom');
var bedroom1 = document.getElementById('navigateBedroom1');
var bedroom2 = document.getElementById('navigateBedroom2');
var lighting = document.getElementById('navigateLighting');
var heating = document.getElementById('navigateHeating');
var settings = document.getElementById('navigateSettings');
var piControl = document.getElementById('navigatePiControl');
	

everything.onclick = function(){
	$('#title1').text('Everything');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'control' + '/' + 'everything', function(){
			$('#contents').fadeIn();
		});
	});
}

kitchen.onclick = function(){
	$('#title1').text('Kitchen');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'control' + '/' + 'kitchen', function(){
			$('#contents').fadeIn();
		});
	});
}

lounge.onclick = function(){
	$('#title1').text('Lounge');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'control' + '/' + 'lounge', function(){
			$('#contents').fadeIn();
		});
	});
}

hall.onclick = function(){
	$('#title1').text('Hall');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'control' + '/' + 'hall', function(){
			$('#contents').fadeIn();
		});
	});
}

bathroom.onclick = function(){
	$('#title1').text('Bathroom');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'control' + '/' + 'bathroom', function(){
			$('#contents').fadeIn();
		});
	});
}

bedroom1.onclick = function(){
	$('#title1').text('Master Bedroom');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'control' + '/' + 'bedroom1', function(){
			$('#contents').fadeIn();
		});
	});
}

bedroom2.onclick = function(){
	$('#title1').text('Spare Bedroom');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'control' + '/' + 'bedroom2', function(){
			$('#contents').fadeIn();
		});
	});
}

lighting.onclick = function(){
	$('#title1').text('Lighting');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'control' + '/' + 'lighting', function(){
			$('#contents').fadeIn();
		});
	});
}

heating.onclick = function(){
	$('#title1').text('Heating');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'control' + '/' + 'heating', function(){
			$('#contents').fadeIn();
		});
	});
}

settings.onclick = function(){
	$('#title1').text('Settings');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'control' + '/' + 'settings', function(){
			$('#contents').fadeIn();
		});
	});
}

piControl.onclick = function(){
	$('#title1').text('Pi Control');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'control' + '/' + 'piControl', function(){
			$('#contents').fadeIn();
		});
	});
}

