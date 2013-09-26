define(['require', 'exports'], function(require, exports) {

    exports.GATrackingHelper = function(settings) {

        // MEMBERS & DEFAULTS
        var urchinId      = settings.gaqId      || false,
            devId         = settings.devId      || '',
            page          = settings.page       || null,
            domainName    = settings.domainName || '',
            _dev_log      = settings.devLog     || false,
            loadInterval  = 100,
            ready         = false;
        
        if (!urchinId || !isNaN(urchinId)) {
            alert('Invalid Google Analytics ID given, please ensure its a valid ID like the following example: UA-XXXXXXX-X');
            return;
        }

        // GOOGLE ANALYTICS HELPER ENGINE
        var GATrackingHelperEngine = {
            _load : function() {
                var gaHost = ('https:' == document.location.protocol) ? 'https://ssl.' : 'http://www.';
                var s = document.createElement('script');
                s.src = gaHost + 'google-analytics.com/ga.js';
                document.getElementsByTagName('head')[0].appendChild(s);
                var checker = this._wrap(this, this._check);
                setTimeout(checker, loadInterval);
            },

            _check : function() {      
                if (window['_gat']) {
                    gaTracker = _gat._getTracker(urchinId);

                    if (urchinId != devId) {
                        gaTracker._setDomainName(domainName);
                    }

                    gaTracker._initData();
                    (page == null) ? gaTracker._trackPageview() :  gaTracker._trackPageview(page);

                    ready       = true;
                    pageTracker = gaTracker;
                } else {
                    var checker = this._wrap(this, this._check);
                    setTimeout(checker, loadInterval);
                }
            },
            
            trackPageview : function(page) {
                if (ready) {
                    (page == null) ?  gaTracker._trackPageview() : gaTracker._trackPageview(page);
                    this.log('manual trackPageview: ' + page);
                } else {
                    var tpv = this._wrap(this, this.trackPageview);
                    setTimeout(function() { tpv(page); }, loadInterval);
                }
            },
            
            trackEvent : function(category, action, label) {
                if (ready) {
                	gaTracker._trackEvent(category, action, label);
                    this.log('trackEvent: ' + category + ', ' + action + ', ' + label);
                } else {
                    var te = this._wrap(this, this.trackEvent);
                    setTimeout(function() { te(category, action, label); }, loadInterval);
                }
            },
            
            log : function(msg) {
                if (window.console && window.console.log && _dev_log) {
                    console.log(msg);
                }
            },

            _wrap : function(obj, method) {
                return function() {
                    return method.apply(obj, arguments);
                };
            }
        };

        GATrackingHelperEngine._load();
        return GATrackingHelperEngine;
    }
});
