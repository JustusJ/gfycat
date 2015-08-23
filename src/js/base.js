var url = "https://www.reddit.com/r/$$$/search.json?q=site%3Agfycat.com&sort=new&restrict_sr=on&t=all&limit=100&jsonp=?";

var x = "cumsluts+cumfetish+cumcoveredfucking+amateurcumsluts+before_after_cumsluts+throatpies+cumonclothes+CumSwap+OhCumOn+CumAgain+cumplay_gifs+RedditorCum+CumOnGlasses+IsThatCUM+teensexcum+FakeCum+girlslickingcum+prematurecumshots+World_of_cum+ManMilk";
var x2 = "deepthroat+Throatfucking+gag_spit+DeepThroatTears";

var gfycatBase = "http://giant.gfycat.com/$$$.mp4";

function extractGfycatId(u) {
  return u.match(/\/([^\/]+)$/)[1];
}

function updatePosts(posts) {
  $(".Container").empty();
  var fragment = $(document.createDocumentFragment());
  posts.forEach(function(child) {
    var id = extractGfycatId(child.data.url);
    var i = $("<img>").attr("src", child.data.thumbnail);
      var a = $("<a>").attr("href", gfycatBase.replace("$$$", id)).text(child.data.title);
    var r = child.data;
    var c = $("<div>").append(i).append(a);
    fragment.append(c);
  });
  $(".Container").append(fragment);
}

id_cache = {};

var u = url.replace("$$$", x2);

$.getJSON(u).done(function(d) {
  updatePosts(d.data.children);
});
