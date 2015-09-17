# Google Calendar Event Feed

Eventfeed is a simple plugin for displaying a feed of upcoming events using [Google Calendar API v3](https://developers.google.com/google-apps/calendar/v3/reference/events/list). No jQuery required, it's just plain javascript.

> This is currently in beta and may not function correctly.

## Installation
Installation is easy: Just download the script from the __dist__ folder and include it in your HTML:

```html
<script type="text/javascript" src="path/to/eventfeed.min.js"></script>
```

## Basic Usage
To use, just declare a variable and assign to that a `new` instance of Eventfeed. Then when you're ready to initiate the feed, call the `run()` function on your variable.

```html
<script type="text/javascript">
    var feed = new Eventfeed({
        clientId: 'YOUR_CLIENT_ID'
    });
    feed.run();
</script>
```

Eventfeed will by default look for a `<div id="eventfeed"></div>` and fill it with the event data.

```html
<div id="eventfeed">
    <div class="event" id="{{id}}">
        <span class="month">{{month}}</span>
        <span class="day">{{day}}</span>
        <span class="title">{{title}}</span>
        <span class="description">{{description}}</span>
        <span class="start">{{start}}</span>
        <span class="end">{{end}}</span>
    </div>
</div>
```

## Requirements

The only thing you'll need is a __calendar id__ for the public calendar. This is usually the email address used to create the calendar.

## Options

- `calendarId` (string) - The email address linked to a public calendar. __Required__.
- `target` (string) - The ID of a DOM element you want to add events to.
- `abbreviate` (boolean) - Whether or not to abbreviate the names of months. Default is false.
- `maxResults` - Maximum number of events returned on one result page. By default the value is 250 events.
- `orderBy` (string) - The order of the events returned. Available options are:
    - `none` (default) - As they come from Instagram.
    - `startTime` - Order by the start date/time (ascending). This is only available when querying single events (i.e. the parameter singleEvents is True)
    - `updated` - Order by last modification time (ascending).
- `showDeleted` (boolean) - Whether to include deleted events (with a status of "cancelled") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. The default is False.
- `singleEvents` (boolean) - Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. The default is False.
- `timeMax` (datetime) - Upper bound for an event's start time to filter by. The default is not to filter by start time.
- `timeMin` (datetime) - Lower bound for an event's end time to filter by. The default is not to filter by end time.

## Change Log

__1.0.0__

- Initial release
