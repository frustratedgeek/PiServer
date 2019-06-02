
var kitchenShape = document.getElementById('kitchenLightShape');
var hallShape = document.getElementById('hallLightShape');
var loungeShape = document.getElementById('loungeLightShape');
var bathroomShape = document.getElementById('bathroomLightShape');
var bedroomShape = document.getElementById('bedroomLightShape');
var spareShape = document.getElementById('spareLightShape');

var bedroomMainLights = document.getElementById('mainLightsButton');
var bedroomAmbientLight = document.getElementById('ambientLightButton');
var bedroomAllLights = document.getElementById('allLightsButton');

$('#masterBedroomLightsPopup').hide();

hallShape.onclick = function(){
	$.ajax({url:'/hallLightSwitch', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

kitchenShape.onclick = function(){
	$.ajax({url:'/kitchenLightSwitch', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

spareShape.onclick = function(){
	$.ajax({url:'/spareRoomLightSwitch', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

bedroomShape.onclick = function(){
	$('#masterBedroomLightsPopup').fadeIn();
};

loungeShape.onclick = function(){
	$.ajax({url:'/loungeLightSwitch', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

bathroomShape.onclick = function(){
	$.ajax({url:'/bathroomLightSwitch', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

bedroomMainLights.onclick = function(){
	$.ajax({url:'/masterMainLightSwitch', type:'POST'}).done(function(data) {});
	event.preventDefault();
	$('#masterBedroomLightsPopup').fadeOut();
};

bedroomAmbientLight.onclick = function(){
	$.ajax({url:'/masterSecondLightSwitch', type:'POST'}).done(function(data) {});
	event.preventDefault();
	$('#masterBedroomLightsPopup').fadeOut();
};

bedroomAllLights.onclick = function(){
	$.ajax({url:'/masterAllLightSwitch', type:'POST'}).done(function(data) {});
	event.preventDefault();
	$('#masterBedroomLightsPopup').fadeOut();
};



$(function() {

	$('#light0Form').on('submit', function(event) {
		$.ajax({url:'/allLightsSwitch', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});

});
