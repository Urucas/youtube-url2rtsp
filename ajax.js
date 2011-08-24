function _ajax() {
	
	this.xmlHttp = new XMLHttpRequest();
	
	this.cancel = function() {
		var xmlHttp = this.xmlHttp;
		xmlHttp.abort();
		xmlHttp.onreadyStateChange = function() {}				
	}
		
	this.testConn = function(success_callback, error_callback) {
		var xmlHttp = this.xmlHttp;
			xmlHttp.onreadystatechange = function() {			
			if(xmlHttp.readyState == 4) {
				var reply = xmlHttp.responseText;
					if (reply == "") error_callback();
					else success_callback();					
				}			
			}	
		xmlHttp.open('GET', "http://www.google.com", true);
		xmlHttp.send(null);
	}
		
	this.parseResponse = function(reply, responseType) {
		if(responseType == 'text') {
			return reply.responseText;
		}else if(responseType == 'xml') {
			return reply.responseXML;
		}else {
			return this.parseJSON(reply.responseText);
		}		
	}

	this.get = function(rURL, callback) {
		var aux = this;	
		var xmlHttp = this.xmlHttp;
		xmlHttp.onreadystatechange = function() {			
			if(xmlHttp.readyState == 4) {				
				response = JSON.parse(xmlHttp.responseText);						
				if(response == "" || response.error == -1) {
					aux.onResponseError(response);
					return;	
				}								
				callback(response);			
			}		
		};				
		xmlHttp.open('GET', rURL, true);
		xmlHttp.send(null);		
	}	
	
	this.getText = function(rURL, callback) {
		var aux = this;	
		var xmlHttp = this.xmlHttp;
		xmlHttp.onreadystatechange = function() {			
			if(xmlHttp.readyState == 4) {				
				response = xmlHttp.responseText;					
				if(response == "") {
					aux.onResponseError(response);
					return;	
				}								
				callback(response);
			}		
		};				
		xmlHttp.open('GET', rURL, true);
		xmlHttp.send(null);		
	}	

	this.onResponseError = function(response) {
		alert('error response');
	}
	
}
