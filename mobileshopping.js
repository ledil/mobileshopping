(function(window){
/*	var $;*/
  
	// Run several asyncronous functions in order
	var waterfall = function(fxs){
		var runNext = function(){
		  if(fxs.length){
			fxs.shift().apply(null, Array.prototype.slice.call(arguments).concat([runNext]))
		  }
		}
		runNext();
	};
	
	var tabs = {
		'1':'Produkt Infos',
		'2':'Warenkorb',
		'3':'Benutzerkonto',
		'4':'Zusammenfassung',
		'5':'Versand',
		'6':'Zahlung',
		'7':'Bestätigung'
	};
	
	var createTabs = function() {
		var i = 1;
		while (true) {
			var h1 = $('<h1>').text(tabs[i]).css({
				display: "block",
				background: "#efefef",
				"font-size": "17px",
				padding: "10px",
				color: "#aaa",
				margin: "0",
				"border-bottom": "1px solid #fff",
				"padding-left": "30px",
				cursor : "pointer"
			});
			$('#ma-mshopping div#tabs').append(h1);
			i += 1;
			if (typeof(tabs[i]) == 'undefined') break;
		};
	};
  
	waterfall([
		// Load jQuery
		function(next) {
			if (typeof(jQuery) != "undefined") {
				next(null);
			} else {
				var script = document.createElement("script");
				script.src = "http://code.jquery.com/jquery-1.7.1.min.js";
				script.onload = next;
				document.getElementsByTagName("head")[0].appendChild(script);
			}
		},
		// create Iframe
		function(next) {
			$("#ma-mshopping").remove();
			$(document.body).append('<div id="ma-mshopping" style="padding: 0px; background:#fff; position: fixed; top: 10px; right: 10px; z-index: 999999999;width:350px;height:660px;-webkit-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);border:1px solid #efefef;"><div id="tabs"></div></div>');
			createTabs();
		}
	]);
})(window);  