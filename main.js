$(document).ready(function(){

  /*Twitter button script*/
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function(f) {
    t._e.push(f);
    };
    return t;
  }(document, "script", "twitter-wjs"));

  /*Fetch and display quote when button is clicked*/
  $("#getMessage").on("click", function(){
    getQuote();
  });

});

function getQuote() {

      $.ajax({
      		url: 'http://api.forismatic.com/api/1.0/',
      		jsonp: 'jsonp',
      		dataType: 'jsonp',
      		data: {
        		method: 'getQuote',
        		lang: 'en',
        		format: 'jsonp',
      		}
        })

	.done(function (data) {

    var fullResult = JSON.stringify(data);
    //fullResult = fullResult.replace(/"/g,"");
    var actualQuote = data.quoteText;
    var author = data.quoteAuthor;
    var linkToSource = data.quoteLink;

    $("#fullResult").html(fullResult);
    $("#actualQuote").html(actualQuote);
    $("#author").html(author);
    //$("#linkToSource").html(linkToSource);
    //$("#linkToSource").attr("href", linkToSource);

    //To be used to update the tweetText if user decides to tweet the Random Quote.
    var tweetText = actualQuote + " - " + author;

    /**************************************************************************

    To prepopulate the tweet with the random quote, the text in the twitter
    iframe needs to be changed to the quote text:

    Step 1. remove existing twitter iframe (including the <a></a> markup)
    Step 2. Reinsert the markup into the DOM with the fresh quote text
    Step 3. Reload the twitter widget
    Now if user wants to tweet, tweet will be prepopulated with the quote!

    ***************************************************************************/

    //Step 1:
    $("#tweetBtn iframe").remove();
    //Step 2:
    var tweetBtn = $("<a></a>")
    .addClass("twitter-share-button")
    .attr("href", "https://twitter.com/share")
    .attr("data-size", "large")
    .attr("data-text", tweetText);
    $("#tweetBtn").append(tweetBtn);
    //Step 3:
    twttr.widgets.load();
	})

	.fail(function(err){
		alert("Please try again!");
	});
};
