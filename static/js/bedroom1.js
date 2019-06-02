
$('#bedroom1MainLightOnButton').hide();
$('#bedroom1MainLightOffButton').hide();
$('#bedroom1AmbientLightOnButton').hide();
$('#bedroom1AmbientLightOffButton').hide();
$('#bedroom1AllLightOnButton').hide();
$('#bedroom1AllLightOffButton').hide();
$('#bedroom1AllLightImage').hide();

document.getElementById('bedroom1MainLightButton').onclick = function(){
	$.ajax({url:'/lightSwitch/bedroom1Main', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

document.getElementById('bedroom1AmbientLightButton').onclick = function(){
	$.ajax({url:'/lightSwitch/bedroom1Ambient', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

document.getElementById('bedroom1AllLightButton').onclick = function(){
	$.ajax({url:'/lightSwitch/bedroom1All', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

function bedroom1Guages(){
	document.getElementById('bedroom1HumidityGuageDiv').innerHTML = document.getElementById('divStoreBedroom1HumidityGuage').innerHTML;
	document.getElementById('bedroom1TemperatureGuageDiv').innerHTML = document.getElementById('divStoreBedroom1TemperatureGuage').innerHTML;
	document.getElementById('bedroom1LightGuageDiv').innerHTML = document.getElementById('divStoreBedroom1LightGuage').innerHTML;
}
bedroom1Guages();
setInterval(bedroom1Guages, 500);
