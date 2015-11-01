/*global $,Mustache,document,console*/
var redditBaseUrl = "https://www.reddit.com/r/$$$/search.json?q=site%3Agfycat.com&sort=new&restrict_sr=on&t=all&limit=100&jsonp=?";

var subreddits = [
  "deepthroat",
  "Throatfucking",
  "gag_spit",
  "DeepThroatTears"
];

subreddits = [
  "cumsluts",
  "cumfetish",
  "cumcoveredfucking",
  "amateurcumsluts",
  "before_after_cumsluts",
  "throatpies",
  "cumonclothes",
  "CumSwap",
  "OhCumOn",
  "CumAgain",
  "cumplay_gifs",
  "RedditorCum",
  "CumOnGlasses",
  "IsThatCUM",
  "teensexcum",
  "FakeCum",
  "girlslickingcum",
  "prematurecumshots",
  "World_of_cum",
  "ManMilk",
  "TrueBukkake",
  "CumFetish"
];

var gfycatBases = [
  "http://giant.gfycat.com/$$$.mp4", "http://fat.gfycat.com/$$$.mp4", "http://zippy.gfycat.com/$$$.mp4",
  "http://giant.gfycat.com/$$$.webm", "http://fat.gfycat.com/$$$.webm", "http://zippy.gfycat.com/$$$.webm"
];

function extractGfycatId(u) {
  return u.match(/\/([^\/]+)$/)[1];
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

  $(document).on("click", "[data-gfycatid]", function() {
    $(".Video").empty();
    var e = $(this);
    var urls = gfycatUrls(e.data("gfycatid"));
    var r = Mustache.render(videoTemplate, {
      urls: urls
    });
    $(".Video").append(r);
    $(".Video video").get(0).play();
  });

  $(document).on("click", "#video", function() {
    $(".Video").empty();
  });

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

  // var id_cache = {};

  console.log(subreddits);
  var redditUrl = redditBaseUrl.replace("$$$", subreddits.join("+"));
  $.getJSON(redditUrl).done(function(d) {
    console.log(d);
    updatePosts(d.data.children);
  });
});
