
function allPageData(){
	var currentHour = new Date().getHours();
	var url = '/pageData/' + currentHour;
	var data = {_: new Date().getTime()};
	$.getJSON(url, data, function(result){
// Guages
		drawChart('average', result.averageHumidityReading, result.averageTemperatureReading, result.averageLightReading);
		drawChart('hall', result.hallHumidityReading, result.hallTemperatureReading, result.hallLightReading);
		drawChart('kitchen', result.kitchenHumidityReading, result.kitchenTemperatureReading, result.kitchenLightReading);
		drawChart('lounge', result.loungeHumidityReading, result.loungeTemperatureReading, result.loungeLightReading);
		drawChart('bedroom1', result.bedroom1HumidityReading, result.bedroom1TemperatureReading, result.bedroom1LightReading);
		drawChart('bedroom2', result.bedroom2HumidityReading, result.bedroom2TemperatureReading, result.bedroom2LightReading);
		drawChart('bathroom', result.bathroomHumidityReading, result.bathroomTemperatureReading, result.bathroomLightReading);
		JSON.stringify(result);
// User Settings
		customColourStyle.style.fill=result.customColour;
		customColourStyle.style.opacity=result.customOpacity;
		$('#welcomeMessage').text(result.topMessage);
		$('#savedSettingsMessage').text(result.settingsMessage);
		$('#changedPasswordMessage').text(result.passwordMessage);
// PI Control
		$('#cpuUsage').text(result.cpuUsage + '%');
		$('#cpuFrequency').text(result.cpuFrequency + ' GHz');
		$('#cpuTemp').text(result.cpuTemp + '\u00b0' + 'C');
		$('#ping').text(result.ping + ' ms');
		$('#download').text(result.download + ' Mb/s');
		$('#upload').text(result.upload + ' Mb/s');
		$('#userAddress').text(result.userAddress);
		$('#publicAddress').text(result.publicAddress);
		$('#routerAddress').text(result.routerAddress);
		$('#serverAddress').text(result.serverAddress);
		if (result.primaryRelaySatus == 'False') {
			$('#restorePrimaryButton').hide();
			$('#cutPrimaryButton').show();
		} else {
			$('#restorePrimaryButton').show();
			$('#cutPrimaryButton').hide();
		}
		if (result.auxRelaySatus == 'False') {
			$('#restoreAuxButton').hide();
			$('#cutAuxButton').show();
		} else {
			$('#restoreAuxButton').show();
			$('#cutAuxButton').hide();
		}
// Schedule
		if (result.scheduleStatus == 'running') {
			$('#resume').hide();
			$('#pause').show();
		} else {
			$('#resume').show();
			$('#pause').hide();
		}
		$('#scheduleMessage').text(result.scheduleMessage);
// Appliances
		if (result.pcStatus == 'off') {
			$('#switchOnPcButton').show();
			$('#switchOffPcButton').hide();
			$('#pcStartingImage').hide();
			$('#pcShuttingDownImage').hide();
		} else if (result.pcStatus == 'on') {
			$('#switchOnPcButton').hide();
			$('#switchOffPcButton').show();
			$('#pcStartingImage').hide();
			$('#pcShuttingDownImage').hide();
		} else if (result.pcStatus == 'shutting down') {
			$('#switchOnPcButton').hide();
			$('#switchOffPcButton').hide();
			$('#pcStartingImage').hide();
			$('#pcShuttingDownImage').show();
		} else {
			$('#switchOnPcButton').hide();
			$('#switchOffPcButton').hide();
			$('#pcStartingImage').show();
			$('#pcShuttingDownImage').hide();
		}
// Light Switch Buttons
		if (result.hallLight == 'on') {
			$('#hallLightOnButton').hide();
			$('#hallLightOffButton').show();
		} else {
			$('#hallLightOnButton').show();
			$('#hallLightOffButton').hide();
		}
		if (result.kitchenMainLight == 'on') {
			$('#kitchenMainLightOnButton').hide();
			$('#kitchenMainLightOffButton').show();
		} else {
			$('#kitchenMainLightOnButton').show();
			$('#kitchenMainLightOffButton').hide();
		}
		if (result.kitchenSecondLight == 'on') {
			$('#kitchenAmbientLightOnButton').hide();
			$('#kitchenAmbientLightOffButton').show();
		} else {
			$('#kitchenAmbientLightOnButton').show();
			$('#kitchenAmbientLightOffButton').hide();
		}
		if (result.kitchenMainLight == 'on' && result.kitchenSecondLight == 'on') {
			$('#kitchenAllLightOnButton').hide();
			$('#kitchenAllLightOffButton').show();
			$('#kitchenAllLightImage').hide();
		} else if (result.kitchenMainLight == 'off' && result.kitchenSecondLight == 'off') {
			$('#kitchenAllLightOnButton').show();
			$('#kitchenAllLightOffButton').hide();
			$('#kitchenAllLightImage').hide();
		} else {
			$('#kitchenAllLightOnButton').hide();
			$('#kitchenAllLightOffButton').hide();
			$('#kitchenAllLightImage').show();
		}
		if (result.loungeLight == 'on') {
			$('#loungeLightOnButton').hide();
			$('#loungeLightOffButton').show();
		} else {
			$('#loungeLightOnButton').show();
			$('#loungeLightOffButton').hide();
		}
		if (result.masterMainLight == 'on') {
			$('#bedroom1MainLightOnButton').hide();
			$('#bedroom1MainLightOffButton').show();
		} else {
			$('#bedroom1MainLightOnButton').show();
			$('#bedroom1MainLightOffButton').hide();
		}
		if (result.masterSecondLight == 'on') {
			$('#bedroom1AmbientLightOnButton').hide();
			$('#bedroom1AmbientLightOffButton').show();
		} else {
			$('#bedroom1AmbientLightOnButton').show();
			$('#bedroom1AmbientLightOffButton').hide();
		}
		if (result.masterMainLight == 'on' && result.masterSecondLight == 'on') {
			$('#bedroom1AllLightOnButton').hide();
			$('#bedroom1AllLightOffButton').show();
			$('#bedroom1AllLightImage').hide();
		} else if (result.masterMainLight == 'off' && result.masterSecondLight == 'off') {
			$('#bedroom1AllLightOnButton').show();
			$('#bedroom1AllLightOffButton').hide();
			$('#bedroom1AllLightImage').hide();
		} else {
			$('#bedroom1AllLightOnButton').hide();
			$('#bedroom1AllLightOffButton').hide();
			$('#bedroom1AllLightImage').show();
		}
		if (result.spareLight == 'on') {
			$('#bedroom2LightOnButton').hide();
			$('#bedroom2LightOffButton').show();
		} else {
			$('#bedroom2LightOnButton').show();
			$('#bedroom2LightOffButton').hide();
		}
		if (result.bathroomLight == 'on') {
			$('#bathroomLightOnButton').hide();
			$('#bathroomLightOffButton').show();
		} else {
			$('#bathroomLightOnButton').show();
			$('#bathroomLightOffButton').hide();
		}
// Light Status Display
		if (result.hallLight == 'on') {
			hallLightShape.style.fill='yellow';
		} else {
			hallLightShape.style.fill='none';
		}
		if (result.kitchenMainLight == 'on') {
			kitchenLightShape.style.fill='yellow';
		} else {
			kitchenLightShape.style.fill='none';
		}
		if (result.kitchenSecondLight == 'on') {
			kitchenAmbientLightShape1.style.fill='yellow';
			kitchenAmbientLightShape2.style.fill='yellow';
			kitchenAmbientLightShape3.style.fill='yellow';
		} else {
			kitchenAmbientLightShape1.style.fill='none';
			kitchenAmbientLightShape2.style.fill='none';
			kitchenAmbientLightShape3.style.fill='none';
		}
		if (result.loungeLight == 'on') {
			loungeLightShape.style.fill='yellow';
		} else {
			loungeLightShape.style.fill='none';
		}
		if (result.masterMainLight == 'on') {
			bedroomLightShape.style.fill='yellow';
		} else {
			bedroomLightShape.style.fill='none';
		}
		if (result.masterSecondLight == 'on') {
			bedroomLightCircle.style.fill='yellow';
		} else {
			bedroomLightCircle.style.fill='none';
		}
		if (result.spareLight == 'on') {
			spareLightShape.style.fill='yellow';
		} else {
			spareLightShape.style.fill='none';
		}
		if (result.bathroomLight == 'on') {
			bathroomLightShape.style.fill='yellow';
		} else {
			bathroomLightShape.style.fill='none';
		}
// Overview DATA
		$('#tempData1').text(result.kitchenTemperatureReading);
		$('#tempData2').text(result.hallTemperatureReading);
		$('#tempData3').text(result.loungeTemperatureReading);
		$('#tempData4').text(result.bathroomTemperatureReading);
		$('#tempData5').text(result.bedroom1TemperatureReading);
		$('#tempData6').text(result.bedroom2TemperatureReading);
		$('#humidityData1').text(result.kitchenHumidityReading);
		$('#humidityData2').text(result.hallHumidityReading);
		$('#humidityData3').text(result.loungeHumidityReading);
		$('#humidityData4').text(result.bathroomHumidityReading);
		$('#humidityData5').text(result.bedroom1HumidityReading);
		$('#humidityData6').text(result.bedroom2HumidityReading);
	});
}
allPageData();
setInterval(allPageData, 500);

