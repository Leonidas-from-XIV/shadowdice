(function() {
  var console;
  $(document).bind('mobileinit', function() {
    return $.extend($.mobile({
      ajaxFormsEnabled: false
    }));
  });
  if (typeof console !== "undefined" && console !== null) {
    console = {
      log: function() {}
    };
  }
}).call(this);
