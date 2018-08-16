$(function() {

  function $createArticle() {
    var $output = $("<article>")
      .addClass("all-tweets")
      .attr("id", "all-tweets");
    return $output;
  }

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
    var timeDifference = currentMilliseconds - timeOfTweet;
    var numOfDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
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
    var $output = $createArticle();
    var $header = $createHeader(data.user);
    var $content = $("<p>").text(data.content.text);
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

    if(error.text() !== "") {
      error.slideUp("fast");
      error.text("");
    }

    if (tweetText === "" || tweetText === null) {
      error.text("Empty tweet! Please type a tweet before sending");
      error.slideDown("fast");
    } else if (tweetText.length > 140) {
      error.text("Tweet is too long! Tweets can only be 140 characters");
      error.slideDown("fast");
    } else {
      textArea.val("");
      $.post("/tweets", data).done(function() {
        // Not right, but idk the right way. Sam's fault
        $.get("/tweets").done(function(tweets) {
          renderTweet(tweets[tweets.length - 1]);
        });
      });
    }
  });

  $("div.toggle-button").on("click", function(event) {
    $("section.new-tweet").slideToggle("slow", function() {
      $("#auto-focus-on-toggle").focus();
      $("p.error").text("");

    });
  });
});
