
$('#switchOnPcButton').hide();
$('#switchOffPcButton').hide();
$('#pcStartingImage').hide();
$('#pcShuttingDownImage').hide();

$(function (){
	$('#pcPowerForm').on('submit', function(event) {
		if ($('#confirmPcPower').is(':checked')) {
			var confirmCheck = 'True';
		} else {
			var confirmCheck = 'False';
		}
		$.ajax({
			data : {
				appliance : 'PC',
				confirm : confirmCheck
			},
			type : 'POST',
			url : '/applianceSwitch'
		});
		event.preventDefault();
	});
});