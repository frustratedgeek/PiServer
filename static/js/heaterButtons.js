$(function() {

	$('#heater0Form').on('submit', function(event) {
		$.ajax({url:'/allHeatersSwitch', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});

	$('#heater1Form').on('submit', function(event) {
		$.ajax({url:'/heater1Switch', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});

	$('#heater2Form').on('submit', function(event) {
		$.ajax({url:'/heater2Switch', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});

	$('#heater3Form').on('submit', function(event) {
		$.ajax({url:'/heater3Switch', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});

	$('#heater4Form').on('submit', function(event) {
		$.ajax({url:'/heater4Switch', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});

	$('#heater5Form').on('submit', function(event) {
		$.ajax({url:'/heater5Switch', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});

	$('#heater6Form').on('submit', function(event) {
		$.ajax({url:'/heater6Switch', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});

	$('#heater7Form').on('submit', function(event) {
		$.ajax({url:'/heater7Switch', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});

	$('#heater8Form').on('submit', function(event) {
		$.ajax({url:'/heater8Switch', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});

});