$(function() {
  function updateCounterColor(target, count) {
    if (count < 0) {
      target.css( { "color": "red", "font-weight": "bold" })
    }
    if (count >= 0) {
      target.css( { "color": "#244751", "font-weight": "normal" } )
    }
  }

  $("textarea").on("keyup", function(event) {
    var currentLength = $(this).val().length;
    var counter = $($(this).siblings(".counter")[0]);
    var maxChars = 140;
    var charCount = maxChars - currentLength;
    counter.html(charCount);

    updateCounterColor(counter, charCount);
  });
});
