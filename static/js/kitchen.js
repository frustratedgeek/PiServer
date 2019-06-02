
$('#kitchenMainLightOnButton').hide();
$('#kitchenMainLightOffButton').hide();
$('#kitchenAmbientLightOnButton').hide();
$('#kitchenAmbientLightOffButton').hide();
$('#kitchenAllLightOnButton').hide();
$('#kitchenAllLightOffButton').hide();
$('#kitchenAllLightImage').hide();

document.getElementById('kitchenMainLightButton').onclick = function(){
	$.ajax({url:'/lightSwitch/kitchenMain', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

document.getElementById('kitchenAmbientLightButton').onclick = function(){
	$.ajax({url:'/lightSwitch/kitchenAmbient', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

document.getElementById('kitchenAllLightButton').onclick = function(){
	$.ajax({url:'/lightSwitch/kitchenAll', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

function kitchenGuages(){
	document.getElementById('kitchenHumidityGuageDiv').innerHTML = document.getElementById('divStoreKitchenHumidityGuage').innerHTML;
	document.getElementById('kitchenTemperatureGuageDiv').innerHTML = document.getElementById('divStoreKitchenTemperatureGuage').innerHTML;
	document.getElementById('kitchenLightGuageDiv').innerHTML = document.getElementById('divStoreKitchenLightGuage').innerHTML;
}
kitchenGuages();
setInterval(kitchenGuages, 500);