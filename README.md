# Google Calendar Event Feed

![Version](https://img.shields.io/badge/version-beta-red.svg) [![Travis CI](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://travis-ci.org/sethmcleod/eventfeed.js)

Eventfeed.js is a simple plugin for displaying a feed of upcoming events using [Google Calendar API v3](https://developers.google.com/google-apps/calendar/v3/reference/events/list). No jQuery required, it's just plain javascript.

> :warning: This is currently in working beta and may not function correctly.

## Installation
Installation is easy: Just download the script from the __dist__ folder and include it in your HTML:

```html
<script type="text/javascript" src="path/to/eventfeed.min.js"></script>
```

## Basic Usage
To use, just declare a variable and assign to that a new instance of Eventfeed. When you're ready to initiate the feed, call the `run()` function on your variable.

```html
<script type="text/javascript">
    var feed = new Eventfeed({
        calendarId: 'test@example.com'
    });
    feed.run();
</script>
```

Eventfeed will by default look for a `<div id="eventfeed"></div>` and fill it with the events.

```html
<div id="eventfeed">
    <div class="event" id="{{id}}">
        <span class="month">{{month}}</span>
        <span class="day">{{day}}</span>
        <span class="title">{{title}}</span>
        <span class="description">{{description}}</span>
        <span class="location">{{location}}</span>
        <span class="start">{{start}}</span>
        <span class="end">{{end}}</span>
    </div>
</div>
```

## Requirements

The only thing you'll need is a __calendar id__ for the public calendar. This is usually the email address used to create the calendar.

## Standard Options

- `calendarId` (string) - The email address linked to a public calendar. __Required__.
- `target` (string) - The ID of a DOM element you want to add events to.
- `abbreviate` (boolean) - Whether or not to abbreviate the names of months. Default is `false`.
- `maxResults` (number) - Maximum number of events returned. Default is `250`.
- `orderBy` (string) - The order of the events returned. Available options are:
    - `none` (default) - As they come from Instagram.
    - `startTime` - Order by the start date/time (ascending). This is only available when querying single events (i.e. the parameter singleEvents is True)
    - `updated` - Order by last modification time (ascending).
- `pastEvents` (boolean) - Whether to include past events. Default is `false`.
- `showDeleted` (boolean) - Whether to include deleted events (with a status of "cancelled") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. Default is `false`.
- `singleEvents` (boolean) - Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Default is `false`.

## Advanced Options

- `before` (function) - A callback function called before fetching events from Google.
- `after` (function) - A callback function called when events have been added to the page.
- `success` (function) - A callback function called when Google returns valid data. (argument -> json object)
- `error` (function) - A callback function called when there is an error fetching events. (argument -> string message)
- `mock` (boolean) - Query the events without inserting into the DOM. Use with the success() callback. Default is false.

## FAQ

#### "Why am I getting a JSON error?"

First make sure the calendar linked to your id is public, and the *hide details* option is not checked (this limits JSON data returned).

![Sharing Settings](https://raw.githubusercontent.com/sethmcleod/eventfeed.js/gh-pages/resources/public.png)

 __Currently only `@gmail.com` addresses are supported.__ Using an account from a different domain, one that is connected through Google Apps, will automatically hide event details and the returned JSON data will be differently formatted.  

## To Do List

- Test browser compatibility.
- Build test suit using [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).
- Add a `template` option for customizing HTML output.

## Change Log

__1.0.0__

- Initial release
