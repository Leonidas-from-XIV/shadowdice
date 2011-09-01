$(document).bind 'mobileinit', ->
  # disable AJAX on forms, otherwise binding to submit breaks
  $.extend $.mobile, ajaxFormsEnabled: false

# attach to window (browser) or exports (commonjs)
target = exports ? this
# create our own log function stub if unavailable
(target.console = log: ->) if console?
