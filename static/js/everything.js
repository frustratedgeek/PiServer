
document.getElementById('hallLightShape').onclick = function(){
	$('#title1').text('Hall');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'hall', function(){
			$('#contents').fadeIn();
		});
	});
};
document.getElementById('overviewHallGuages').onclick = function(){
	$('#title1').text('Hall');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'hall', function(){
			$('#contents').fadeIn();
		});
	});
};


document.getElementById('kitchenLightShape').onclick = function(){
	$('#title1').text('Kitchen');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'kitchen', function(){
			$('#contents').fadeIn();
		});
	});
};
document.getElementById('overviewKitchenGuages').onclick = function(){
	$('#title1').text('Kitchen');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'kitchen', function(){
			$('#contents').fadeIn();
		});
	});
};


document.getElementById('spareLightShape').onclick = function(){
	$('#title1').text('Spare Bedroom');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'bedroom2', function(){
			$('#contents').fadeIn();
		});
	});
};
document.getElementById('overviewBedroom2Guages').onclick = function(){
	$('#title1').text('Spare Bedroom');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'bedroom2', function(){
			$('#contents').fadeIn();
		});
	});
};


document.getElementById('bedroomLightShape').onclick = function(){
	$('#title1').text('Master Bedroom');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'bedroom1', function(){
			$('#contents').fadeIn();
		});
	});
};
document.getElementById('overviewBedroom1Guages').onclick = function(){
	$('#title1').text('Master Bedroom');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'bedroom1', function(){
			$('#contents').fadeIn();
		});
	});
};


document.getElementById('loungeLightShape').onclick = function(){
	$('#title1').text('Lounge');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'lounge', function(){
			$('#contents').fadeIn();
		});
	});
};
document.getElementById('overviewLoungeGuages').onclick = function(){
	$('#title1').text('Lounge');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'lounge', function(){
			$('#contents').fadeIn();
		});
	});
};


document.getElementById('bathroomLightShape').onclick = function(){
	$('#title1').text('Bathroom');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'bathroom', function(){
			$('#contents').fadeIn();
		});
	});
};
document.getElementById('overviewBathroomGuages').onclick = function(){
	$('#title1').text('Bathroom');
	$('#contents').fadeOut(function() {
		$('#contents').load('/divs/' + 'bathroom', function(){
			$('#contents').fadeIn();
		});
	});
};


function everythingGuages(){
	document.getElementById('averageHumidityGuageDiv').innerHTML = document.getElementById('divStoreAverageHumidityGuage').innerHTML;
	document.getElementById('averageTemperatureGuageDiv').innerHTML = document.getElementById('divStoreAverageTemperatureGuage').innerHTML;
	document.getElementById('averageLightGuageDiv').innerHTML = document.getElementById('divStoreAverageLightGuage').innerHTML;
	document.getElementById('everythingHallHumidityGuageDiv').innerHTML = document.getElementById('divStoreSmallHallHumidityGuage').innerHTML;
	document.getElementById('everythingHallTemperatureGuageDiv').innerHTML = document.getElementById('divStoreSmallHallTemperatureGuage').innerHTML;
	document.getElementById('everythingHallLightGuageDiv').innerHTML = document.getElementById('divStoreSmallHallLightGuage').innerHTML;
	document.getElementById('everythingKitchenHumidityGuageDiv').innerHTML = document.getElementById('divStoreSmallKitchenHumidityGuage').innerHTML;
	document.getElementById('everythingKitchenTemperatureGuageDiv').innerHTML = document.getElementById('divStoreSmallKitchenTemperatureGuage').innerHTML;
	document.getElementById('everythingKitchenLightGuageDiv').innerHTML = document.getElementById('divStoreSmallKitchenLightGuage').innerHTML;
	document.getElementById('everythingBathroomHumidityGuageDiv').innerHTML = document.getElementById('divStoreSmallBathroomHumidityGuage').innerHTML;
	document.getElementById('everythingBathroomTemperatureGuageDiv').innerHTML = document.getElementById('divStoreSmallBathroomTemperatureGuage').innerHTML;
	document.getElementById('everythingBathroomLightGuageDiv').innerHTML = document.getElementById('divStoreSmallBathroomLightGuage').innerHTML;
	document.getElementById('everythingLoungeHumidityGuageDiv').innerHTML = document.getElementById('divStoreSmallLoungeHumidityGuage').innerHTML;
	document.getElementById('everythingLoungeTemperatureGuageDiv').innerHTML = document.getElementById('divStoreSmallLoungeTemperatureGuage').innerHTML;
	document.getElementById('everythingLoungeLightGuageDiv').innerHTML = document.getElementById('divStoreSmallLoungeLightGuage').innerHTML;
	document.getElementById('everythingBedroom1HumidityGuageDiv').innerHTML = document.getElementById('divStoreSmallBedroom1HumidityGuage').innerHTML;
	document.getElementById('everythingBedroom1TemperatureGuageDiv').innerHTML = document.getElementById('divStoreSmallBedroom1TemperatureGuage').innerHTML;
	document.getElementById('everythingBedroom1LightGuageDiv').innerHTML = document.getElementById('divStoreSmallBedroom1LightGuage').innerHTML;
	document.getElementById('everythingBedroom2HumidityGuageDiv').innerHTML = document.getElementById('divStoreSmallBedroom2HumidityGuage').innerHTML;
	document.getElementById('everythingBedroom2TemperatureGuageDiv').innerHTML = document.getElementById('divStoreSmallBedroom2TemperatureGuage').innerHTML;
	document.getElementById('everythingBedroom2LightGuageDiv').innerHTML = document.getElementById('divStoreSmallBedroom2LightGuage').innerHTML;
}
everythingGuages();
setInterval(everythingGuages, 500);
