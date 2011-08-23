function url2rtsp(ytURL, callback) {

	var aURL = ytURL.split('?'); 
	try {
		aURL = aURL[1].toString();
	}catch(e) {
		console.log("Invalid url format, missing ?");
		console.log(ytURL);
		callback(false);
	}
    if (aURL.indexOf('&') == -1) {
		console.log("Invalid url format, missing &");
		console.log(ytURL);
    	callback(false);
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
		callback(false);
    }
    console.log("video id: " + videoID);
	var api_url = "https://gdata.youtube.com/feeds/api/videos?q=" + videoID + "&format=1&alt=json";
	$.getJSON(api_url, [], function(data) {
    	try { 
 	     	var rtsp_url = data.feed.entry[0].media$group.media$content[1].url;
 			callback(rtsp_url);
		}
        catch(e) {
			console.log("Invalid json response, missing rtsp lilnk");
			console.log(e);
            callback(false);
        }
     });
}

