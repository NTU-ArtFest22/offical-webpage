$(document).ready(function() {
  var grid = UIkit.grid($("#project-grid"), {
    animation: true,
    duration: 500,
    gutter: 20,
    controls: '#project-filter'
  });
});
(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-68973533-5', {
  'allowAnchor': true
});
ga('send', 'pageview');
$('#projects').hide();
$('#project-loading').show();
$(window).on("load", function() {
  $('#projects').show();
  $('#project-loading').hide();
  var grid = UIkit.grid($("#project-grid"), {
    animation: true,
    duration: 500,
    gutter: 20,
    controls: '#project-filter'
  });

  function removeHash() {
    var scrollV, scrollH, loc = window.location;
    if ("pushState" in history)
      history.pushState("", document.title, loc.pathname + loc.search);
    else {
      scrollV = document.body.scrollTop;
      scrollH = document.body.scrollLeft;
      loc.hash = "";
      document.body.scrollTop = scrollV;
      document.body.scrollLeft = scrollH;
    }
  }
  $('.uk-modal').on({
    'show.uk.modal': function() {
      ga('send', 'event', 'Projects', this.id);
      window.location.hash = this.id;
    },
    'hide.uk.modal': function() {
      removeHash()
    }
  });
  $('[slow-scroll]').on('click', function(e) {
    that = this
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('target')).offset().top + 'px'
    }, 1000, 'swing');
    setTimeout(function() {
      window.location.hash = $(that).attr('target');
    }, 1000);
  });
  var hash = window.location.hash;
  if (hash) {
    if ($('.uk-modal' + hash).length !== 0) {
      jQuery.UIkit.modal('.uk-modal' + hash).show();
    }
    if ($('[slow-scroll]' + hash).length !== 0) {
      $('html, body').animate({
        scrollTop: $(hash).offset().top + 'px'
      }, 1000, 'swing');
    }
  }
})
