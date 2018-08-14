function updateCounterColor(target, count) {
  if (count < 0) {
    target.css( { "color": "red", "font-weight": "bold" })
  }
  if (count >= 0) {
    target.css( { "color": "#244751", "font-weight": "normal" } )
  }
}

$(document).ready(function() {
  $("textarea").on("keydown", function(event) {
    const currentLength = $(this).val().length;
    const counter = $($(this).siblings(".counter")[0]);
    const maxChars = 140;
    const charCount = MaxChars - currentLength;
    counter.html(charCount);

    updateCounterColor(counter, charCount);
  });
});
