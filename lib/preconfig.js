(function() {
  $(document).bind('mobileinit', function() {
    return $.extend($.mobile, {
      ajaxEnabled: false
    });
  });
}).call(this);
