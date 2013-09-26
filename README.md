A require.js module for Google Anaylytics Tracking

Create a new instance
```javascript
this.gaTrackingHelper = require("gatrackinghelper").GATrackingHelper({
	gaqId: window.ANALYTICS_ID,
	page: window.location
}); 
```


Usage:
```javascript
GATrackingHelper.trackPageview(window.location.href);
GATrackingHelper.trackEvent('MainVideo', 'clicked', ''); 
```
