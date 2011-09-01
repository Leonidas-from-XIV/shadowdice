(function() {
  $(document).bind('mobileinit', function() {
    return $.extend($.mobile, {
      ajaxFormsEnabled: false
    });
  });
}).call(this);
