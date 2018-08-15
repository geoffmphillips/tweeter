$(function() {

  var tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

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

  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      var tweetElement = createTweetElement(tweet);
      $("main.container").append(tweetElement);
    });
  }

  renderTweets(tweetData);

});
