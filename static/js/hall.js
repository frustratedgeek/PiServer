
$('#hallLightOnButton').hide();
$('#hallLightOffButton').hide();

document.getElementById('hallLightButton').onclick = function(){
	$.ajax({url:'/lightSwitch/hall', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

function hallGuages(){
	document.getElementById('hallHumidityGuageDiv').innerHTML = document.getElementById('divStoreHallHumidityGuage').innerHTML;
	document.getElementById('hallTemperatureGuageDiv').innerHTML = document.getElementById('divStoreHallTemperatureGuage').innerHTML;
	document.getElementById('hallLightGuageDiv').innerHTML = document.getElementById('divStoreHallLightGuage').innerHTML;
}
hallGuages();
setInterval(hallGuages, 500);
