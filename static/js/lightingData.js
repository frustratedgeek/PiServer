$(function (){

	function lightsDataStatus(){
		var url = '/lightsStatus';
		var data = {_: new Date().getTime()};
		$.getJSON(url, data, function(result){
			JSON.stringify(result);

			if (result.items[0] == 'on') {
				bathroomLightShape.style.fill='yellow';
			} else {
				bathroomLightShape.style.fill='none';
			}

			if (result.items[1] == 'on') {
				loungeLightShape.style.fill='yellow';
			} else {
				loungeLightShape.style.fill='none';
			}

			if (result.items[2] == 'on') {
				bedroomLightCircle.style.fill='yellow';
			} else {
				bedroomLightCircle.style.fill='none';
			}

			if (result.items[3] == 'on') {
				bedroomLightShape.style.fill='yellow';
			} else {
				bedroomLightShape.style.fill='none';
			}

			if (result.items[4] == 'on') {
				spareLightShape.style.fill='yellow';
			} else {
				spareLightShape.style.fill='none';
			}

			if (result.items[5] == 'on') {
				kitchenLightShape.style.fill='yellow';
			} else {
				kitchenLightShape.style.fill='none';
			}

			if (result.items[6] == 'on') {
				hallLightShape.style.fill='yellow';
			} else {
				hallLightShape.style.fill='none';
			}



		});
	}
	lightsDataStatus();
	setInterval(lightsDataStatus, 500);
});
