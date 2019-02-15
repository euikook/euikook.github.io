 (function($){
   $(function(){

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.parallax');
      var instances = M.Parallax.init(elems, options);
    });

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.fixed-action-btn');
      var instances = M.FloatingActionButton.init(elems, options);
    });  

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.tap-target');
      var instances = M.TapTarget.init(elems, options);
    });

     // $('.button-collapse').sideNav();
     $('.fixed-action-btn').floatingActionButton({direction: 'left', hoverEnabled: false});
     $('.parallax').parallax();
     $('.collapsible').collapsible();
     $('.carousel.carousel-slider').carousel({fullWidth: true});
     $('.materialboxed').materialbox();
     $('.scrollspy').scrollSpy();
     $('.tap-target').tapTarget();

     if (localStorage.getItem('cookieconsent') === 'true') {
       $('#cookies').hide()
     }

     jQuery('#cookies').on('click', function(event) {
            localStorage.setItem('cookieconsent', 'true')
            jQuery('#cookies').toggle('hide');
       });

   }); // end of document ready
 })(jQuery);
