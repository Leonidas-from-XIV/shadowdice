$(document).bind 'mobileinit', ->
  # disable AJAX on forms, otherwise binding to submit breaks
  $.extend $.mobile ajaxFormsEnabled: false

(console = log: ->) if console?