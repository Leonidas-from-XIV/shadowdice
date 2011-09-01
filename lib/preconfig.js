(function() {
  var target;
  $(document).bind('mobileinit', function() {
    return $.extend($.mobile, {
      ajaxFormsEnabled: false
    });
  });
  target = typeof exports !== "undefined" && exports !== null ? exports : this;
  if (typeof console !== "undefined" && console !== null) {
    target.console = {
      log: function() {}
    };
  }
}).call(this);
