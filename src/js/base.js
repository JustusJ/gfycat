/*global $,Mustache,document,console,subreddit_lists*/
var redditBaseUrl = "https://www.reddit.com/r/$$$/search.json?q=site%3Agfycat.com&sort=new&restrict_sr=on&t=all&limit=100";

var gfycatBases = [
  "http://giant.gfycat.com/$$$.mp4", "http://fat.gfycat.com/$$$.mp4", "http://zippy.gfycat.com/$$$.mp4",
  "http://giant.gfycat.com/$$$.webm", "http://fat.gfycat.com/$$$.webm", "http://zippy.gfycat.com/$$$.webm"
];

function extractGfycatId(u) {
  var m = u.replace(/https?:\/\//, "").match(/\/([a-z]+)/i);
  return m[1];
}

function gfycatUrls(gfycatid) {
  return gfycatBases.map(function(base) {
    var url = base.replace("$$$", gfycatid);
    return {
      url: url
    };
  });
}

$(function() {
  var postTemplate = $("#template_post").html();
  Mustache.parse(postTemplate);
  var videoTemplate = $("#template_video").html();
  Mustache.parse(videoTemplate);
  var subredditLinkTemplate = $("#template_subreddit_link").html();
  Mustache.parse(subredditLinkTemplate);

  var videoContainer = $(".Video");

  function playVideo(gfycatid) {
    videoContainer.empty();
    var urls = gfycatUrls(gfycatid);
    var r = Mustache.render(videoTemplate, {
      urls: urls
    });
    videoContainer.append(r);
    videoContainer.find("video").get(0).play();
  }

  function updatePosts(posts) {
    $(".Container").empty();
    var fragment = $(document.createDocumentFragment());
    posts.forEach(function(child) {
      child.data.gfyCatId = extractGfycatId(child.data.url);
      var r = Mustache.render(postTemplate, child.data);
      fragment.append(r);
    });
    $(".Container").append(fragment);
  }
  
  function fetch(subreddits) {
    $(".Container").empty();
    var redditUrl = redditBaseUrl.replace("$$$", subreddits.join("+"));
    $.getJSON(redditUrl).done(function(d) {
      updatePosts(d.data.children);
    });
  }
  
  function fetchListIndex(index) {
    var subreddit_list = subreddit_lists.lists[index];
    fetch(subreddit_list.names);
  }
  
  function buildSubredditLinks() {
    var container = $(".Header");
    subreddit_lists.lists.forEach(function(l, i) {
      var r = Mustache.render(subredditLinkTemplate, {title: l.title, index: i});
      container.append(r);
    });
  }
  
  buildSubredditLinks();

  $(document).on("click", "[data-gfycatid]", function() {
    var e = $(this);
    playVideo(e.data("gfycatid"));
  });

  $(document).on("click", "[data-subreddit_list_index]", function() {
    var e = $(this);
    fetchListIndex(e.data("subreddit_list_index"));
  });

  $(document).on("click", "#video", function() {
    $(".Video").empty();
  });

  console.log(subreddit_lists);
  fetchListIndex(0);
});


//$.ajax({
//  url: "https://api.imgur.com/3/album/vYDuA",
//    headers:{ "Authorization": "Client-ID d7cd893ec8420c7"}
//}).done(function() {console.log(arguments)})