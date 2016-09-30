var videok = [];
var videok_szama = 3;
var serial = 0;
var azonosito = '.pager-wrapper ul li';
jQuery(azonosito).each( function(i) {
	jQuery(this).attr('id','azon' + i);
	id = jQuery(this).attr('id');
	caption = jQuery(this).find('.caption');
	jQuery(caption).text(id);
	console.log('index: ' + i);
	videok.push(id);
});

console.log(videok);
//init
looper(videok,videok_szama,serial);
//lapoz
jQuery('#more').click(function(e){
	e.preventDefault();
	serial++;
	looper(videok,videok_szama,serial);
});
jQuery('#less').click(function(e){
	e.preventDefault();
	serial--;
	looper(videok,videok_szama,serial);
});
function looper(array, vidiszam, serial){
	console.log('looper init');
	s = parseInt(serial)+1;
	ujak = s > 0 ? s*vidiszam : vidiszam;
	// ha több a vidi mint a pager szám
	if(array.length > vidiszam){
		
		// show nav buttons
		if (s < array.length/vidiszam ) {
			jQuery('#more').show();
		} else
			jQuery('#more').hide();
		if (s > 1) {
			jQuery('#less').show();
		} else
			jQuery('#less').hide();
		
		// loop over videok
		jQuery.each(videok, function(i){
			if (ujak - i > 0) {
				jQuery('#'+videok[i]).show();
			} else {
				jQuery('#'+videok[i]).hide();
			}
			if ((i - (vidiszam*serial)) < 0) {
				jQuery('#'+videok[i]).hide();
			}
		});
	}
}