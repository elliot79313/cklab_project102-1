// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// To make sure we can uniquely identify each screenshot tab, add an id as a
// query param to the url that displays the screenshot.
// Note: It's OK that this is a global variable (and not in localStorage),
// because the event page will stay open as long as any screenshot tabs are
// open.


// record the sender tab id, and call takeScreenshot.
// send back of image is done in takeScreenshot. 
var sendID = null;
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	console.log(sender);
	sendID = sender.tab.id;
	takeScreenshot();	
});

function takeScreenshot() {
  chrome.tabs.captureVisibleTab(null, function(img) {
    var screenshotUrl = img;
	console.log(screenshotUrl);
	// send picture(in base64 form) generated
	chrome.tabs.sendMessage(sendID, screenshotUrl);
	return;
  });
}
