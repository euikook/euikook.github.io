(function($){
    var toTop = ($('#sidebar').height() - $(window).height()) + 60;
    // Caption
    $('.article-entry').each(function(i){
        $(this).find('img').each(function(){
            if ($(this).parent().hasClass('fancybox')) {
                return;
            }
            var alt = this.alt;
            if (alt) {
                $(this).after('<span class="caption">' + alt + '</span>');
            }

            $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
        });

        $(this).find('.fancybox').each(function(){
            $(this).attr('rel', 'article' + i);
        });
    });
    if ($.fancybox){
        $('.fancybox').fancybox();
    }

    // Profile card
    $(document).on('click', function () {
        $('#profile').removeClass('card');
    }).on('click', '#profile-anchor', function (e) {
        e.stopPropagation();
        $('#profile').toggleClass('card');
    }).on('click', '.profile-inner', function (e) {
        e.stopPropagation();
    });

    // To Top
    if ($('#sidebar').length) {
        $(document).on('scroll', function () {
            if ($(document).width() >= 800) {
                if(($(this).scrollTop() > toTop) && ($(this).scrollTop() > 0)) {
                    $('#toTop').fadeIn();
                    $('#toTop').css('left', $('#sidebar').offset().left);
                } else {
                    $('#toTop').fadeOut();
                }
            } else {
                $('#toTop').fadeIn();
                $('#toTop').css('right', 20);
            }
        }).on('click', '#toTop', function () {
            $('body, html').animate({ scrollTop: 0 }, 600);
        });
    }


    const shuffle = array => {
        let shuffled = [...array],
          currIndex = array.length,
          tempValue,
          randIndex
      
        while (currIndex) {
          randIndex = Math.floor(Math.random() * currIndex)
          currIndex--
      
          tempValue = shuffled[currIndex]
          shuffled[currIndex] = shuffled[randIndex]
          shuffled[randIndex] = tempValue
        }
        return shuffled
      }
      
      let termClouds = document.querySelectorAll('.term-cloud')

      for (let termCloud of termClouds) {
        if (termCloud) {
            let terms = termCloud.querySelectorAll('.term-cloud li')
            shuffle(terms).forEach(term => term.parentElement.appendChild(term))
        }
      }
})(jQuery);
