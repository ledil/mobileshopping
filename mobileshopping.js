(function(window){
	var $;
  
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
		  if(window.jQuery) {
			//next(null);
			console.log("japp, da");
		  } else {
			console.log("huhu");
			var script = document.createElement("script");
			script.src = "http://code.jquery.com/jquery-1.7.1.min.js";
			script.onload = next;
			document.getElementsByTagName("head")[0].appendChild(script);
		  }
		},
	]);
})(window);  