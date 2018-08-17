$(function() {
  function $createHeader(userdata) {
    var $output = $("<header>");

    var $img = $("<img>")
      .attr("src", userdata.avatars.small)
      .attr("alt", userdata.name);

    var $username = $("<h3>").text(userdata.name);
    var $handle = $("<p>").text(userdata.handle);

    $output.append($img)
      .append($username)
      .append($handle);

    return $output;
  }

  function $createFooter(timeOfTweet) {
    var $output = $("<footer>");

    var currentMilliseconds = new Date().getTime();
    // + 1000 to avoid displaying tweets that say they were posted -1 days ago
    var timeDifference = currentMilliseconds - timeOfTweet + 1000;
    var numOfDays = Math.round(timeDifference / (1000 * 60 * 60 * 24));
    var $time = $("<p>").text(numOfDays + " days ago");

    var $iconLike = $createIcon("like");
    var $iconRetweet = $createIcon("retweet");
    var $iconFlag = $createIcon("flag");

    $output.append($time)
      .append($iconLike)
      .append($iconRetweet)
      .append($iconFlag);

    return $output;
  }

  function $createIcon(iconName) {
    var $icon = $("<img>");
    $icon.attr("class", "icons")
      .attr("src", "images/" + iconName + ".png")
      .attr("alt", iconName + " this tweet");
    return $icon;
  }


  function createTweetElement(data) {
    var $output = $("<article>").addClass("all-tweets");
    var $header = $createHeader(data.user);
    var $content = $("<p>").attr("class", "tweet-content").text(data.content.text);
    var $footer = $createFooter(data.created_at);

    $output.append($header)
      .append($content)
      .append($footer);

    return $output;
  }

  function renderTweet(tweet) {
    var tweetElement = createTweetElement(tweet);
    $("#tweet-container").prepend(tweetElement);
  }

  function renderTweets(tweets) {
    tweets.forEach(renderTweet);
  }

  $.get("/tweets").done(function(tweets) {
    renderTweets(tweets);
  });

  $("form#create-new-tweet").on("submit", function(event) {
    event.preventDefault();

    var textArea = $(this).children("textarea");
    var tweetText = textArea.val();
    var data = textArea.serialize();
    var error = $(this).siblings(".error");
    var counter = textArea.siblings(".counter");

    if(error.text() !== "") {
      error.slideUp("fast");
    }

    if (tweetText === "" || tweetText === null) {
      error.text("Empty tweet! Please type a tweet before sending");
      error.slideDown("fast");
    } else if (tweetText.length > 140) {
      error.text("Tweet is too long! Tweets can only be 140 characters");
      error.slideDown("fast");
    } else {
      // Clears text area and resets counter to 140
      textArea.val("");
      counter.text(140);
      $.post("/tweets", data).done(function() {
        // Nesting HTTP requests like this is bad practice but in this assignment GET requests are how we get user data
        $.get("/tweets").done(function(tweets) {
          $("section#tweet-container").empty();
          renderTweets(tweets);
        });
      });
    }
  });

  $("div.toggle-button").on("click", function(event) {
    var sectionNewTweet = $("section.new-tweet");
    var autoFocus = sectionNewTweet.find("#auto-focus-on-toggle");
    sectionNewTweet.slideToggle("slow", function() {
      autoFocus.focus();
    });
  });
});
