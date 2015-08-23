var url = "https://www.reddit.com/r/deepthroat+Throatfucking+gag_spit+DeepThroatTears/search.json?q=site%3Agfycat.com&sort=new&restrict_sr=on&t=all&limit=100&jsonp=?";
//var x = $.getJSON(url).done(function(d) { console.log(arguments); });
//console.log(x);


var a = $.ajax({
    url: url,
    jsonp : false,
    jsonpCallback: 'jsonCallback',
    dataType : 'jsonp',
    crossDomain: true
});
