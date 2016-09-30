/*
 * https://learn.$.com/plugins/basic-plugin-creation/
 */
 
(function ( $ ) {
        
    var itemsInPager = [];
    var serial = 0;
    
    $.fn.addPager = function( options ) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // Pager settings
            wrapperId: 'pager-wrapper',
            itemPerPage: 5,
            // Nav defaults
            navTextLess: 'prev',
            navTextMore: 'more',
            navColor: "#333",
            navBackgroundColor: '#eee',
            navAlign: 'center',
            navButtonMargin: '0 .2em'
            }, options );
        
        var itemOnScreen = settings.itemPerPage;

        this.each( function(i) {
            $(this).attr('id','img-id' + i);
            id = $(this).attr('id');
            caption = $(this).find('.caption');
            $(caption).text(id);
            itemsInPager.push(id);
        });

        //init
        setUpNavigation();
        setUpPager(itemsInPager,itemOnScreen,serial);

        //lapoz
        $('#pager-more').click(function(e){
            e.preventDefault();
            serial++;
            setUpPager(itemsInPager,itemOnScreen,serial);
        });
        $('#pager-less').click(function(e){
            e.preventDefault();
            serial--;
            setUpPager(itemsInPager,itemOnScreen,serial);
        });

        function setUpPager(array, seen, serial){
            s = parseInt(serial)+1;
            more = s > 0 ? s*seen : seen;
            if(array.length > seen){
                
                // toggle nav buttons
                if (s < array.length/seen ) {
                    $('#pager-more').show();
                } else
                    $('#pager-more').hide();
                if (s > 1) {
                    $('#pager-less').show();
                } else
                    $('#pager-less').hide();
                
                // loop over itemsInPager
                $.each(itemsInPager, function(i){
                    if (more - i > 0) {
                        $('#'+itemsInPager[i]).show();
                    } else {
                        $('#'+itemsInPager[i]).hide();
                    }
                    if ((i - (seen*serial)) < 0) {
                        $('#'+itemsInPager[i]).hide();
                    }
                });
            }
        }

        function setUpNavigation(){
            var pagerNav = '<nav id="pager-nav"><button id="pager-less"></button><button id="pager-more"></button></nav>';
            $('#'+settings.wrapperId).append(pagerNav);

            $('#pager-nav').css({
                textAlign: settings.navAlign
            })
            $('#pager-nav button').css({
                color: settings.navColor,
                backgroundColor: settings.navBackgroundColor,
                margin: settings.navButtonMargin
            });
            $('#pager-less').text(settings.navTextLess);
            $('#pager-more').text(settings.navTextMore);
        }

    };
}( $ ));