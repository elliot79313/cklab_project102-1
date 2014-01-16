$(function(){ 
	//initial state append list
	$("#startpage").hide();
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
				var $op=$('<div id="searchdomain" id="" onclick="searchdomain()" contentEditable="true">search here</div>');
				$se.append($op);
				arrtem=[];
				$.each(data,function(i,item){
					if($.inArray(item.domain,arrtem)==-1||arrtem.length==0)
					{
						var $op=$('<div class="domainname" onclick="hide(this)" id="">'+item.domain+'</div>');
						$op.attr("id",item.domain);
						//alert($op.attr("id"));
						//$op.click(hide);
						//$op.attr("id",item.domain);
						$se.append($op);
					}
					arrtem.push(item.domain);
				});
        }, 
        "json"
    );
	
	//set timebar initial
//	var d=new Date();
//	var dstr=d.getFullYear()+"-"
//			+d.getMonth()+1+"-"
//			+d.getDate()+"T"
//			+d.getHours()+":"
//			+d.getMinutes()+":00";
//	alert(dstr);//rewrite
//	$("#dateend").attr("value",dstr);
	
	//click search function
	$("#searchbtn").click(function(){
		var temd=new Date($("#datestart").val());
		if(isNaN(temd)){
			timef=null;
		}
		else{
			var timef=""+temd.getTime();
		}
		temd=new Date($("#dateend").val());
		if(isNaN(temd)){
			timet=null;
		}
		else{
			var timet=""+temd.getTime();
		}
		
		var domains=$("#domain").attr("value");
		if(domains=="null"){ 
			domains=null;
		}

		$.get("SearchData",
			{
				time1 : timef,
				time2 : timet,
				domain : domains
			},
			function(data){
				
				$ul.html("");
				$.each(data,function(i,item){ 
					nowtime=new Date();
					nowtime.setTime(item.time);
                    var $li=$('<li><div class="time" id="" onclick="">'+"Date : "
							+nowtime.toLocaleString()
                            +'</div><div class="remove"></div></li>');
					$li.find("div").attr("onclick","showdetail("+i+")");
					$li.find("div").attr("id",i);
					var $btn = $("<button>remove</button>"); 
                    $btn.attr("onclick","deletedata("+i+")");
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

//domain dropdown and toggle
function dropdown(){
	$("#searchdomain").html("search here");
	$("#domaincontent").toggle();
};

//search domain bar in dropdown list
function searchdomain(){
	$("#searchdomain").html("");
	$("#searchdomain").keyup(function(){
	var str=$("#searchdomain").html();
	$.each(arrtem,function(i,item){
					if(item.match(str)==null){
						//alert("no match");
						$(document.getElementById(item)).hide();
					}
					else{
						//alert("match");
						$(document.getElementById(item)).show();
					}
				});
	});
}

//incomplete
function hide(me){
	var $this=$(me);
	$("#domain").html($this.html());
	$("#domain").attr("value",$this.html());
	$("#domaincontent").hide();
};


//show content detail
function showdetail(mySID){
	$.post("SearchData",{SID : mySID},function(data){
			$("#startpage").show();
			$("#imagebox").find("img").attr("src",data[mySID]["img"]);
			nowtime.setTime(data[mySID]["time"]);
			$("#recorddate").html(nowtime.toLocaleString());
			$("#recorddomain").html(data[mySID]["domain"]);
			$("#recordmsg").html(data[mySID]["msg"]);
			},
			"json"
	);
};
  
//delete data
function deletedata(deSID){ 
    $.post( "DeleteData", 
        { 
            SID : deSID,  
        } 
    ); 
    //reload
};