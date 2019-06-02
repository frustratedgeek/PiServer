
$('#bathroomLightOnButton').hide();
$('#bathroomLightOffButton').hide();

document.getElementById('bathroomLightButton').onclick = function(){
	$.ajax({url:'/lightSwitch/bathroom', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

function bathroomGuages(){
	document.getElementById('bathroomHumidityGuageDiv').innerHTML = document.getElementById('divStoreBathroomHumidityGuage').innerHTML;
	document.getElementById('bathroomTemperatureGuageDiv').innerHTML = document.getElementById('divStoreBathroomTemperatureGuage').innerHTML;
	document.getElementById('bathroomLightGuageDiv').innerHTML = document.getElementById('divStoreBathroomLightGuage').innerHTML;
}
bathroomGuages();
setInterval(bathroomGuages, 500);
