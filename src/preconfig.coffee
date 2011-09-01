$(document).bind 'mobileinit', ->
  # disable AJAX on forms, otherwise binding to submit breaks
  $.extend $.mobile, ajaxFormsEnabled: false

# create our own log function stub if unavailable
#(window.console = log: ->) if window.console?
