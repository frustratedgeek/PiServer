$(function() {

	$('#saveSchedule').on('submit', function(event) {

		var checkboxes = ['hallLightOnCheckMorning', 'hallLightOffCheckMorning',
				'kitchenLightOnCheckMorning', 'kitchenLightOffCheckMorning',
				'loungeLightOnCheckMorning', 'loungeLightOffCheckMorning',
				'bedroomMainLightOnCheckMorning', 'bedroomMainLightOffCheckMorning',
				'bedroomAmbientLightOnCheckMorning', 'hallLightOffCheckMorning',
				'hallLightOnCheckMorning', 'bedroomAmbientLightOffCheckMorning',
				'spareRoomLightOnCheckMorning', 'spareRoomLightOffCheckMorning',
				'bathroomLightOnCheckMorning', 'bathroomLightOffCheckMorning',
				'hallHeaterOnCheckMorning', 'hallHeaterOffCheckMorning',
				'lounge1HeaterOnCheckMorning', 'lounge1HeaterOffCheckMorning',
				'lounge2HeaterOnCheckMorning', 'lounge2HeaterOffCheckMorning',

				'hallLightOnCheckEvening', 'hallLightOffCheckEvening',
				'kitchenLightOnCheckEvening', 'kitchenLightOffCheckEvening',
				'loungeLightOnCheckEvening', 'loungeLightOffCheckEvening',
				'bedroomMainLightOnCheckEvening', 'bedroomMainLightOffCheckEvening',
				'bedroomAmbientLightOnCheckEvening', 'hallLightOffCheckEvening',
				'hallLightOnCheckEvening', 'bedroomAmbientLightOffCheckEvening',
				'spareRoomLightOnCheckEvening', 'spareRoomLightOffCheckEvening',
				'bathroomLightOnCheckEvening', 'bathroomLightOffCheckEvening',
				'hallHeaterOnCheckEvening', 'hallHeaterOffCheckEvening',
				'lounge1HeaterOnCheckEvening', 'lounge1HeaterOffCheckEvening',
				'lounge2HeaterOnCheckEvening', 'lounge2HeaterOffCheckEvening',

				'hallLightOnCheckWeekend', 'hallLightOffCheckWeekend',
				'kitchenLightOnCheckWeekend', 'kitchenLightOffCheckWeekend',
				'loungeLightOnCheckWeekend', 'loungeLightOffCheckWeekend',
				'bedroomMainLightOnCheckWeekend', 'bedroomMainLightOffCheckWeekend',
				'bedroomAmbientLightOnCheckWeekend', 'hallLightOffCheckWeekend',
				'hallLightOnCheckWeekend', 'bedroomAmbientLightOffCheckWeekend',
				'spareRoomLightOnCheckWeekend', 'spareRoomLightOffCheckWeekend',
				'bathroomLightOnCheckWeekend', 'bathroomLightOffCheckWeekend',
				'hallHeaterOnCheckWeekend', 'hallHeaterOffCheckWeekend',
				'lounge1HeaterOnCheckWeekend', 'lounge1HeaterOffCheckWeekend',
				'lounge2HeaterOnCheckWeekend', 'lounge2HeaterOffCheckWeekend'];


		for (var i = 0; i < checkboxes.length; i++) {
			console.log(checkboxes[i]);
			if ($('#' + checkboxes[i]).is(':checked')) {
				eval('var ' + checkboxes[i] + '1 = True');
			} else {
				eval('var ' + checkboxes[i] + '1 = False');
			}
		}


		for (var i = 0; i < checkboxes.length; i++) {
			if ($('#' + i).is(':checked')) {
				eval('var ' + i + ' = True');
			} else {
				eval('var ' + i + ' = False');
			}
		}


		console.log(loungeLightOnCheckWeekend)

		});
		event.preventDefault();
	});

	$('#pauseSchedule2').on('submit', function(event) {
		$.ajax({
			data : {
				action : $('#action2').val(),
				location : $('#location2').val()
			},
			type : 'POST',
			url : '/pauseSchedule'
		})
		.done(function(data) {
			if (data[0] == 'running') {
				$('#resume').hide();
				$('#pause').show();
			} else {
				$('#resume').show();
				$('#pause').hide();
			}
			if (data[1] == 'updated') {
				$('#scheduleUpdated').show();
				$('#schedulePaused').hide();
				$('#scheduleResumed').hide();
			} else if (data[1] == 'resumed') {
				$('#scheduleUpdated').hide();
				$('#schedulePaused').hide();
				$('#scheduleResumed').show();
			} else if (data[1] == 'paused') {
				$('#scheduleUpdated').hide();
				$('#schedulePaused').show();
				$('#scheduleResumed').hide();
			} else {
				$('#scheduleUpdated').hide();
				$('#schedulePaused').hide();
				$('#scheduleResumed').hide();
			}
		});
		event.preventDefault();
	});

});