document.getElementById('hallHeaterShape').onclick = function(){
	$.ajax({url:'/heaterSwitch/hall', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

document.getElementById('kitchenHeaterShape').onclick = function(){
	$.ajax({url:'/heaterSwitch/kitchen', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

document.getElementById('spareHeaterShape').onclick = function(){
	$.ajax({url:'/heaterSwitch/bedroom2', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

document.getElementById('bedroomHeaterShape').onclick = function(){
	$.ajax({url:'/heaterSwitch/bedroom1', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

document.getElementById('loungeHeaterShape').onclick = function(){
	$.ajax({url:'/heaterSwitch/lounge', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

document.getElementById('bathroomHeaterShape').onclick = function(){
	$.ajax({url:'/heaterSwitch/bathroom', type:'POST'}).done(function(data) {});
	event.preventDefault();
};

$(function() {
	$('#heater0Form').on('submit', function(event) {
		$.ajax({url:'/heaterSwitch/allSwitch', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});
	$('#heater1Form').on('submit', function(event) {
		$.ajax({url:'/heaterSwitch/allOn', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});
	$('#heater2Form').on('submit', function(event) {
		$.ajax({url:'/heaterSwitch/allOff', type:'POST'}).done(function(data) {});
		event.preventDefault();
	});
});
