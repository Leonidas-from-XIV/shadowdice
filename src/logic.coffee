ShadowDice =
  calculateEyes: (dice, explode) ->
    result =
      successes: 0
      ones: 0
      glitch: false
      critical: false
      
    for remaining in [dice...0]
      rolled = ShadowDice.randRange(1, 6);
      console.log remaining
      switch remaining
        when 5 then result.successes++
        when 6
          result.successes++
          remaining++ if explode
        when 1 then result.ones++
      
      console.log "Successes", result.successes, "ones", result.ones, "dice", dice
  
  randRange: (min, max) ->
    range = max + 1 - min;
    Math.floor(Math.random() * range + min);
    
  roll: ->
    alert "yei"

$ ->
  $("#parameter-configuration").submit ShadowDice.roll
