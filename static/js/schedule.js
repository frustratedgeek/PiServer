
$('#resume').hide();
$('#pause').hide();

$(function() {
	$('#pauseSchedule').on('submit', function(event) {
		$.ajax({url:'/pauseSchedule', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});
});

$(function (){
	$('#saveSchedule').on('submit', function(event) {
		var checkboxes = {hallLightOnCheckMorning: 'False', hallLightOffCheckMorning: 'False',
				kitchenMainLightOnCheckMorning: 'False', kitchenMainLightOffCheckMorning: 'False',
				kitchenAmbientLightOnCheckMorning: 'False', kitchenAmbientLightOffCheckMorning: 'False',
				loungeLightOnCheckMorning: 'False', loungeLightOffCheckMorning: 'False',
				bedroom1MainLightOnCheckMorning: 'False', bedroom1MainLightOffCheckMorning: 'False',
				bedroom1AmbientLightOnCheckMorning: 'False', bedroom1AmbientLightOffCheckMorning: 'False',
				hallLightOnCheckMorning: 'False', hallLightOffCheckMorning: 'False',
				bedroom2LightOnCheckMorning: 'False', bedroom2LightOffCheckMorning: 'False',
				bathroomLightOnCheckMorning: 'False', bathroomLightOffCheckMorning: 'False',
				hallHeaterOnCheckMorning: 'False', hallHeaterOffCheckMorning: 'False',
				lounge1HeaterOnCheckMorning: 'False', lounge1HeaterOffCheckMorning: 'False',
				lounge2HeaterOnCheckMorning: 'False', lounge2HeaterOffCheckMorning: 'False',
				hallLightOnCheckEvening: 'False', hallLightOffCheckEvening: 'False',
				kitchenMainLightOnCheckEvening: 'False', kitchenMainLightOffCheckEvening: 'False',
				kitchenAmbientLightOnCheckEvening: 'False', kitchenAmbientLightOffCheckEvening: 'False',
				loungeLightOnCheckEvening: 'False', loungeLightOffCheckEvening: 'False',
				bedroom1MainLightOnCheckEvening: 'False', bedroom1MainLightOffCheckEvening: 'False',
				bedroom1AmbientLightOnCheckEvening: 'False', bedroom1AmbientLightOffCheckEvening: 'False',
				hallLightOnCheckEvening: 'False', hallLightOffCheckEvening: 'False',
				bedroom2LightOnCheckEvening: 'False', bedroom2LightOffCheckEvening: 'False',
				bathroomLightOnCheckEvening: 'False', bathroomLightOffCheckEvening: 'False',
				hallHeaterOnCheckEvening: 'False', hallHeaterOffCheckEvening: 'False',
				lounge1HeaterOnCheckEvening: 'False', lounge1HeaterOffCheckEvening: 'False',
				lounge2HeaterOnCheckEvening: 'False', lounge2HeaterOffCheckEvening: 'False',
				hallLightOnCheckWeekend: 'False', hallLightOffCheckWeekend: 'False',
				kitchenMainLightOnCheckWeekend: 'False', kitchenMainLightOffCheckWeekend: 'False',
				kitchenAmbientLightOnCheckWeekend: 'False', kitchenAmbientLightOffCheckWeekend: 'False',
				loungeLightOnCheckWeekend: 'False', loungeLightOffCheckWeekend: 'False',
				bedroom1MainLightOnCheckWeekend: 'False', bedroom1MainLightOffCheckWeekend: 'False',
				bedroom1AmbientLightOnCheckWeekend: 'False', bedroom1AmbientLightOffCheckWeekend: 'False',
				hallLightOnCheckWeekend: 'False', hallLightOffCheckWeekend: 'False',
				bedroom2LightOnCheckWeekend: 'False', bedroom2LightOffCheckWeekend: 'False',
				bathroomLightOnCheckWeekend: 'False', bathroomLightOffCheckWeekend: 'False',
				hallHeaterOnCheckWeekend: 'False', hallHeaterOffCheckWeekend: 'False',
				lounge1HeaterOnCheckWeekend: 'False', lounge1HeaterOffCheckWeekend: 'False',
				lounge2HeaterOnCheckWeekend: 'False', lounge2HeaterOffCheckWeekend: 'False',
				pcOnCheckMorning: 'False', pcOffCheckMorning: 'False',
				pcOnCheckEvening: 'False', pcOffCheckEvening: 'False',
				pcOnCheckWeekend: 'False', pcOffCheckWeekend: 'False'};
		for (var key in checkboxes) {
			if ($('#' + key).is(':checked')) {
				checkboxes[key] = 'True';
			} else {
			}
		}
		var newDictionary = JSON.stringify(checkboxes);
		$.ajax({
			data : {
				action : $('#action2').val(),
				location : $('#location2').val(),
				mondayMorning : $('#monMor').val(),
				mondayEvening : $('#monEve').val(),
				mondayWeekend : $('#monWee').val(),
				tuesdayMorning : $('#tueMor').val(),
				tuesdayEvening : $('#tueEve').val(),
				tuesdayWeekend : $('#tueWee').val(),
				wednesdayMorning : $('#wedMor').val(),
				wednesdayEvening : $('#wedEve').val(),
				wednesdayWeekend : $('#wedWee').val(),
				thursdayMorning : $('#thuMor').val(),
				thursdayEvening : $('#thuEve').val(),
				thursdayWeekend : $('#thuWee').val(),
				fridayMorning : $('#friMor').val(),
				fridayEvening : $('#friEve').val(),
				fridayWeekend : $('#friWee').val(),
				saturdayMorning : $('#satMor').val(),
				saturdayEvening : $('#satEve').val(),
				saturdayWeekend : $('#satWee').val(),
				sundayMorning : $('#sunMor').val(),
				sundayEvening : $('#sunEve').val(),
				sundayWeekend : $('#sunWee').val(),
				morningLightLevel : $('#morningLightLevel').val(),
				eveningLightLevel : $('#eveningLightLevel').val(),
				weekendLightLevel : $('#weekendLightLevel').val(),
				checkboxSelection : newDictionary
			},
			type : 'POST',
			url : '/saveSchedule'
		});
		event.preventDefault();
	});
});

var scheduleMorningRoutineOptions = document.getElementById('scheduleMorningRoutineOptions');
var scheduleEveningRoutineOptions = document.getElementById('scheduleEveningRoutineOptions');
var scheduleWeekendRoutineOptions = document.getElementById('scheduleWeekendRoutineOptions');

$('#scheduleMorningRoutineOptionsPopup').hide();
$('#scheduleEveningRoutineOptionsPopup').hide();
$('#scheduleWeekendRoutineOptionsPopup').hide();

scheduleMorningRoutineOptions.onclick = function(){
	$('#scheduleMorningRoutineOptionsPopup').fadeIn();
};

scheduleEveningRoutineOptions.onclick = function(){
	$('#scheduleEveningRoutineOptionsPopup').fadeIn();
};

scheduleWeekendRoutineOptions.onclick = function(){
	$('#scheduleWeekendRoutineOptionsPopup').fadeIn();
};

scheduleMorningRoutineOptionsClose.onclick = function(){
	$('#scheduleMorningRoutineOptionsPopup').fadeOut();
};

scheduleEveningRoutineOptionsClose.onclick = function(){
	$('#scheduleEveningRoutineOptionsPopup').fadeOut();
};

scheduleWeekendRoutineOptionsClose.onclick = function(){
	$('#scheduleWeekendRoutineOptionsPopup').fadeOut();
};
