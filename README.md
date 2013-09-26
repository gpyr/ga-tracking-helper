A require.js module for Google Anaylytics Tracking


Configuration
```javascript
// MEMBERS & DEFAULTS
var urchinId      = settings.gaqId      || false,
    devId         = settings.devId      || '',
    page          = settings.page       || null,
    domainName    = settings.domainName || '',
    _dev_log      = settings.devLog     || false,
    loadInterval  = 100,
    ready         = false;
```

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
