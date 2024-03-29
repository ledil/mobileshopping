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
	
	var createTab_product_infos = function(div) {
		var div_picture = jQuery('<div class="picture"><img src="" /></div>');
		var fields = jQuery('\
			<div class="field">\
				<label>Bildlink</label> \
				<input type="text" name="picturelink" value="" placeholder="Link zum Produktbild" /> \
			</div> \
			<div class="field">\
				<label>Titel</label> \
				<input type="text" name="title" value="" placeholder="Produkttitel" /> \
			</div> \
			<div class="field">\
				<label>Subtitel</label> \
				<input type="text" name="subtitle" value="" placeholder="Produkt Subtitel" /> \
			</div> \
			<div class="field">\
				<label>Kurzbeschreibung</label> \
				<textarea name="Kurzbeschreibung" placeholder="Kurzbeschreibung" /></textarea> \
			</div> \
			<div class="field">\
				<label>Beschreibung</label> \
				<textarea name="Beschreibung" placeholder="Beschreibung" /></textarea> \
			</div> \
			<div class="field">\
				<label>Preis</label> \
				<input type="text" name="price" value="" placeholder="Produkt Preis" /> \
			</div> \
			<div class="field">\
				<label>Preisinfo</label> \
				<input type="text" name="priceinfo" value="" placeholder="Produkt Preisinfo" /> \
			</div> \
		</div>');
		div.append(div_picture);
		div.append(fields);
	};
	
	var createTabs = function() {
		var i = 1;
		while (true) {
			var h1 = jQuery('<h1>').text(tabs[i]).css({
				display: "block",
				background: "#efefef",
				"font-size": "17px",
				padding: "10px",
				color: "#aaa",
				margin: "0",
				"border-bottom": "1px solid #fff",
				"padding-left": "30px",
				cursor : "pointer"
			}).attr('tabindex',i).click(function() {
				var last_h1 = $('#ma-mshopping h1.expanded');
				var prior_tabindex = last_h1.attr('tabindex');
				last_h1.removeClass('expanded');
				var tabindex = $(this).attr('tabindex');
				$(this).addClass('expanded');
				$('#ma-mshopping #tab_'+prior_tabindex).hide();
				$('#ma-mshopping #tab_'+tabindex).show();
			});
			if (i == 1) {
				h1.addClass('expanded');
				var div = jQuery('<div class="tabs" id="tab_'+i+'">');
			} else {
				var div = jQuery('<div class="tabs" id="tab_'+i+'" style="display:none;">');			
			}
			
			/* all tabs */
			switch (i) {
				case 1 : {
					createTab_product_infos(div);
					break;
				}
			}
			jQuery('#ma-mshopping div#tabs').append(h1);
			jQuery('#ma-mshopping div#tabs').append(div);
			i += 1;
			if (typeof(tabs[i]) == 'undefined') break;
		};
	};
	
	waterfall([
		// Load jQuery
		function(next) {
			var css = document.createElement("style");
			css.type = "text/css";
			document.getElementsByTagName("head")[0].appendChild(css);
			$(css).html('\
				#ma-mshopping {\
					text-align:left;\
				}\
				#ma-mshopping #tabs {\
					float:none;\
				}\
				#ma-mshopping div.tabs { \
					padding:10px; \
				}\
				#ma-mshopping div.field { \
					overflow:hidden; \
					padding-bottom:10px;\
				}\
				#ma-mshopping div.field label { \
					display:block; \
					font-weight:bold;\
					padding-bottom:5px;\
				}\
				#ma-mshopping div.field input { \
					display:block; \
					width:320px;\
				}\
				#ma-mshopping div.field textarea { \
					display:block; \
					width:318px;\
				}\
				#ma-mshopping div.tabs p { \
					color:#888; \
					font-weight:normal;\
				}\
			');

			var script = document.createElement("script");
			script.src = "http://jscrollpane.kelvinluck.com/script/jquery.jscrollpane.min.js";
			script.onload = next;
			document.getElementsByTagName("head")[0].appendChild(script);
			
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
			jQuery("#ma-mshopping").remove();
			jQuery(document.body).append('<div id="ma-mshopping" style="padding: 0px; background:#fff; position: fixed; top: 10px; right: 10px; z-index: 999999999;width:350px;overflow:hidden;height:660px;-webkit-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);border:1px solid #efefef;"><div id="tabs"></div></div>');
			createTabs();
		}
	]);
})(window);  