google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);
function drawChart(room, humidityReading, temperatureReading, lightReading) {
	var dataHumidity = google.visualization.arrayToDataTable([
		['Label', 'Value'],
		['Humidity', 0]
	]);
	var dataTemperature = google.visualization.arrayToDataTable([
		['Label', 'Value'],
		['Temp.', 0]
	]);
	var dataLight = google.visualization.arrayToDataTable([
		['Label', 'Value'],
		['Light', 0]
	]);
	var optionsHumidity = {
		width: 200, height: 200,
		redFrom: 60, redTo: 100, redColor: '#cc0000',
		yellowFrom:30, yellowTo: 60, yellowColor: '#33cc33',
		greenFrom:0, greenTo: 30, greenColor: '#e68a00',
		minorTicks: 5,
		majorTicks: ['', '', '', '', '', '', '', '', '', '', ''],
		min: 0,
		max: 100,
	};
	var optionsTemperature = {
		width: 200, height: 200,
		redFrom: 30, redTo: 45, redColor: '#cc0000',
		yellowFrom:15, yellowTo: 30, yellowColor: '#33cc33',
		greenFrom:0, greenTo: 15, greenColor: '#00ccff',
		minorTicks: 5,
		majorTicks: ['', '', '', '', '', '', '', '', ''],
		min: 0,
		max: 40,
	};
	var optionsLight = {
		width: 200, height: 200,
		redFrom: 70, redTo: 100, redColor: '#dada00',
		yellowFrom:30, yellowTo: 70, yellowColor: '#9b9b00',
		greenFrom:0, greenTo: 30, greenColor: '#80800',
		minorTicks: 5,
		majorTicks: ['', '', '', '', '', '', '', '', '', '', ''],
		min: 0,
		max: 100,
	};
	var smallOptionsHumidity = {
		width: 60, height: 60,
		redFrom: 60, redTo: 100, redColor: '#444444',
		yellowFrom:30, yellowTo: 60, yellowColor: '#33cc33',
		greenFrom:0, greenTo: 30, greenColor: '#444444',
		minorTicks: 5,
		majorTicks: ['', '', '', '', '', '', '', '', '', '', ''],
		min: 0,
		max: 100,
	};
	var smallOptionsTemperature = {
		width: 60, height: 60,
		redFrom: 30, redTo: 45, redColor: '#444444',
		yellowFrom:15, yellowTo: 30, yellowColor: '#00ccff',
		greenFrom:0, greenTo: 15, greenColor: '#444444',
		minorTicks: 5,
		majorTicks: ['', '', '', '', '', '', '', '', ''],
		min: 0,
		max: 40,
	};
	var smallOptionsLight = {
		width: 60, height: 60,
		redFrom: 70, redTo: 100, redColor: '#9b9b00',
		yellowFrom:30, yellowTo: 70, yellowColor: '#9b9b00',
		greenFrom:0, greenTo: 30, greenColor: '#444444',
		minorTicks: 5,
		majorTicks: ['', '', '', '', '', '', '', '', '', '', ''],
		min: 0,
		max: 100,
	};
	var averageChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreAverageHumidityGuage'));
	var averageChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreAverageTemperatureGuage'));
	var averageChartLight = new google.visualization.Gauge(document.getElementById('divStoreAverageLightGuage'));
	var hallChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreHallHumidityGuage'));
	var hallChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreHallTemperatureGuage'));
	var hallChartLight = new google.visualization.Gauge(document.getElementById('divStoreHallLightGuage'));
	var kitchenChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreKitchenHumidityGuage'));
	var kitchenChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreKitchenTemperatureGuage'));
	var kitchenChartLight = new google.visualization.Gauge(document.getElementById('divStoreKitchenLightGuage'));
	var loungeChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreLoungeHumidityGuage'));
	var loungeChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreLoungeTemperatureGuage'));
	var loungeChartLight = new google.visualization.Gauge(document.getElementById('divStoreLoungeLightGuage'));
	var bedroom1ChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreBedroom1HumidityGuage'));
	var bedroom1ChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreBedroom1TemperatureGuage'));
	var bedroom1ChartLight = new google.visualization.Gauge(document.getElementById('divStoreBedroom1LightGuage'));
	var bedroom2ChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreBedroom2HumidityGuage'));
	var bedroom2ChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreBedroom2TemperatureGuage'));
	var bedroom2ChartLight = new google.visualization.Gauge(document.getElementById('divStoreBedroom2LightGuage'));
	var bathroomChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreBathroomHumidityGuage'));
	var bathroomChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreBathroomTemperatureGuage'));
	var bathroomChartLight = new google.visualization.Gauge(document.getElementById('divStoreBathroomLightGuage'));
	var smallAverageChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreSmallAverageHumidityGuage'));
	var smallAverageChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreSmallAverageTemperatureGuage'));
	var smallAverageChartLight = new google.visualization.Gauge(document.getElementById('divStoreSmallAverageLightGuage'));
	var smallHallChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreSmallHallHumidityGuage'));
	var smallHallChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreSmallHallTemperatureGuage'));
	var smallHallChartLight = new google.visualization.Gauge(document.getElementById('divStoreSmallHallLightGuage'));
	var smallKitchenChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreSmallKitchenHumidityGuage'));
	var smallKitchenChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreSmallKitchenTemperatureGuage'));
	var smallKitchenChartLight = new google.visualization.Gauge(document.getElementById('divStoreSmallKitchenLightGuage'));
	var smallLoungeChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreSmallLoungeHumidityGuage'));
	var smallLoungeChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreSmallLoungeTemperatureGuage'));
	var smallLoungeChartLight = new google.visualization.Gauge(document.getElementById('divStoreSmallLoungeLightGuage'));
	var smallBedroom1ChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreSmallBedroom1HumidityGuage'));
	var smallBedroom1ChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreSmallBedroom1TemperatureGuage'));
	var smallBedroom1ChartLight = new google.visualization.Gauge(document.getElementById('divStoreSmallBedroom1LightGuage'));
	var smallBedroom2ChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreSmallBedroom2HumidityGuage'));
	var smallBedroom2ChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreSmallBedroom2TemperatureGuage'));
	var smallBedroom2ChartLight = new google.visualization.Gauge(document.getElementById('divStoreSmallBedroom2LightGuage'));
	var smallBathroomChartHumidity = new google.visualization.Gauge(document.getElementById('divStoreSmallBathroomHumidityGuage'));
	var smallBathroomChartTemperature = new google.visualization.Gauge(document.getElementById('divStoreSmallBathroomTemperatureGuage'));
	var smallBathroomChartLight = new google.visualization.Gauge(document.getElementById('divStoreSmallBathroomLightGuage'));
	dataHumidity.setValue(0, 1, humidityReading);
	dataTemperature.setValue(0, 1, temperatureReading);
	dataLight.setValue(0, 1, lightReading);
	var formatter = new google.visualization.NumberFormat(
		{suffix: '°C',pattern:'#'});
	formatter.format(dataTemperature,1);
	var formatter = new google.visualization.NumberFormat(
		{suffix: '%',pattern:'#'});
	formatter.format(dataHumidity,1);
	formatter.format(dataLight,1);
	if (room == 'average') {
		averageChartHumidity.draw(dataHumidity, optionsHumidity);
		averageChartTemperature.draw(dataTemperature, optionsTemperature);
		averageChartLight.draw(dataLight, optionsLight);
		smallAverageChartHumidity.draw(dataHumidity, smallOptionsHumidity);
		smallAverageChartTemperature.draw(dataTemperature, smallOptionsTemperature);
		smallAverageChartLight.draw(dataLight, smallOptionsLight);
	} else if (room == 'hall') {
		hallChartHumidity.draw(dataHumidity, optionsHumidity);
		hallChartTemperature.draw(dataTemperature, optionsTemperature);
		hallChartLight.draw(dataLight, optionsLight);
		smallHallChartHumidity.draw(dataHumidity, smallOptionsHumidity);
		smallHallChartTemperature.draw(dataTemperature, smallOptionsTemperature);
		smallHallChartLight.draw(dataLight, smallOptionsLight);
	} else if (room == 'kitchen') {
		kitchenChartHumidity.draw(dataHumidity, optionsHumidity);
		kitchenChartTemperature.draw(dataTemperature, optionsTemperature);
		kitchenChartLight.draw(dataLight, optionsLight);
		smallKitchenChartHumidity.draw(dataHumidity, smallOptionsHumidity);
		smallKitchenChartTemperature.draw(dataTemperature, smallOptionsTemperature);
		smallKitchenChartLight.draw(dataLight, smallOptionsLight);
	} else if (room == 'lounge') {
		loungeChartHumidity.draw(dataHumidity, optionsHumidity);
		loungeChartTemperature.draw(dataTemperature, optionsTemperature);
		loungeChartLight.draw(dataLight, optionsLight);
		smallLoungeChartHumidity.draw(dataHumidity, smallOptionsHumidity);
		smallLoungeChartTemperature.draw(dataTemperature, smallOptionsTemperature);
		smallLoungeChartLight.draw(dataLight, smallOptionsLight);
	} else if (room == 'bedroom1') {
		bedroom1ChartHumidity.draw(dataHumidity, optionsHumidity);
		bedroom1ChartTemperature.draw(dataTemperature, optionsTemperature);
		bedroom1ChartLight.draw(dataLight, optionsLight);
		smallBedroom1ChartHumidity.draw(dataHumidity, smallOptionsHumidity);
		smallBedroom1ChartTemperature.draw(dataTemperature, smallOptionsTemperature);
		smallBedroom1ChartLight.draw(dataLight, smallOptionsLight);
	} else if (room == 'bedroom2') {
		bedroom2ChartHumidity.draw(dataHumidity, optionsHumidity);
		bedroom2ChartTemperature.draw(dataTemperature, optionsTemperature);
		bedroom2ChartLight.draw(dataLight, optionsLight);
		smallBedroom2ChartHumidity.draw(dataHumidity, smallOptionsHumidity);
		smallBedroom2ChartTemperature.draw(dataTemperature, smallOptionsTemperature);
		smallBedroom2ChartLight.draw(dataLight, smallOptionsLight);
	} else if (room == 'bathroom') {
		bathroomChartHumidity.draw(dataHumidity, optionsHumidity);
		bathroomChartTemperature.draw(dataTemperature, optionsTemperature);
		bathroomChartLight.draw(dataLight, optionsLight);
		smallBathroomChartHumidity.draw(dataHumidity, smallOptionsHumidity);
		smallBathroomChartTemperature.draw(dataTemperature, smallOptionsTemperature);
		smallBathroomChartLight.draw(dataLight, smallOptionsLight);
	} else {
	}
}
