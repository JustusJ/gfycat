var url = "https://www.reddit.com/r/$$$/search.json?q=site%3Agfycat.com&sort=new&restrict_sr=on&t=all&limit=100&jsonp=?";

var x = "cumsluts+cumfetish+cumcoveredfucking+amateurcumsluts+before_after_cumsluts+throatpies+cumonclothes+CumSwap+OhCumOn+CumAgain+cumplay_gifs+RedditorCum+CumOnGlasses+IsThatCUM+teensexcum+FakeCum+girlslickingcum+prematurecumshots+World_of_cum+ManMilk";
var x2 = "deepthroat+Throatfucking+gag_spit+DeepThroatTears";



var gfycatBases = ["http://giant.gfycat.com/$$$.mp4", "http://fat.gfycat.com/$$$.mp4", "http://zippy.gfycat.com/$$$.mp4"];

function extractGfycatId(u) {
  return u.match(/\/([^\/]+)$/)[1];
}

$(function() {
  var postTemplate = $("#post").html();
  Mustache.parse(postTemplate);

  var videoTemplate = $("#video").html();
  Mustache.parse(videoTemplate);

  $(document).on("click", "[data-gfycatid]", function() {
    $(".Video").empty();
    var e = $(this);
    var urls = gfycatBases.map(function(base) {
      var url = base.replace("$$$", e.data("gfycatid"));
      return {url: url};
    });
    var r = Mustache.render(videoTemplate, {urls: urls});
    $(".Video").append(r);
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

  id_cache = {};

  var u = url.replace("$$$", x2);
  $.getJSON(u).done(function(d) {
    updatePosts(d.data.children);
  });  
});
