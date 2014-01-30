/*
 * Basic jQuery Slider plug-in
 *
 * http://www.sureshyalla.com
 *
 * Authored by srueshyalla
 * http://www.sureshyalla.com
 * @sureshyalla
 *
 * Copyright 2014, sursehyalla
 * License: GNU General Public License, version 3 (GPL-3.0)
 * http://www.opensource.org/licenses/gpl-3.0.html
 *
 */
;
(function ($) {

    "use strict";

    $.fn.slider = function (o) {
        var currentindex = 0;
        var defaults = {

            width: 700,
            height: 300,

            animtype: 'fade',
            animduration: 5000,
            animspeed: 2000,
            autotrans: true,

            showcontrols: true,
            nexttext: 'Next',
            prevtext: 'Prev',
            pagination: true,

            usecaption: true,
            randomstart: false


        }
        var settings = $.extend({}, defaults, o)
        var hoverpase = true;
        var clicking = true;
        var slider = $(this);
        var slides = $(this).find('li');
        var sizeof = $(this).find('li').size() - 1;
        setdefault()

        pagenationactive(0)

        function setdefault() {
            slider.css({
                width: settings.width,
                height: settings.height,
                position: 'relative',
				    overflow: 'hidden'
            });

            slider.find('ul').height(settings.height)
            slides.height(settings.height);
            
            if (settings.animtype == 'fade') {
			slider.find('li:gt(0)').hide();
                autoscroll();
            }else{
				slider.find('ul').width(slides.width()*(sizeof+1))
				slider.find('li').width(slides.width())
				slider.addClass('slideing-img')
				  autoscroll();
			}

            if (settings.showcontrols == true) {
                showcontrols()
            }
            if (settings.pagination == true) {
                showpagenation()
            }
        }
        var speedinc = 0;

        function fadetheslide() {

            if (hoverpase == true) {

                slider.find('li').eq(currentindex).fadeOut(settings.animspeed);
                slider.find('li').eq(currentindex + 1).fadeIn(settings.animspeed);
                pagenationactive(currentindex + 1)
                currentindex++;
                if (currentindex >= sizeof) {
                    currentindex = -1;
                }
            }
        }
		var animatelist=0;
         function slideshowanim() {
			  
        
            if (hoverpase == true) {
				animatelist++;
            slider.find('ul').animate({left:-slides.width()*animatelist })
               
                pagenationactive(currentindex + 1)
                currentindex++;
                if (currentindex >= sizeof) {
                    currentindex = -1;
                }
				 if (animatelist >= sizeof) {
                    animatelist =-1;
                }
            }
        }
        function pagenationactive(page) {
            slider.find('.pagenation a').removeClass('active')
            slider.find('.pagenation a').eq(page).addClass('active')
        }
        slider.hover(function () {
            hoverpase = false;
            clicking = true;

        }, function () {
            if (clicking == true) {
                hoverpase = true;

            }
        })

        function autoscroll() {

            speedinc++;
            var speed = (speedinc > 0) ? settings.animspeed + settings.animduration : settings.animduration;
			 if (settings.animtype == 'fade') {
            var auto = setInterval(fadetheslide, speed);
			 }else{
			
			var auto = setInterval(slideshowanim, speed);
			 }

        }

        function showcontrols() {
            var controls = '<div class="controls"><a href="#prev" class="prev-link">' + settings.prevtext + '</a><a href="#next" class="next-link">' + settings.nexttext + '</a></div>'
            slider.append(controls)
            
        }

        function showpagenation() {
            var pagenation = '<div class="pagenation">';
            for (var i = 0; i < sizeof + 1; i++) {
                pagenation += '<a href="#' + i + '"></a>'
            }
            pagenation += "</div>";
            slider.append(pagenation)
			 slider.find('.pagenation a').eq(0).addClass('active')
          clickbutton()
        }
        function clickbutton()
		{
			
        slider.find('a').live('click', function (e) {
                e.preventDefault();
                var slideurl = $(this).attr('href').replace('#', '')
                imagefunction(slideurl)


       })
		}
        function imagefunction(direct) {
            hoverpase = false;
            clicking = false;

            if (direct == 'prev') {

                fadeanimation(currentindex - 1)
                currentindex--;

                pagenationactive(currentindex)
                if (currentindex <= -1) {
                    currentindex = sizeof;
                }
            } else if (direct == 'next') {

                fadeanimation(currentindex + 1)

                currentindex++;
                pagenationactive(currentindex)
                if (currentindex >= sizeof) {
                    currentindex = -1;
                }
            } else {
                pagenationactive(direct)
                fadeanimation(direct)

                currentindex = direct - 1;

            }

            function fadeanimation(animatslide) {
                slider.find('li').fadeOut(settings.animspeed);
                slider.find('li').eq(animatslide).fadeIn(settings.animspeed, function () {
                    hoverpase = true;
                });
            }
			
			function slideanimation(animatslide) {
                slider.find('li').fadeOut(settings.animspeed);
                slider.find('li').eq(animatslide).fadeIn(settings.animspeed, function () {
                    hoverpase = true;
                });
            }


        }
       

    }
	
	 

})(jQuery);