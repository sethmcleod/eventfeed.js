(function() {
  'use strict';

  var Eventfeed, root;

  Eventfeed = (function() {

    function Eventfeed(params, context) {
      var option, value;

      // default options
      this.options = {
        target: 'eventfeed',
        orderBy: 'none',
        pastEvents: false,
        abbreviate: false
      };

      // overrides default options if an object is passed
      if (typeof params === 'object') {
        for (option in params) {
          value = params[option];
          this.options[option] = value;
        }
      }

      // default context
      this.context = context != null ? context : this;

      // unique key for this instance
      this.unique = _genKey();
    }

    // run the feed
    Eventfeed.prototype.run = function(url) {
      var header, instanceName, script;

      // make sure the calendarid is set
      if (typeof this.options.calendarId !== 'string') {
        throw new Error("Missing calendarId.");
      }

      console.log('Running feed...');

      this._buildUrl();
      this._fetchData();
      this._parseData();
      console.log('Fetching feed...');

      // check to see if document exists
      if (typeof document !== "undefined" && document !== null) {
        // create script element
        script = document.createElement('script');
        // give the script an id for removal later
        script.id = 'eventfeed-fetcher';
        // assign the script source, by _buildUrl() or argument
        script.src = url || this.buildUrl();
        // add script element to the header
        header = document.getElementsByTagName('head');
        header[0].appendChild(script);
        // create global object to cache options
        instanceName = "eventfeedCache" + this.unique;
        window[instanceName] = new Eventfeed(this.options, this);
        window[instanceName].unique = this.unique;
      }

      // return true if all goes well
      return true;
    };

    // url builder for the request
    Eventfeed.prototype._buildUrl = function() {
      var base, fields, key, final, now;
      base = "https://www.googleapis.com/calendar/v3/calendars/";
      fields = "&fields=description,items(created,description,end,hangoutLink,htmlLink,id,location,start,status,summary,updated)";
      key = "&key=AIzaSyBl3FauupFzkP3F4BYqL47_keO-PSmrTOQ";
      final = "" + base + this.options.calendarId + "/events?";
      now = (new Date()).toISOString();
      // max results
      if (this.options.maxResults != null) {
        if (typeof this.options.maxResults !== 'number') {
          throw new Error("The maxResults option must be a number.");
        }
        final += "&maxResults=" + this.options.maxResults;
      }
      // single events
      if (this.options.singleEvents != null) {
        if (typeof this.options.singleEvents !== 'boolean') {
          throw new Error("The singleEvents option must be a boolean.");
        }
        final += "&singleEvents=" + this.options.singleEvents;
      }
      // show deleted
      if (this.options.showDeleted != null) {
        if (typeof this.options.showDeleted !== 'boolean') {
          throw new Error("The showDeleted option must be a boolean.");
        }
        final += "&showDeleted=" + this.options.showDeleted;
      }
      // past events
      if (typeof this.options.pastEvents !== 'boolean') {
        throw new Error("The pastEvents option must be a boolean.");
      }
      if (this.options.pastEvents === false) {
        final += '&timeMin=' + now;
      }
      // order by
      switch (this.options.orderBy) {
        case "none":
          break;
        case "startTime":
          if(this.options.singleEvents !== true) {
            throw new Error("The singleEvents option must be true to order by startTime.");
          }
          final += "&orderBy=startTime";
          break;
        case "updated":
          final += "&orderBy=updated";
          break;
        default:
          throw new Error("Invalid option for orderBy: '" + this.options.orderBy + "'.");
      }
      final += key;
      console.log('Building url...');
      console.log('url: ' + final);
      // add the jsonp callback
      final += "&callback=eventfeedCache" + this.unique + ".parseData";
      // return final url
      return final;
    };

    // data fetcher
    Eventfeed.prototype._fetchData = function(url) {
      url = url || '';
      console.log('Fetching data...');
      console.log('data: undefined');
    };

    // data parser (must be a JSON object)
    Eventfeed.prototype._parseData = function(data) {
      data = data || 'empty';
      console.log('Parsing data...');
      console.log('no data to parse.');
    // helper function to generate unique key
    function _genKey() {
      var S4;
      S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return "" + (S4()) + (S4()) + (S4()) + (S4());
    };

    // helper function for parsing month
    function _thisMonth(d, a) {
      var dateTime = new Date(d),
          months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
          monthsAbbr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      if (a === true) {
        return monthsAbbr[dateTime.getMonth()];
      } else {
        return months[dateTime.getMonth()];
      }
    }

    // helper function for date plus oridinal
    function _thisDay(d) {
      var dateTime = new Date(d);
      return dateTime.getDate() + _thisOrd(dateTime.getDate());
    }

    // helper function for time (HH:MM)
    function _thisTime(d) {
      var dateTime = new Date(d);
      return dateTime.timeNow();
    }

    // helper function for date ordinals
    function _thisOrd(d) {
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
