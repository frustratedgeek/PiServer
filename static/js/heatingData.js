$(function (){

	function heatersDataStatus(){
		var url = '/heatersStatus';
		var data = {_: new Date().getTime()};
		$.getJSON(url, data, function(result){
			JSON.stringify(result);

			$('#heater1Status').text('Heater 1: ' + result.items[0]);
			$('#heater2Status').text('Heater 2: ' + result.items[1]);
			$('#heater3Status').text('Heater 3: ' + result.items[2]);
			$('#heater4Status').text('Heater 4: ' + result.items[3]);
			$('#heater5Status').text('Heater 5: ' + result.items[4]);
			$('#heater6Status').text('Heater 6: ' + result.items[5]);
			$('#heater7Status').text('Heater 7: ' + result.items[6]);
			$('#heater8Status').text('Heater 8: ' + result.items[7]);

		});
	}
	heatersDataStatus();
	setInterval(heatersDataStatus, 1000);
});
