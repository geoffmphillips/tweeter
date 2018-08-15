function createArticle() {
  const $output = $("<article>");
  $output.attr("class", "all-tweets")
  $output.attr("id", "all-tweets")
  return $output;
}

function createHeader(userdata) {
  const $output = $("<header>");

  const $img = $("<img>");
  $img.attr("src", `${userdata.avatars.small}`);
  $img.attr("alt", `${userdata.name}`);

  const $username = $(`<h3>${userdata.name}</h3>`);
  const $handle = $(`<p>${userdata.handle}</p>`);

  $output.append($img[0]);
  $output.append($username[0]);
  $output.append($handle[0]);

  return $output;
}

function createFooter(timestamp) {
  const $output = $("<footer>");
  // Time is initially milliseconds since 1970. Find difference in milliseconds than convert milliseconds to days
  const currentMilliseconds = new Date().getTime();
  const timeDifference = currentMilliseconds - timestamp;
  const daysAgo = Math.floor(timeDifference / 1000 / 60 / 60 / 24);
  const $time = $(`<p>${daysAgo} days ago</p>`)

  $output.append($time[0]);

  const $iconLike = $("<img>");
  $iconLike.attr("src", "images/like.png");
  $iconLike.attr("atl", "Like this tweet");

  const $iconRetweet = $("<img>");
  $iconRetweet.attr("src", "images/retweet.png");
  $iconRetweet.attr("atl", "Retweet this tweet");

  const $iconFlag = $("<img>");
  $iconFlag.attr("src", "images/flag.png");
  $iconFlag.attr("atl", "Flag this tweet as inappropriate");

  $output.append($iconFlag[0]);
  $output.append($iconRetweet[0]);
  $output.append($iconLike[0]);

  return $output;
}

function createTweetElement(data) {
  const $output = createArticle();
  const $header = createHeader(data.user);
  const $content = $(`<p>${data.content.text}</p>`);
  const $footer = createFooter(data.created_at);

  $output.append($header[0]);
  $output.append($content[0]);
  $output.append($footer[0]);

  return $output;
}

const tweetData = {
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
}

var $tweet = createTweetElement(tweetData);

console.log($tweet)
