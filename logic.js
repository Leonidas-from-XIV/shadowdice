function calculate_eyes(dice, explode) {
  var result = {
    successes: 0,
    ones: 0,
    glitch: false,
    critical: false
  };
  result.successes = 0;
  result.ones = 0;

  for (var remaining = dice; remaining > 0; remaining--) {
    var rolled = randrange(1, 6);
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
    result.critical = !result.successes ? true : false;
  }
  console.log("Glitch", result.glitch, "critical", result.critical);

  return result;
}

function roll() {
  var dice = parseInt($("#dice-number").val(), 10);
  var explode = $("#explode").val() === "on" ? true : false;

  var computed = calculate_eyes(dice, explode);
  display_values(computed);

  // do not allow submit
  return false;
}

function display_values(result) {
  $(".notification").hide();

  var element;

  if (result.glitch) {
    element = $(".error");
  } else {
    element = $(".success");
  }
  element.text(format_values(result));
  element.show();
}

function format_values(result) {
  var message = result.successes.toString() + " successes rolled.";
  if (result.glitch) {
    message += " " + result.ones.toString() + " ones rolled, therefore ";
    if (result.critical) {
      message += "critical";
    } else {
      message += "glitch";
    }
    message += ".";
  }
  return message;
}

function randrange(min, max) {
  var range = max + 1 - min;
  return Math.floor(Math.random() * range + min);
}

$(function () {
  // onload: bind calculation function to submit
  $("#parameter-configuration").submit(roll);
});
