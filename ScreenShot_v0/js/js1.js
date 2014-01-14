$(function(){ 
	//initial state append list
    var $ul =$("ul"); 
    $.get("ExtractData", 
        function(data){ 
                $.each(data,function(i,item){ 
					nowtime=new Date();
					nowtime.setTime(item.time);
                    var $li=$('<li><div class="time" id="" onclick="">'+"Date : "
							+nowtime.toLocaleString()
                            +'</div><div class="remove"></div></li>');
					$li.find("div").attr("onclick","showdetail("+ item.SID +")");
					$li.find("div").attr("id",item.SID);
					var $btn = $("<button>remove</button>"); 
                    $btn.attr("onclick","deletedata("+ item.SID +")");
                    $btn.click(function(){ 
                        $li.remove(); 
                        });
                    $(".remove", $li).append($btn); 
                    $ul.append($li);
                });
				
				//set domain bar
				var $se=$("#domaincontent");
				var $op=$('<div class="searchdomain" id="" onclick="searchdomain()" contentEditable="true">search here</div>');
				$se.append($op);
				var arrtem=[];
				$.each(data,function(i,item){
					arrtem.push(item.domain);
					if($.inArray(item.domain,arrtem)==-1||arrtem.length==1)
					{
						var $op=$('<div class="domainname" onclick="hide(this)" id="'+item.domain+'">'+item.domain+'</div>');
						//$op.click(hide);
						//$op.attr("id",item.domain);
						alert($op.attr("id"));
						$se.append($op);
					}
				});
        }, 
        "json"
    );
	
	//set timebar initial
	var d=new Date();
	var dstr=d.getFullYear()+"-"+d.getMonth()+1+"-"+d.getDate()+"T"+d.getHours()+":"+d.getMinutes()+":00";
	alert(dstr);//rewrite
	$("#dateend").attr("value",dstr);
	
	//click search function
	$("#searchbtn").click(function(){
		var temd=new Date($("#datestart").val());
		var timef=""+temd.getTime();
		temd=new Date($("#dateend").val());
		var timet=""+temd.getTime();
		var domains=$("#domain").val();
		alert(domains);
		
		alert("so far success");
		
		//post function, incomplete
		$.get("SearchData",
			{
				time1 : timef,
				time : timet,
				domain : domains
			},
			function(data){
				alert("hahaha");
				$ul.html("");
				$.each(data,function(i,item){ 
					nowtime=new Date();
					nowtime.setTime(item.time);
                    var $li=$('<li><div class="time" id="" onclick="">'+"Date : "
							+nowtime.toLocaleString()
                            +'</div><div class="remove"></div></li>');
					$li.find("div").attr("onclick","showdetail("+ item.SID +")");
					$li.find("div").attr("id",item.SID);
					var $btn = $("<button>remove</button>"); 
                    $btn.attr("onclick","deletedata("+ item.SID +")");
                    $btn.click(function(){ 
                        $li.remove(); 
                        });
                    $(".remove", $li).append($btn); 
                    $ul.append($li); 
                });
			},
			"json"
		);
	});
	

});

function dropdown(){
	$(".searchdomain").html("search here");
	$("#domaincontent").toggle();
};

function searchdomain(){
	$(".searchdomain").html("");
}

function hide(me){
	var $this=$(me);
	var str=$this.attr("id");
	alert($this.attr("id"));
	$("#domaincontent").hide();
};



function showdetail(mySID){
	alert(mySID);
	$.post("SearchData",{SID : mySID},function(data){
			alert(data.SID);
			$("#imagebox").find("img").attr("src",data.SID.img);
			alert("finish");
			//$("#date").html(nowtime.toLocaleString());
			//$("#domain").html(data.SID.domain);
			//$("#msg").html(data.SID.msg);
			},
			"json"
	);
};
  

  
function deletedata(deSID){ 
    $.post( "DeleteData", 
        { 
            SID : deSID,  
        } 
    ); 
    //reload 
};