/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
function nottof(idpassado){
	if(idpassado==1){
		var date = new Date();

		cordova.plugins.notification.local.schedule({
			id: 1,
			title: "Message Title",
			message: "Message Text",
			firstAt: date, // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
			every: "week", // this also could be minutes i.e. 25 (int)
			sound: "file://sounds/reminder.mp3",
			icon: "http://icons.com/?cal_id=1",
			data: { meetingId:"123#fg8" }
		});

		cordova.plugins.notification.local.on("click", function (notification) {
			joinMeeting(notification.data.meetingId);
		});
	}
	if(idpassado==2){
		alert(device.model);
	}
	if(idpassado==3){
		function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;
			alert('Latitude: '  + position.coords.latitude);
    }
	
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    // Options: throw an error if no update is received every 30 seconds.
    //
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError);
		//navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
	}
	if(idpassado==4){
		alert("entrou");
		BTPrinter.list(function(data){
			alert("Success");
			alert(data);
			var element = document.getElementById('geolocation');
			element.innerHTML = "<div onclick='conect_bb(\""+data+"\")'>"+data+"</div>";
			console.log("Success");
			console.log(data); //list of printer in data array
		},function(err){
			alert("Error");
			alert(err);
			console.log("Error");
			console.log(err);
		});
	}
}
function conect_bb(aparelho){
	alert("f conect");
	BTPrinter.connect(function(data){
		alert("Successo");
		alert(data)
	},function(err){
		alert("Erroro");
		alert(err)
	}, aparelho);
}