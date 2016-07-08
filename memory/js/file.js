'use strict';
var rows = 4;
var xky = 0;
var columns = 4;
var noMatch = 0;
var $row = $("<div />", {
    class: 'row'
});
var $square = $("<div />", {
    class: 'square'
});
var FIRST;
var SECOND;
var done;

//$(document).ready(function () {
/*
    //add columns to the the temp row object
    for (var i = 0; i < columns; i++) {
        $row.append($square.clone().attr("id", i));
    }
    //clone the temp row object with the columns to the wrapper
    for (var i = 0; i < rows; i++) {
        $("#table").append($row.clone().attr("id", i + "row"));
    }
});
*/


$('#table').hide();
$('#start').click(function(){
    $('#table').show();
    new RecurringTimer(function() {
        document.getElementById("timer").innerHTML = ++count;
        }, 1000);

})

var width = $(window).width() * .75;
$('#table').width(width);

//timer code
function RecurringTimer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    var resume = function() {
        start = new Date();
        timerId = window.setTimeout(function() {
            remaining = delay;
            resume();
            callback();
        }, remaining);
    };
    
    this.resume = resume;

    this.resume();
}



var count = 0;
function buildGrid (){
    var lookup = {};
    var selected = [];
    var x = 0;
    //randomly select cards
    while(x < 8){
        var randomSel = _.shuffle(CARD.cards);
        var choose = randomSel[0].path;
        //console.log(choose);
        //add to array
        if(!(choose in lookup)) {
            lookup[choose] = 1;
            selected.push(choose);
            selected.push(choose);
            //console.log(selected);
            x++;
        }
    }
    selected = _.shuffle(selected);
    //console.log(selected);
    
    $('#table').empty();

    for (var i = 0; i < selected.length; i ++) {
        var row = i / 2;
        if (i % 4 == 0) {
            $('#table').append('<tr></tr>');
        } 
        $('tr:last').attr('role', 'row')
        $('tr:last').append('<td><button id =' + selected[i] + '></button></td>');
        $('td:last').attr('role', 'gridcell')
        //$('td:last').attr('id', selected[i])
        $('td:last').css('background-image', 'url("img/card-back.png")');
        $('td:last button').data('theCard', selected[i]);
        $('td:last button').css('width', $(window).width() / 4 );
        $('td:last button').css('height', ($(window).height() - $('#table').position().top - $('button').position().top) / 4);
    }
    $('#game').width($(window).width());
    $('#game').height($(window).height() - $('#table').position().top - $('button').position().top);  
    return selected;          
};
var selected = buildGrid();
var count = 0;
function change(data){
    var test = data.id;
    $(data).css( 'background-image', 'url("' + test +'")');
    var returner = data;
    return returner;
}
function changeAttr(){
    $(SECOND).attr('id', 'ALLDONE' + done);
    $(FIRST).attr('id', 'ALLDONE' + done);
    done++;
}


$("[id^=img]").click(function(){
    //console.log(xky);
    if (xky == 0){
        //console.log(xky);
        FIRST = change(this);
        console.log(xky);
        xky++;
        console.log(xky);
    }
    else if (xky == 1){
        xky++;
        SECOND = change(this);
        console.log(SECOND.id);
        console.log(FIRST.id);
        if (FIRST.id == SECOND.id){
            changeAttr();
            //xky = 0;
        }
        else {
            console.log('no match');
            //xky = 0;
            //$("[id^=img]").css('background-image', 'url("img/card-back.png")');
            noMatch++;
        }
    }
    else {
            xky = 0;
            $("[id^=img]").css('background-image', 'url("img/card-back.png")');
        
    }
    var totRem = $("[id^=img]").length / 2;
    var matchesSo = 0;
    matchesSo = 8 - totRem;
    $('#rem').text('Total Remaining : ' + totRem + ' Matches so far : ' + matchesSo + ' Missed : ' + noMatch);
    if (matchesSo == 8){
        $('#win').toggleClass('modal fade');
    }
    

});





//}); 

/*
    //build grid
    for (i = 0; )
};





//var samp = _.shuffle(_CARDS.cards[0])*/

