function updateCounterColor(count, countText) {
  if (countText.innerHTML < 0) {
    count.css( { "color": "red" })
  }
  if (countText.innerHTML >= 0) {
    count.css( { "color": "#244751" } )
  }
}

$(document).ready(function() {
  let input = $("textarea").on("keydown", function(event) {
    let stringLength = $(this).val().length;
    let counter = $(this).parent().children(".counter");
    let counterText = counter[0];
    let counterStart = 140;
    counterText.innerHTML = counterStart - stringLength;

    updateCounterColor(counter, counterText);
  });
});
