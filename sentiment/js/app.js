'use strict';

/* Your script goes here */
/*
var parseTweets = function(data) {
    data = JSON.parse(data);
    $.each($.parseJSON(data), function(idx, obj) {
	    alert(obj.id);
});
}

var parseTweets = function(inputJSON){
    var parsedJSON = JSON.parse(inputJSON)
    var filterArray = ["id","created_At","user.screen_name","text","entities.hashtags[i].text","retweet_count"]

    for(var i = 0;i< parsedJSON.length;++i){    
    for(var filterItem in filterArray){
        console.log(parsedJSON[i][filterArray[filterItem]])
    }
    }
}

});*/

//lodash three objects combine into one can search arrays .findIndex functionality 

//Step 1 parse tweets parseTweets() function through for loop see notes
function parseTweets(data){
    var tweets = [];
    //two functions for hashtag and tweets
    var getHash = function(hash){
        var hashtag = [];
        hash.forEach(function(getHash){
            hashtag.push(getHash);
        });
        return hashtag;
    }
    
    console.log(data);
    data.statuses.forEach(function(point) {
        var returned = {
            'id' : point.id,
            'created_at' : point.created_at,
            'screen_name' : point.user.screen_name,
            'text' : point.text,
            'hashtags' : getHash(point.entities.hashtags).join('#'),
            'retweet_count' : point.retweet_count,
            'sentiment_score': sentimentCalc(point.text)
        };
        tweets.push(returned);
    });
    console.log(tweets);
    return tweets;
};

/*
Your next step will be to calculate the sentiment of each tweet. 
This is defined as the sum of sentiments of the words in the tweet's text (words without a sentiment value defined in the _SENTIMENTS object should be given a value of 0).
/[^\w']/
data/sentiments-ucb.js
For each tweet, should take the calculated sentiment (e.g., the result of sentimentOf()) and assign it as a new property to the tweet object you created in Step 1, thereby giving that tweet a sentiment score that can be used later!
*/

function sentimentCalc(sentiment){
    //split
    var splitted = sentiment.split(/[^\w']/);
    var s = 0;
    splitted.forEach(function(input){
        if (typeof _SENTIMENTS[input.toLowerCase()] !=='undefined'){ 
            s+= _SENTIMENTS[input.toLowerCase()];
            }
    });
    console.log(s);
    return s;
};

//use function to sort through and compare? 
function sortSent(toSort){
    [].slice.call(toSort).sort(function(first, second){
        return first.sentiment_score - second.sentiment_score;
    });
};

///below is function to show tweets
//use <table>
/*
You can test that this works by calling your showTweets() method and passing it the results of your parseTweets() function. And you should see the list of tweets show up on the page!
*/

function showTweets(toPrint){
    //call sort function 
    sortSent(toPrint);
    
    [].slice.call(toPrint).forEach(function(datapoint){
        var start = $('<tr></tr>');
        start.append($('<td>' + toPrint.screen_name + '</td>'));
        start.append($('<td>' + toPrint.created_at + '</td>'));
        start.append($('<td>' + toPrint.text + '</td>'));
        start.append($('<td>' + toPrint.hashtags + '</td>'));
        start.append($('<td>' + toPrint.retweet_count + '</td>'));
        start.append($('<td>' + toPrint.sentiment_score + '</td>'));
        //append finally...
        $('tbody').append(start);

    });
    
};


//load tweets getjson

function loadTweets(data){
    $.getJSON(data, function(loaded){
        //empty
        $('tbody').empty();
        showTweets(parseFloat(loaded));
        console.log('data set fetched and load');
    });
};

//kinda works!!!!
showTweets(parseTweets(_TWEETS));


//use live stuff per proxy 
$('#searchButton').click(function(){
    loadTweets('http://faculty.washington.edu/joelross/search-tweets-proxy/?q=' + encodeURIComponent($('#searchBox').val()) + '&count=50')
})