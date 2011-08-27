function _url2rtsp() {
	
	this._urls = [];
	this._ajax = new _ajax();

	this.hasRTSP = function(vID) {
		var len = this._urls.length;
		for(var i  = 0; i < len; i++) {
			var _url = this._urls[i];
			if(_url.vID == vID) {
				return _url;
			}
		}
		return false;
	}	

	this.getRTSP = function(ytURL, callback) {
	
		var vID = this.getVideoID(ytURL);
		if(vID == false) {
			callback(false);
			return;
		}
		var _url = this.hasRTSP(vID);
		if(_url !== false) {
			callback(_url.rtsp);
			return;
		}
		var obj = this;
		this._ajax.get("http://gdata.youtube.com/feeds/api/videos?q=" + vID + "&format=1&alt=json" , function(data){
    		try { 
				var resp = { 
					"vID"   : vID, 
					"ytURL" : ytURL, 
					"rtsp"  : data.feed.entry[0].media$group.media$content[1].url, 
					"thumb" : data.feed.entry[0].media$group.media$thumbnail[1].url
				};
				obj._urls.push(resp);
 				callback(resp);
			}
        	catch(e) {
				console.log("Invalid json response, missing rtsp lilnk");
				console.log(e);
            	callback(false);
        	}
		});
	}

	this.getVideoID = function(ytURL) {
		
		var aURL = ytURL.split('?'); 
		try {
			aURL = aURL[1].toString();
		}catch(e) {
			console.log("Invalid url format, missing ?");
			console.log(ytURL);
			return false;
		}
    	if (aURL.indexOf('&') == -1) {
			aURL += '&';
    	}
	    var nvPairs = aURL.split("&");
    	var videoID = null;
    	for (i = 0; i < nvPairs.length; i++) {
	    	var nvPair = nvPairs[i].split("=");
        	var name = nvPair[0];
        	if (name == "v") {
 	       	videoID = nvPair[1];
        	}
    	}
    	if(videoID == null) {
			console.log("Invalid url format, missing v param");
			console.log(ytURL);
			return false;
    	}
		return videoID;
	}	
}
// creates new instance
var url2rtsp = new _url2rtsp();
