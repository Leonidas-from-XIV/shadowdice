function roll() {
  var dice = parseInt($("#dice-number").val(), 10);
  var explode = $("#explode").val() === "on" ? true : false;
  var successes = 0;
  var ones = 0;

  for (var remaining = dice; remaining > 0; remaining--) {
    var rolled = randrange(1, 6);
    if (rolled === 5) {
      successes += 1;
    } else if (rolled === 6) {
      successes += 1;
      if (explode) {
        remaining += 1;
      }
    } else if (rolled === 1) {
      ones += 1;
    }
  }

  console.log("Successes", successes, "ones", ones, "dice", dice);

  var glitch = false;
  var critical = false;
  if (ones > (dice / 2)) {
    glitch = true;
    critical = !successes ? true : false;
  }
  console.log("Glitch", glitch, "critical", critical);

  // do not allow submit
  return false;
}

function randrange(min, max) {
  var range = max + 1 - min;
  return Math.floor(Math.random() * range + min);
}

$(function () {
  // onload: bind calculation function to submit
  $("#parameter-configuration").submit(roll);
});
