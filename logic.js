/* pollute the namespace with as few names as possible */
var ShadowDice = {};

ShadowDice.calculate_eyes = function (dice, explode) {
  var result = {
    successes: 0,
    ones: 0,
    glitch: false,
    critical: false
  };
  result.successes = 0;
  result.ones = 0;

  for (var remaining = dice; remaining > 0; remaining--) {
    var rolled = ShadowDice.randrange(1, 6);
    if (rolled === 5) {
      result.successes += 1;
    } else if (rolled === 6) {
      result.successes += 1;
      if (explode) {
        remaining += 1;
      }
    } else if (rolled === 1) {
      result.ones += 1;
    }
  }

  console.log("Successes", result.successes, "ones", result.ones, "dice", dice);

  if (result.ones > (dice / 2)) {
    result.glitch = true;
    result.critical = !!result.successes;
  }
  console.log("Glitch", result.glitch, "critical", result.critical);

  return result;
};

ShadowDice.roll = function () {
  var dice = parseInt($("#dice-number").val(), 10);
  var explode = $("#explode").val() === "on";

  var computed = ShadowDice.calculate_eyes(dice, explode);
  ShadowDice.display_values(computed);

  /* do not allow submit */
  return false;
};

ShadowDice.display_values = function (result) {
  /* get the previous div with the results */
  var dialog = $(".notification:visible");
  /* a function that fades in the current result */
  var showResults = function () {
    var element;

    if (result.glitch) {
      element = $(".error");
    } else {
      element = $(".success");
    }
    element.text(ShadowDice.format_values(result));
    element.fadeIn();
  };

  /* if there was a previous result, fade it out before, otherwise just fade
   * in, without any preprocessing. solves "double fadeIn"-bug */
  if (dialog.length) {
    dialog.fadeOut(undefined, showResults);
  } else {
    showResults();
  }
};

ShadowDice.format_values = function (result) {
  var successes = result.successes === 1 ? "success" : "successes";
  var ones = result.ones === 1 ? "one" : "ones";

  var message = result.successes.toString() + " " + successes + " rolled.";
  if (result.glitch) {
    message += " " + result.ones.toString() + " " + ones + " rolled, therefore ";
    if (result.critical) {
      message += "critical";
    } else {
      message += "glitch";
    }
    message += ".";
  }
  return message;
};

ShadowDice.randrange = function (min, max) {
  var range = max + 1 - min;
  return Math.floor(Math.random() * range + min);
};

$(function () {
  // onload: bind calculation function to submit
  $("#parameter-configuration").submit(ShadowDice.roll);
});
