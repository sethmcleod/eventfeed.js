$(document).ready(function() {
    'use strict';
    var now = (new Date()).toISOString(),
        events = [],
        url = 'https://www.googleapis.com/calendar/v3/calendars/engine15brew%40gmail.com/events?singleEvents=true&orderBy=startTime&maxResults=12&timeMin=' + now + '&fields=items(originalStartTime%2Cdescription%2ChtmlLink%2Cstatus%2Csummary%2Clocation%2Cvisibility%2Cstart%2Cend%2Cid)&key=AIzaSyATwaXpxGxDNIfTSAiWh4gZTDBXIUBJZ70';
    $.getJSON(url, function(data) {
        $('#empty').remove();
        $.each(data.items,function(i,v) {
            if(data.items[i].status == "confirmed") {
                if(pageTitle == 'Jax Beach Brewpub') {
                    if(data.items[i].location == 'brewpub') {
                        events.push(data.items[i]);
                    }
                } else if(pageTitle == 'Downtown Brewery & Biergarten') {
                    if(data.items[i].location == 'biergarten') {
                        events.push(data.items[i]);
                    }
                } else {
                    events.push(data.items[i]);
                }
            }
        });
        makeFeed(events);
    });
    setTimeout(function(){
        if($('.box').length == 1) {
            $('.box .event').css('float','none').css('display','inline-block');
        }
    }, 500);
});

function makeFeed(event) {
    var len = event.length;
    for(i = 0; i < len; i++) {
        var first = Object.keys(event[i].start)[0],
            id = event[i].id || '',
            title = event[i].summary || '',
            description = event[i].description || '',
            month = thisMonth(event[i].start[first]),
            day = thisDay(event[i].start[first]),
            start = thisTime(event[i].start[first]),
            end = thisTime(event[i].end.dateTime),
            element = '<div class="event" id="' + id + '"> <div class="date"> <span class="month">' + month + '</span> <span class="day">' + day + '</span> </div><div class="info"> <span class="title">' + title + '</span> <p class="description">' + description + '</p></div></div>',
            startend = '<span class="label">Starts</span><span class="start">' + start + '</span> <span class="label">Ends</span><span class="end">' + end + '</span>';
        if(first == "dateTime") {
            $('.events .box').append(element);
            $('.events .box .event:last .info').append(startend);
        } else {
            $('.events .box').append(element);
        }
    }
}

function thisMonth(d) {
    var dateTime = new Date(d),
        months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    return months[dateTime.getMonth()];
}

function thisDay(d) {
    var dateTime = new Date(d);
    return dateTime.getDate() + nth(dateTime.getDate());
}

function thisTime(d) {
    var dateTime = new Date(d);
    return dateTime.timeNow();
}

function nth(d) {
    if(d>3 && d<21) return 'th';
    switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

Date.prototype.timeNow = function(){ return ((this.getHours() < 10)?"0":"") + ((this.getHours()>12)?(this.getHours()-12):this.getHours()) +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ((this.getHours()>12)?('pm'):'am'); };
