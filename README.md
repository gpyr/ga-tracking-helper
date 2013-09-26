A require.js module for Google Anaylytics Tracking


this.gaTrackingHelper = require("gatrackinghelper").GATrackingHelper({
	gaqId: window.ANALYTICS_ID,
	page: window.location
}); 


GATrackingHelper.trackPageview(window.location.href);
GATrackingHelper.trackEvent('MainVideo', 'clicked', ''); 
