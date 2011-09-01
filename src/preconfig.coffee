$(document).bind 'mobileinit', ->
  # disable AJAX otherwise binding to submit breaks
  $.extend $.mobile, ajaxEnabled: false

# create our own log function stub if unavailable
#(window.console = log: ->) if window.console?
