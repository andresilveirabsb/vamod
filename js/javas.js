var Sign=function()
	{
	var self=this,wss,reset=false,resettimes=0,servtim=0,host5="97dc81ac20677d7aead",pos=[x=0,y=0],typ="Binomo",rate=0,ratei=0;
	var ctx=document.getElementById('valx');
	var can=ctx.getContext('2d');
	var cooki=[];
	$(ctx).attr("width",window.innerWidth);
	$(ctx).attr("height",window.innerHeight);
	$(window).bind('resize orientationchange',function()
		{
		$(ctx).attr("width",window.innerWidth);
		$(ctx).attr("height",window.innerHeight)
	}
	);
	$(ctx).mousemove(function(e)
		{
		pos.x=e.pageX;
		pos.y=e.pageY;
		var ww=(($(ctx).width()/100)*15)/100;
		var h=$(ctx).height()-(($(ctx).height()/100)*20);
		if(pos.x<(ww*100)&&pos.y<h)
			{
			requestAnimationFrame(self.indi)
		};
		if(pos.y>h)requestAnimationFrame(self.indi)
	}
	);
	this.lincen=function(d)
		{
		if(d.hp<pos.y&&pos.y<(d.hp+d.hh)&&pos.x<d.ww)
			{
			return true
		};
		if(d.hp<pos.y&&pos.y<(d.hp+d.hh)&&pos.x>d.wp&&pos.x<(d.wp+d.ww))
			{
			return true
		};
		return false
	};
	this.risv=function(ar,max)
		{
		var ii=ar.length;
		var h=($(ctx).height()-(($(ctx).height()/100)*20))/ii,w,mpr=max/100,ww=(($(ctx).width()/100)*15)/100;
		// if(window.location.hostname.length!==host5.length)return;
		var linedat=[];
		for(var i=0;
		i<ii;
		i++)
			{
			w=ar[i][1];
			can.fillStyle="#53a15f";
			if(ar[i][0]<=self.data.data[0].close)can.fillStyle="#d75c48";
			can.fillRect(0,h*i,(w/mpr)*ww,h-(h/100));
			if(ar[i][0]==self.data.data[0].close)
				{
				can.beginPath();
				can.strokeStyle="#49bde8";
				can.moveTo(0,h*i);
				can.lineTo(($(ctx).width()/100)*20,h*i);
				can.stroke();
				can.fillStyle="#49bde8";
				can.font="14px Verdana";
				can.fillText(ar[i][0],(($(ctx).width()/100)*20)-(ar[i][0].length*8),(h*i)+14)
			};
			linedat.hp=h*i;
			linedat.hh=h-(h/100);
			linedat.ww=ww*100;
			if(self.lincen(linedat))
				{
				can.fillStyle="rgba(0, 33, 56, 0.61)";
				can.fillRect((($(ctx).width()/100)*15.2),(h*i+(h/2)),String(ar[i][0]).length*10,20);
				can.fillStyle="rgba(86, 176, 104, 1)";
				if(ar[i][0]<=self.data.data[0].close)can.fillStyle="rgba(210, 59, 59, 1)";
				can.fillRect((($(ctx).width()/100)*15.2),(h*i+(h/2))-20,String(ar[i][1]).length*20,20);
				can.beginPath();
				can.strokeStyle="#fff";
				can.moveTo(0,h*i+(h/2));
				can.lineTo(($(ctx).width()/100)*15.2,h*i+(h/2));
				can.stroke();
				can.fillStyle="#fff";
				can.font="14px Verdana";
				can.fillText(ar[i][0],(($(ctx).width()/100)*15.5),(h*i+(h/2))+14);
				can.fillText(ar[i][1],(($(ctx).width()/100)*15.5),(h*i+(h/2))-5)
			}
		}
	};
	this.risg=function(ar)
		{
		// if(window.location.hostname.length!==host5.length)return;
		var size=$('#period').val(),maxl=0;
		for(var i=0;
		i<size;
		i++)
			{
			if(!ar[i].tick)break;
			if(ar[i].tick.length>maxl)maxl=ar[i].tick.length
		};
		var mpr=maxl/100,w=($(ctx).width()-120)/size,h=(($(ctx).height()/100)*20)/100;
		var vol=0,tim,hour,minut;
		for(var i=0;
		i<size;
		i++)
			{
			if(!ar[i].tick)break;
			if(ar[i].tick)vol=ar[i].tick.length;
			can.fillStyle="#53a15f";
			if(ar[i].close<ar[i].open)can.fillStyle="#d75c48";
			can.fillRect(w*((size-1)-i),$(ctx).height(),w-(w/100),0-(h*(vol/mpr)));
			can.fillStyle="#fff";
			can.font=w/4+"px Verdana";
			tim=new Date(ar[i].time*1000);
			minut=tim.getMinutes();
			hour=tim.getHours();
			if(minut<10)minut="0"+minut;
			if(hour<10)hour="0"+hour;
			can.fillText(hour+":"+minut,w*((size-1)-i),$(ctx).height()-(h*(vol/mpr))-5);
			vol=0
		}
	};
	this.rish=function(data)
		{
		// if(window.location.hostname.length!==host5.length)return;
		var size=$('#period').val(),maxl,maxtick=0,mpr,ii,ky=0,ar=[],arrg=[],arrgg=[],iss,ik,datatic=[],linedat=[];
		for(var i=0;
		i<size;
		i++)
			{
			if(!data[i].tick)break;
			arrg=[],ii=data[i].tick.length;
			if(ii>maxtick)maxtick=ii;
			for(var is=0;
			is<ii;
			is++)
				{
				if(!arrg[data[i].tick[is].close])
					{
					arrg[data[i].tick[is].close]=1
				}
				else
					{
					arrg[data[i].tick[is].close]++
				}
			};
			var arrgg=[];
			for(var key in arrg)
				{
				arrgg.push([key,arrg[key]])
			};
			var iss=arrgg.length,ik,ar=[];
			for(var iv=0;
			iv<iss;
			iv++)
				{
				if(Number(arrgg[iv][0])>0)
					{
					ik=iv;
					ky=arrgg[iv][0];
					for(var iii=0;
					iii<iss;
					iii++)
						{
						if(Number(arrgg[iii][0])>ky)
							{
							ky=arrgg[iii][0];
							ik=iii;
							if(iv>0)iv--
						}
					};
					ar.push([ky,arrgg[ik][1]]);
					arrgg[ik][0]=0
				}
			};
			datatic.push(ar)
		};
		var ids=datatic.length,ig;
		var mpr=maxtick/100;
		var w=($(ctx).width()-120)/size;
		var hh=(($(ctx).height()/100)*20)/100,h=0,w1=0,close=0;
		var maxl;
		for(var i=0;
		i<ids;
		i++)
			{
			ig=datatic[i].length;
			h=((data[i].tick.length/mpr)*hh)/ig;
			close=data[i].tick[0].close;
			maxl=0;
			for(var ii=0;
			ii<ig;
			ii++)
				{
				if(datatic[i][ii][1]>maxl)maxl=datatic[i][ii][1]
			};
			for(var ii=0;
			ii<ig;
			ii++)
				{
				can.fillStyle="#005811";
				if(datatic[i][ii][0]<=close)can.fillStyle="#930000";
				w1=(w/100)*(datatic[i][ii][1]/ (maxl /100));
				can.fillRect(w*((size-1)-i),$(ctx).height()-(h*(ig-ii)),w1-((w1/100)*10),h-(h/100));
				linedat.hp=$(ctx).height()-(h*(ig-ii));
				linedat.hh=h;
				linedat.wp=w*((size-1)-i);
				linedat.ww=(w/100)*(maxl/ (maxl /100));
				if(self.lincen(linedat))
					{
					var textcenasv=datatic[i][ii][0];
					can.fillStyle="rgba(0, 33, 56, 0.61)";
					can.fillRect((w*((size-1)-i))+linedat.ww-1,linedat.hp+(linedat.hh/2)-20,textcenasv.length*10,20);
					can.fillStyle="rgba(86, 176, 104, 1)";
					if(datatic[i][ii][0]<=close)can.fillStyle="rgba(210, 59, 59, 1)";
					can.fillRect((w*((size-1)-i))+linedat.ww-1,linedat.hp+(linedat.hh/2)-40,String(datatic[i][ii][1]).length*15,20);
					can.beginPath();
					can.strokeStyle="#fff";
					can.moveTo(linedat.wp,linedat.hp+(h/2));
					can.lineTo(linedat.wp+linedat.ww,linedat.hp+(h/2));
					can.stroke();
					can.fillStyle="#fff";
					can.font="14px Verdana";
					can.fillText(textcenasv,(w*((size-1)-i))+linedat.ww,linedat.hp+(linedat.hh/2)-5);
					can.fillText(datatic[i][ii][1],(w*((size-1)-i))+linedat.ww,linedat.hp+(linedat.hh/2)-25)
				}
			}
		};
		if($(".preload").is(':visible'))
			{
			$(".preload").hide("fade")
		}
	};
	this.soc=function(pair="EURUSD",size=60)
		{
		// if(window.location.hostname.length!==host5.length)return;
		$(".preload").show("fade");
		if($("#"+$("#pair").attr("val").replace(/[/]/g,'_')).attr("data")!==typ||!wss)
			{
			typ=$("#"+$("#pair").attr("val").replace(/[/]/g,'_')).attr("data");
			if(wss)wss.close();
			if(typ=="OlympTrade")wss=new WebSocket("wss://olymptrade.com/ws2");
			if(typ=="Binomo")wss=new WebSocket("wss://as.binomo.com/");
			wss.onopen=function()
				{
				if(typ=="Binomo")wss.send('subscribe:'+pair)
			};
			wss.onclose=function()
				{
				console.log("Connection closed...");
				self.soc($("#pair").attr("val"),$("#size").val())
			};
			wss.onmessage=function(evt)
				{
				self.predobrdata(evt.data)
			}
		}
		else
			{
			if(typ=="Binomo")
				{
				wss.send('unsubscribe:'+self.data.pair);
				wss.send('subscribe:'+pair)
			};
			ratei=0
		};
		console.clear()
	};
	this.predobrdata=function(data)
		{
		var data=JSON.parse(data);
		if(typ=="Binomo")
			{
			var jso=
				{
			}
			,tim;
			if(rate==0&&data.data[0].assets)rate=data.data[0].assets[0].rate;
			if(data.data[0].assets)
				{
				if(rate==data.data[0].assets[0].rate)
					{
					ratei++
				}
			};
			if(data.errors[0])
				{
				jso=
					{
					"servertime":1234567890
				}
			}
			else if(data.data[0].assets)
				{
				data=data.data[0].assets[0];
				tim=String(Date.parse(data.created_at));
				tim=Number(tim.substring(0,tim.length-3));
				if(reset==true)
					{
					jso["pair"]=data.ric;
					jso["time"]=+tim;
					var tmp = Math.round(data.rate*100000)/100000
					// console.log(Math.trunc((data.ask - data.bid) *100000))
					// console.log(Math.trunc((data.rate - data.bid) *100000))
					// console.log(Math.trunc((data.ask - data.rate) *100000))
					jso["open"]=+tmp;
					jso["low"]=+tmp;
					jso["high"]=+tmp;
					jso["close"]=+tmp;
				}
				else if(reset==false)
					{
					jso["barsize"]=+$("#size").val();
					jso["data"]=[];
					jso["pair"]=data.ric;
					var jskl=
						{
					};
					jskl["pair"]=data.ric;
					jskl["time"]=tim-(tim%$("#size").val());
					var tmp = Math.round(data.rate*100000)/100000
					jskl["open"]=+tmp;
					jskl["low"]=+tmp;
					jskl["high"]=+tmp;
					jskl["close"]=+tmp;
					for(var i=0;
					i<72;
					i++)
						{
						jso["data"].push(jskl);
						jskl["time"]=tim-$("#size").val()
					}
				}
			};
			self.obr(jso)
		}
		else self.obr(data)
	};
	this.indi=function()
		{
		if(!self.data)return;
		// if(window.location.hostname.length!==host5.length)return;
		var data=self.data.data;
		if(!data[0].tick)return;
		var size=$('#period').val(),arrg=[],maxarrg=0,arrgg=[];
		for(var i=0;
		i<size;
		i++)
			{
			if(!data[i].tick)break;
			for(var ii=0;
			ii<data[i].tick.length;
			ii++)
				{
				if(!arrg[data[i].tick[ii].close])
					{
					arrg[data[i].tick[ii].close]=1
				}
				else
					{
					arrg[data[i].tick[ii].close]++
				}
			}
		};
		for(var key in arrg)
			{
			if(arrg[key]>maxarrg)maxarrg=arrg[key];
			arrgg.push([key,arrg[key]])
		};
		var is=arrgg.length,ik,ar=[];
		for(var i=0;
		i<is;
		i++)
			{
			if(Number(arrgg[i][0])>0)
				{
				ik=i;
				ky=arrgg[i][0];
				for(var ii=0;
				ii<is;
				ii++)
					{
					if(Number(arrgg[ii][0])>ky)
						{
						ky=arrgg[ii][0];
						ik=ii;
						if(i>0)i--
					}
				};
				ar.push([ky,arrgg[ik][1]]);
				arrgg[ik][0]=0
			}
		};
		can.clearRect(0,0,$(ctx).width(),$(ctx).height());
		self.risv(ar,maxarrg);
		self.risg(data);
		self.rish(data)
	};
	// if(window.location.hostname.length!==host5.length)return;
	this.obr=function(data)
		{
		if($(".preload").is(':visible'))
			{
			console.clear()
		};
		if(data.servertime)servtim++;
		if(data.time)
			{
			servtim=0;
			var d=data.time%self.data.barsize;
			if(d==0||Math.floor(data.time/self.data.barsize)>Math.floor(self.data.data[0].time/self.data.barsize))
				{
				if(data.time>resettimes)
					{
					resettimes=data.time+10;
					self.data.data.unshift(data);
					localStorage.setItem('data',JSON.stringify(self.data))
				}
			}
			else if(data.close)
				{
				servtim=0;
				if(self.data.data[0].high<data.high)self.data.data[0].high=data.high;
				if(self.data.data[0].low>data.low)self.data.data[0].low=data.low;
				if(self.data.data[0].close!=data.close)
					{
					self.data.data[0].close=data.close;
					if(!self.data.data[0].tick)
						{
						self.data.data[0].tick=[];
						self.data.data[0].tick.push(data)
					}
					else
						{
						self.data.data[0].tick.unshift(data)
					}
				}
			};
			requestAnimationFrame(self.indi)
		}
		else if(data.data)
			{
			if(!reset)
				{
				var cook=JSON.parse(localStorage.getItem('data'));
				if(cook)
					{
					if(cook.pair==data.pair&&cook.barsize==data.barsize)
						{
						self.data=cook
					}
					else
						{
						self.data=data
					}
				}
				else
					{
					self.data=data
				};
				reset=true
			}
		};
		if(servtim>2||ratei>20)
			{
			var h=$(ctx).height(),w=$(ctx).width();
			can.clearRect(0,0,w,h);
			can.strokeStyle="#fff";
			can.font=((w/100)*4)+"px Verdana";
			var txt="Котировки "+$("#pair").text()+" недоступны";
			can.strokeText(txt,(w/txt.length)*4,h/2);
			rate=0;
			ratei=0;
			if($(".preload").is(':visible'))
				{
				$(".preload").hide("fade")
			}
		}
	};
	this.pairchange=function()
		{
		reset=false;
		var afi=0;
		if(cooki.aff)afi=cooki.aff;
		var jso=
			{
			aff:afi,pair:$("#pair").attr("val"),period:$("#period").val(),size:$("#size").val(),date:cooki.date
		};
		servtim=0;
		localStorage.setItem('dsav',JSON.stringify(jso));
		self.soc($("#pair").attr("val"),$("#size").val())
	};
	$('#size').change(function()
		{
		self.pairchange()
	}
	);
	$('#pair').click(function()
		{
		if(!$(".divscrol").is(':visible'))
			{
			$(".divscrol").show("blind")
		}
		else $(".divscrol").hide("blind")
	}
	);
	$('#valx').click(function()
		{
		if($(".divscrol").is(':visible'))
			{
			$(".divscrol").hide("blind")
		}
	}
	);
	$('.sels').click(function()
		{
		if($(this).attr("val")!==$("#pair").attr("val"))
			{
			$("#pair").attr("val",$(this).attr("val"));
			$("#pair").html($(this).html());
			self.pairchange()
		};
		$(".divscrol").hide("blind")
	}
	);
	$('#period').change(function()
		{
		if($(this).val()<2)$(this).val(2);
		if($(this).val()>72)$(this).val(72);
		var afi=0;
		if(cooki.aff)afi=cooki.aff;
		var jso=
			{
			aff:afi,pair:$("#pair").attr("val"),period:$("#period").val(),size:$("#size").val(),date:cooki.date
		};
		localStorage.setItem('dsav',JSON.stringify(jso))
	}
	);
	cooki=JSON.parse(localStorage.getItem('dsav'));
	var dTime=new Date();
	dTime=dTime.getTime();
	if(cooki)
		{
		if(cooki.pair)
			{
			$("#pair").attr("val",cooki.pair);
			$("#pair").html($("#"+cooki.pair.replace(/[/]/g,'_')).html())
		};
		if(cooki.period)$("#period").val(cooki.period);
		if(cooki.size)
			{
			$("#size>option:eq(2)").removeAttr("selected");
			$("#"+cooki.size).attr("selected","selected")
		}
	}
	else
		{
		var jso=
			{
			aff:"null",pair:$("#pair").val(),period:$("#period").val(),size:$("#size").val(),date:dTime
		};
		localStorage.setItem('dsav',JSON.stringify(jso));
		cooki=jso
	};
	var ckdtms=String(cooki.date).replace(/[/]/g,'');
	
	// if(window.location.hostname.length!==host5.length)return;
	self.soc($("#pair").attr("val"),$("#size").val())
};
window.onload=Sign();
