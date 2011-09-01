ShadowDice =
  calculateEyes: (dice, explode) ->
    result =
      successes: 0
      ones: 0
      glitch: false
      critical: false
      
    for remaining in [dice...0]
      rolled = ShadowDice.randRange 1, 6
      console.log remaining
      switch remaining
        when 5 then result.successes++
        when 6
          result.successes++
          remaining++ if explode
        when 1 then result.ones++
      
    console.log "Successes", result.successes, "ones", result.ones, "dice", dice
    result
  
  randRange: (min, max) ->
    range = max + 1 - min
    Math.floor(Math.random() * range + min)
    
  roll: ->
    dice = parseInt $("#dice-number").val(), 10
    explode = $("#explode").val() == "on"
    ShadowDice.playRoll()
    computed = ShadowDice.calculateEyes dice, explode
    console.log computed
    ShadowDice.displayValues computed
    ShadowDice.playOutcome computed

    # do not allow submit
    false

  playRoll: ->
    ShadowDice.play $("#roll-dice-jingle")

  play: (audio) ->
    html5audio = !!(document.createElement('audio').canPlayType)
    audio[0].play() if html5audio
    # else phonegap fallback

  displayValues: (result) ->
    # get the previous div with the results */
    dialog = $ ".notification:visible"
    # a function that fades in the current result
    showResults = ->
      if result.glitch
        element = $ ".error"
      else
        element = $ ".success"
      element.text ShadowDice.formatValues result
      element.fadeIn()

    #if there was a previous result, fade it out before, otherwise just fade
    # in, without any preprocessing. solves "double fadeIn"-bug
    if dialog.length
      dialog.fadeOut undefined, showResults
    else
      showResults()

  formatValues: (result) ->
    successes = if result.successes == 1 then "success" else "successes"
    ones = if result.ones == 1 then "one" else "ones"

    message = result.successes.toString() + " " + successes + " rolled."
    if result.glitch
      message += " " + result.ones.toString() + " " + ones + " rolled, therefore "
      if result.critical
        message += "critical "
      message += "glitch."
    message

  playOutcome: (result) ->
    if result.glitch
      if result.critical
        ShadowDice.play $ "#critical-jingle"
      else
        ShadowDice.play $ "#glitch-jingle"

$ ->
  $("#parameter-configuration").submit ShadowDice.roll
