
$(function (){
	function dateTime(){
		var now = new Date();
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var day = days[ now.getDay() ];
		var suffixes = ['th', 'st', 'nd', 'rd'];
		v = now.getDate()%100;
		suffix = suffixes[(v-20)%10]||suffixes[v]||suffixes[0];
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var month = months[ now.getMonth() ];
		var h = (now.getHours() < 10) ? ("0" + now.getHours()) : now.getHours();
		var m = (now.getMinutes() < 10) ? ("0" + now.getMinutes()) : now.getMinutes();
		var s = (now.getSeconds() < 10) ? ("0" + now.getSeconds()) : now.getSeconds();

		$('#timeNow').text(h + ":" + m + ":" + s);
		$('#dateNow').text(day + " " + now.getDate() + suffix + " " + month + " " + now.getFullYear());
	}
	dateTime();
	setInterval(dateTime, 1000);
});
