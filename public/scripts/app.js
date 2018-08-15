$(function() {

  const tweetData = [
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
    const $output = $("<article>")
      .addClass("all-tweets")
      .attr("id", "all-tweets");
    return $output;
  }

  function $createHeader(userdata) {
    const $output = $("<header>");

    const $img = $("<img>")
      .attr("src", `${userdata.avatars.small}`)
      .attr("alt", `${userdata.name}`);

    const $username = $(`<h3>${userdata.name}</h3>`);
    const $handle = $(`<p>${userdata.handle}</p>`);

    $output.append($img)
      .append($username)
      .append($handle);

    return $output;
  }

  function $createFooter(timestamp) {
    const $output = $("<footer>");
    
    const currentMilliseconds = new Date().getTime();
    const timeDifference = currentMilliseconds - timestamp;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const $time = $(`<p>${daysAgo} days ago</p>`)

    const $iconLike = $createIcon("like");
    const $iconRetweet = $createIcon("retweet");
    const $iconFlag = $createIcon("flag");

    $output.append($time)
      .append($iconLike)
      .append($iconRetweet)
      .append($iconFlag);

    return $output;
  }

  function $createIcon(iconName) {
    const $icon = $("<img>");
    $icon.attr("class", "icons")
      .attr("src", "images/" + iconName + ".png")
      .attr("alt", iconName + " this tweet");
    return $icon;
  }


  function createTweetElement(data) {
    const $output = $createArticle();
    const $header = $createHeader(data.user);
    const $content = $("<p>").text(data.content.text);
    const $footer = $createFooter(data.created_at);

    $output.append($header)
      .append($content)
      .append($footer);

    return $output;
  }

  function renderTweets(tweets) {
    tweets.forEach(tweet => {
      const tweetElement = createTweetElement(tweet);
      $("main.container").append(tweetElement);
    });
  }

  renderTweets(tweetData);

});
