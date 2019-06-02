
document.getElementById('navigateEverything').onclick = function(){
	$('#title1').text('Control Overview');
	$('#title2').fadeOut(function() {
		$(this).text('Control Overview').fadeIn();
	});
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'everything', function(){
			$('#contents').fadeIn();
		});
	});
};

document.getElementById('navigateKitchen').onclick = function(){
	$('#title1').text('Kitchen Control');
	$('#title2').fadeOut(function() {
		$(this).text('Kitchen Control').fadeIn();
	});
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'kitchen', function(){
			$('#contents').fadeIn();
		});
	});
};

document.getElementById('navigateLounge').onclick = function(){
	$('#title1').text('Lounge Control');
	$('#title2').fadeOut(function() {
		$(this).text('Lounge Control').fadeIn();
	});
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'lounge', function(){
			$('#contents').fadeIn();
		});
	});
};

document.getElementById('navigateHall').onclick = function(){
	$('#title1').text('Hall Control');
	$('#title2').fadeOut(function() {
		$(this).text('Hall Control').fadeIn();
	});
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'hall', function(){
			$('#contents').fadeIn();
		});
	});
};

document.getElementById('navigateBathroom').onclick = function(){
	$('#title1').text('Bathroom Control');
	$('#title2').fadeOut(function() {
		$(this).text('Bathroom Control').fadeIn();
	});
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'bathroom', function(){
			$('#contents').fadeIn();
		});
	});
}

document.getElementById('navigateBedroom1').onclick = function(){
	$('#title1').text('Bedroom Control');
	$('#title2').fadeOut(function() {
		$(this).text('Bedroom Control').fadeIn();
	});
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'bedroom1', function(){
			$('#contents').fadeIn();
		});
	});
};

document.getElementById('navigateBedroom2').onclick = function(){
	$('#title1').text('Spare Room Control');
	$('#title2').fadeOut(function() {
		$(this).text('Spare Room Control').fadeIn();
	});
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'bedroom2', function(){
			$('#contents').fadeIn();
		});
	});
};

document.getElementById('navigateLighting').onclick = function(){
	$('#title1').text('Lighting Control');
	$('#title2').fadeOut(function() {
		$(this).text('Lighting Control').fadeIn();
	});
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'lighting', function(){
			$('#contents').fadeIn();
		});
	});
};

document.getElementById('navigateHeating').onclick = function(){
	$('#title1').text('Heating Control');
	$('#title2').fadeOut(function() {
		$(this).text('Heating Control').fadeIn();
	});
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'heating', function(){
			$('#contents').fadeIn();
		});
	});
};

document.getElementById('navigateAppliances').onclick = function(){
	$('#title1').text('Appliance Control');
	$('#title2').fadeOut(function() {
		$(this).text('Appliance Control').fadeIn();
	});
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'appliances', function(){
			$('#contents').fadeIn();
		});
	});
};

document.getElementById('navigateSchedule').onclick = function(){
	$('#title1').text('Schedule Control');
	$('#title2').fadeOut(function() {
		$(this).text('Schedule Control').fadeIn();
	});
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'schedule', function(){
			$('#contents').fadeIn();
		});
	});
};

document.getElementById('navigateSettings').onclick = function(){
	$('#title1').text('Settings');
	$('#title2').fadeOut(function() {
		$(this).text('Settings').fadeIn();
	});
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'settings', function(){
			$('#contents').fadeIn();
		});
	});
};

document.getElementById('navigatePiControl').onclick = function(){
	$('#title1').text('Pi Control');
	$('#title2').fadeOut(function() {
		$(this).text('Pi Control').fadeIn();
	});
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'piControl', function(){
			$('#contents').fadeIn();
		});
	});
};
