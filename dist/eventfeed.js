(function() {
  'use strict';

  var Eventfeed, root;

  Eventfeed = (function() {

    function Eventfeed(params) {
      var option, value;

      // default options
      this.options = {
        target: 'eventfeed',
        abbreviate: false
      };

      // overrides default options if an object is passed
      if (typeof params === 'object') {
        for (option in params) {
          value = params[option];
          this.options[option] = value;
        }
      }
    }

    // run the feed
    Eventfeed.prototype.run = function(url) {

      console.log('Running feed...');

      // make sure the calendarid is set
      if (typeof this.options.calendarId !== 'string') {
        throw new Error("Missing calendarId.");
      }

      // return true if all goes well
      return true;
    };

    // data parser (must be a JSON object)
    Eventfeed.prototype._parseData = function() {
      var data;
      if (typeof response !== 'object') {
        throw new Error('Invalid JSON response');
      }
      console.log('Parsing Data');
    };

    Eventfeed.prototype._buildUrl = function() {
      var base, final;
      base = "https://www.googleapis.com/calendar/v3/calendars/";
      console.log('Building url...');
    };

    // helper function for parsing month
    Eventfeed.prototype._thisMonth = function(d) {
      var dateTime = new Date(d),
        months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
        monthsAbbr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      if (this.options.abbreviate === true) {
        return monthsAbbr[dateTime.getMonth()];
      } else {
        return months[dateTime.getMonth()];
      }
    }

    // helper function for date plus oridinal
    Eventfeed.prototype._thisDay = function(d) {
      var dateTime = new Date(d);
      return dateTime.getDate() + _thisOrd(dateTime.getDate());
    }

    // helper function for time (HH:MM)
    Eventfeed.prototype._thisTime = function(d) {
      var dateTime = new Date(d);
      return dateTime.timeNow();
    }

    // helper function for date ordinals
    Eventfeed.prototype._thisOrd = function(d) {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    }

    // helper function for formatting time
    // need to find a better way around this
    Date.prototype.timeNow = function() {
      return ((this.getHours() < 10)?"0":"") + ((this.getHours()>12)?(this.getHours()-12):this.getHours()) +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ((this.getHours()>12)?('pm'):'am');
    };

    return Eventfeed;

  })();

  // handle exports
  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  // assign to global object
  root.Eventfeed = Eventfeed;

}).call(this);
