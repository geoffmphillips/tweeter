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

    if (tweetText === "" || tweetText === null) {
      alert("Empty tweet! Please type a tweet before sending")
    } else if (tweetText.length > 140) {
      textArea.val("");
      alert("Tweet is too long! Tweets can only be 140 characters")
    } else {
      textArea.val("");
      $.post("/tweets", data).done(function() {
        // if successfull
        // create a tweet object using the local data.
        // render that tweet

        // Not right, but idk the righ way. Sam's fault
        $.get("/tweets").done(function(tweets) {
          renderTweet(tweets[tweets.length - 1]);
        });
      });
    }
  });
});
