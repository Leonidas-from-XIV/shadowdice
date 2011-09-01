(function() {
  var ShadowDice;
  ShadowDice = {
    calculateEyes: function(dice, explode) {
      var remaining, result, rolled;
      result = {
        successes: 0,
        ones: 0,
        glitch: false,
        critical: false
      };
      for (remaining = dice; dice <= 0 ? remaining < 0 : remaining > 0; dice <= 0 ? remaining++ : remaining--) {
        rolled = ShadowDice.randRange(1, 6);
        console.log(remaining);
        switch (remaining) {
          case 5:
            result.successes++;
            break;
          case 6:
            result.successes++;
            if (explode) {
              remaining++;
            }
            break;
          case 1:
            result.ones++;
        }
      }
      console.log("Successes", result.successes, "ones", result.ones, "dice", dice);
      return result;
    },
    randRange: function(min, max) {
      var range;
      range = max + 1 - min;
      return Math.floor(Math.random() * range + min);
    },
    roll: function() {
      var computed, dice, explode;
      dice = parseInt($("#dice-number").val(), 10);
      explode = $("#explode").val() === "on";
      ShadowDice.playRoll();
      computed = ShadowDice.calculateEyes(dice, explode);
      console.log(computed);
      return false;
    },
    playRoll: function() {
      return ShadowDice.play($("#roll-dice-jingle"));
    },
    play: function(audio) {
      var html5audio;
      html5audio = !!(document.createElement('audio').canPlayType);
      if (html5audio) {
        return audio[0].play();
      }
    },
    displayValues: function(result) {
      var dialog, showResults;
      dialog = $(".notification:visible");
      showResults = function() {
        var element;
        if (result.glitch) {
          element = $(".error");
        } else {
          element = $(".success");
        }
        element.text(ShadowDice.formatValues(result));
        return element.fadeIn();
      };
      if (dialog.length) {
        return dialog.fadeOut(void 0, showResults);
      } else {
        return showResults();
      }
    }
  };
  $(function() {
    return $("#parameter-configuration").submit(ShadowDice.roll);
  });
}).call(this);
