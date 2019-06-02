
$('#masterBedroomLightsPopup').hide();
$('#kitchenLightsPopup').hide();

document.getElementById('hallLightShape').onclick = function(){
	$.ajax({url:'/lightSwitch/hall', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

document.getElementById('kitchenLightShape').onclick = function(){
	$('#kitchenLightsPopup').fadeIn();
};

document.getElementById('spareLightShape').onclick = function(){
	$.ajax({url:'/lightSwitch/bedroom2', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

document.getElementById('bedroomLightShape').onclick = function(){
	$('#masterBedroomLightsPopup').fadeIn();
};

document.getElementById('loungeLightShape').onclick = function(){
	$.ajax({url:'/lightSwitch/lounge', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

document.getElementById('bathroomLightShape').onclick = function(){
	$.ajax({url:'/lightSwitch/bathroom', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

document.getElementById('mainBedroom1LightsButton').onclick = function(){
	$.ajax({url:'/lightSwitch/bedroom1Main', type:'POST'}).done(function(data) {});
	event.preventDefault();
	$('#masterBedroomLightsPopup').fadeOut();
};

document.getElementById('ambientBedroom1LightButton').onclick = function(){
	$.ajax({url:'/lightSwitch/bedroom1Ambient', type:'POST'}).done(function(data) {});
	event.preventDefault();
	$('#masterBedroomLightsPopup').fadeOut();
};

document.getElementById('allBedroom1LightsButton').onclick = function(){
	$.ajax({url:'/lightSwitch/bedroom1All', type:'POST'}).done(function(data) {});
	event.preventDefault();
	$('#masterBedroomLightsPopup').fadeOut();
};

document.getElementById('mainKitchenLightsButton').onclick = function(){
	$.ajax({url:'/lightSwitch/kitchenMain', type:'POST'}).done(function(data) {});
	event.preventDefault();
	$('#kitchenLightsPopup').fadeOut();
};

document.getElementById('ambientKitchenLightButton').onclick = function(){
	$.ajax({url:'/lightSwitch/kitchenAmbient', type:'POST'}).done(function(data) {});
	event.preventDefault();
	$('#kitchenLightsPopup').fadeOut();
};

document.getElementById('allKitchenLightsButton').onclick = function(){
	$.ajax({url:'/lightSwitch/kitchenAll', type:'POST'}).done(function(data) {});
	event.preventDefault();
	$('#kitchenLightsPopup').fadeOut();
};

$(function() {
	$('#allLightsOnForm').on('submit', function(event) {
		$.ajax({url:'/lightSwitch/allOn', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});
	$('#allLightsOffForm').on('submit', function(event) {
		$.ajax({url:'/lightSwitch/allOff', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});
	$('#allLightsSwitchForm').on('submit', function(event) {
		$.ajax({url:'/lightSwitch/allSwitch', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});
});
