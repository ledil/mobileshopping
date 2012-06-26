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
			$("#ma-mshopping").remove();
			$(document.body).append('<div id="ma-mshopping" style="padding: 0px; background:#fff; position: absolute; top: 0px; right: 0px; z-index: 999999999;width:350px;height:660px"></div>');
			//console.log("test2");
			//next(null);
			//console.log("test3");
		}
	]);
})(window);  