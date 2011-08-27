/*
 * this needs to be loaded before jQuery Mobile, to allow configuration
 */

$(document).bind("mobileinit", function() {
  /* disable AJAX on forms, otherwise binding to submit breaks */
  $.extend($.mobile, {
    ajaxFormsEnabled: false
  });
});

/* firebug "emulation" */
if (typeof console === "undefined") {
  var console = { log: function() {} };
}
