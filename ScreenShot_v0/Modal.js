var defaultHtml = '<div id="boxes">'
                      + '<div id="dialog">'
                      + '<div id="dTitleBar">'
                      + '<span id="dTitle"></span>'
                      + '<div style="float: right;" id="button_cancel">╳</div>'
                      + '</div>'
                      + '<div id="dCenterDiv">'
                      + '</div>'
                      + '<div id="dShotTextDiv">'
					  + '<div id="dShotDiv"><img id="snapshot" src="white.png" width="225" height="220"></div>'
					  + '<div id="dTextDiv"><textarea id="keyin" rows="4" cols="30" autofocus required></textarea></div>'
                      + '</div>'
                      + '<div id="dFooterDiv">'
                      + '<div style="float: right;" id="button_submit">Submit</div>'
                      + '</div>'
                      + '</div>'
                      + '<div id="mask"></div>'
                      + '</div>';

var troubleClickHTML = '<div id="troubleClick">'
					  + 'Trouble?'
					  + '</div>';

// append trouble button on page		  
function startTrouble(){
    var $tbox = $(troubleClickHTML);
    $tbox.appendTo('body');
}

// start trouble click button
$(function () {
    // set on button
	startTrouble();
	// set on-click action 
	$("#troubleClick").click(
		function(){
		// request for screenshot
		chrome.extension.sendMessage({greeting: "hihihi!"});
		// show box
        modal("Information:", "Any Question?");
    });
});

function modal(title, msg) {
    var $boxes = $(defaultHtml);
    $boxes.appendTo('body');

    $('#dTitle').html(title);
    $('#dCenterDiv').html(msg);

    $("#button_cancel").click(function (e) {
		$('#troubleClick').fadeIn(1000);
        $boxes.remove();
    });
	
	//click.submit to send data.
	$("#button_submit").click(function (e) {
		// url is not defined.
		var post_object = {
			"img": document.getElementById('snapshot').src,
			"location": location.origin,
			"herf": location.href,
			"msg": document.getElementById("keyin").value
		};
		if($.trim(post_object.msg) == ""){
			alert("you need to key in something!");
		}
		else{
			// post(url, post_obj, function(data){alert("Thank for your feedback!")});
			console.log("obj", post_object);
			$('#troubleClick').fadeIn(1000);
			$boxes.remove();
		}
    });

	$('#troubleClick').fadeOut(1000);
	
    //將Mask的寬和高設定成和畫面大小一樣，然後用動畫顯示，並設定透明度為0.6
    $('#mask').css({
        'width': $(window).width(),
        'height': $(document).height()
    })
        .fadeIn(1500).fadeTo("slow", 0.6);

    //將Dialog的位置設定在畫面中央，然後動畫顯示
    var dialogHeight = $(window).height() / 2 - $('#dialog').height() / 2 - 50;
    var dialogWidth = $(window).width() / 2 - $('#dialog').width() / 2;
    $('#dialog').css({
        'top': dialogHeight,
        'left': dialogWidth
    });
	$('#dialog').fadeIn(1500);
}

function setScreenshotUrl(url) {
  document.getElementById('snapshot').src = url;
}

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	// change picture and in console
	console.log("img", message);
	setScreenshotUrl(message);
});