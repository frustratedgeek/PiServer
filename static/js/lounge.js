
$('#loungeLightOnButton').hide();
$('#loungeLightOffButton').hide();

document.getElementById('loungeLightButton').onclick = function(){
	$.ajax({url:'/lightSwitch/lounge', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

function loungeGuages(){
	document.getElementById('loungeHumidityGuageDiv').innerHTML = document.getElementById('divStoreLoungeHumidityGuage').innerHTML;
	document.getElementById('loungeTemperatureGuageDiv').innerHTML = document.getElementById('divStoreLoungeTemperatureGuage').innerHTML;
	document.getElementById('loungeLightGuageDiv').innerHTML = document.getElementById('divStoreLoungeLightGuage').innerHTML;
}
loungeGuages();
setInterval(loungeGuages, 500);
