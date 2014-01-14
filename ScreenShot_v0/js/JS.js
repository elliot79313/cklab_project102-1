function savedata(){

	$.post( "SaveData",
		{
			time : $.now() ,
			domain : location.href ,
			msg : $("#inmsg").val(),
			img : $("#inimg").val()
		},
		function(data){
			$("#returntime").html(data.time);
			$("#returndomain").html(data.domain);
			$("#returnmsg").html(data.msg);
			$("#returnimg").html(data.img);
		},
		"json"
	);
};

