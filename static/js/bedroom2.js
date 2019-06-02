
$('#bedroom2LightOnButton').hide();
$('#bedroom2LightOffButton').hide();

document.getElementById('bedroom2LightButton').onclick = function(){
	$.ajax({url:'/lightSwitch/bedroom2', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

function bedroom2Guages(){
	document.getElementById('bedroom2HumidityGuageDiv').innerHTML = document.getElementById('divStoreBedroom2HumidityGuage').innerHTML;
	document.getElementById('bedroom2TemperatureGuageDiv').innerHTML = document.getElementById('divStoreBedroom2TemperatureGuage').innerHTML;
	document.getElementById('bedroom2LightGuageDiv').innerHTML = document.getElementById('divStoreBedroom2LightGuage').innerHTML;
}
bedroom2Guages();
setInterval(bedroom2Guages, 500);
