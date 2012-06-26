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
			$("#w3c-nav-iframe").remove();
			$(document.body).append('<iframe id="w3c-nav-iframe" style="padding: 0px; position: absolute; top: 10px; right: 10px; z-index: 999999999;" frameborder="0" scrolling="no" width="350px" height="660px"></iframe>');
			console.log("test");
			$('#w3c-nav-iframe').attr('src', "https://raw.github.com/ledil/mobileshopping/master/main.html#");
			console.log("test2");
			next(null);
			console.log("test3");
		}
	]);
})(window);  