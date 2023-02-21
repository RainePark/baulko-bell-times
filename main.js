var newday = new Date();
var day = newday.getDay();
var currentsec = newday.getHours()*3600+newday.getMinutes()*60+newday.getSeconds();
var daydata;
var daytimetable;
var numberofperiods;
var table = "<table id='tableid'>";
var periodtimename = [];
var theme = 0;
var weekend = 1;

//document.getElementsByClassName("classid")[0].innerHTML = "replacewith";

document.getElementsByClassName("tablenojs")[0].style.opacity = 0;
document.getElementsByClassName("tablenojs")[0].style.display = "none";

getdatafortoday();
displaystartandfinishtime();
writetotable();
updateprogress();
showtimetable();

function isNumeric(str) {
	if (typeof str != "string") return false // we only process strings!  
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		   !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

var updatetime = setInterval(update,1000);

function update(){
  var oldday = day;
  getdatafortoday();
  if (oldday == day){
    updateprogress();
  }
  else{
    document.getElementsByTagName("body")[0].innerHTML = "";
    displaystartandfinishtime();
    writetotable();
    updateprogress();
  }
}

function getdatafortoday(){
  newday = new Date();
  day = newday.getDay();
  currentsec = newday.getHours()*3600+newday.getMinutes()*60+newday.getSeconds();
  
  // Change day variable for debugging 
  //day=1

  //get data for today's day
  if (day == 1){
    daydata = belltimes.Monday;
	if (localStorage.getItem("userTimetable")!=null){
		daytimetable = JSON.parse(localStorage.getItem("userTimetable"))["Monday"]
	}
	weekend = 0;
  }
  else if (day == 2){
    daydata = belltimes.Tuesday;
	if (localStorage.getItem("userTimetable")!=null){
		daytimetable = JSON.parse(localStorage.getItem("userTimetable"))["Tuesday"]
	}
	weekend = 0;	
  }
  else if (day == 3){
    daydata = belltimes.Wednesday;
	if (localStorage.getItem("userTimetable")!=null){
		daytimetable = JSON.parse(localStorage.getItem("userTimetable"))["Wednesday"]
	}
	weekend = 0;
  }
  else if (day == 4){
    daydata = belltimes.Thursday;
	if (localStorage.getItem("userTimetable")!=null){
		daytimetable = JSON.parse(localStorage.getItem("userTimetable"))["Thursday"]
	}
	weekend = 0;
  }
  else if (day == 5){
    daydata = belltimes.Friday;
	if (localStorage.getItem("userTimetable")!=null){
		daytimetable = JSON.parse(localStorage.getItem("userTimetable"))["Friday"]
	}
	weekend = 0;
  }
  else{
    daydata = belltimes.Monday;
	if (localStorage.getItem("userTimetable")!=null){
		daytimetable = JSON.parse(localStorage.getItem("userTimetable"))["Monday"]
	}
	// Toggle weekend to show or hide bell times on weekends (0=show,1=hide)
	weekend = 1;
  }
  numberofperiods = daydata.period.length;
}

function displaystartandfinishtime(){
	if (weekend == 0){
		for (var a = 0;a<numberofperiods-2;a++){
		//get period start and finish as a string to show user
		var periodstarthour = Math.floor(daydata.times[a*2]/60).toString();
		var periodstartmin = (daydata.times[a*2]%60).toString();
		var periodendhour = Math.floor(daydata.times[a*2+1]/60).toString()
		var periodendmin = (daydata.times[a*2+1]%60).toString();
		//pad 0 if single digit minute
		if (periodstartmin.length == 1){
			periodstartmin = "0" + periodstartmin;
		}
		if (periodendmin.length == 1){
			periodendmin = "0" + periodendmin;
		}
		periodtimename[a+1] = periodstarthour + ":" + periodstartmin + " - " + periodendhour + ":" + periodendmin;
		}

		// display first and last period times
		var periodfirsthour = Math.floor(daydata.times[0]/60).toString();
		var periodfirstmin = (daydata.times[0]%60).toString();
		var periodlasthour = Math.floor(daydata.times[numberofperiods*2-5]/60).toString();
		var periodlastmin = (daydata.times[numberofperiods*2-5]%60).toString();
		if (periodfirstmin.length == 1){
			periodfirstmin = "0" + periodfirstmin;
		}
		if (periodlastmin.length == 1){
			periodlastmin = "0" + periodlastmin;
		}
		periodtimename[0] = periodfirsthour + ":" + periodfirstmin;
		periodtimename[numberofperiods-1] = periodlasthour + ":" + periodlastmin;
	}
	else{
		weekend = 1
	}
}

function writetotable(){
	if (weekend == 0){
		//first row
		table = table + "<tr><td class='notimetable'>" + daydata.period[0] + "</td><td class='notimetable'>" + periodtimename[0] + "</td><td><div class='progressblock'><div class='fullbar'><div class='progress'><div class='textbar'><p class='progresstext'></p></div></div></div></div></td></tr>";
		//all rows
		for (a = 1; a<numberofperiods-1; a++){
			table = table + "<tr><td class='notimetable'>" + daydata.period[a] + "</td><td class='notimetable'>" + periodtimename[a] + "</td><td><div class='progressblock'><div class='fullbar'><div class='progress'><div class='textbar'><p class='progresstext'></p></div></div></div></div></td></tr>";
		}
		//last row
		table = table + "<tr><td class='notimetable'>" + daydata.period[numberofperiods-1] + "</td><td class='notimetable'>" + periodtimename[numberofperiods-1] + "</td><td><div class='progressblock'><div class='fullbar'><div class='progress'><div class='textbar'><p class='progresstext'></p></div></div></div></div></td></tr>";
		table += "</table>";
		document.getElementById("tableclass").innerHTML = table;
	}
	else{
		document.getElementsByClassName("tableclass")[0].innerHTML = "<br><p class='info' style='margin-top:0px; margin-bottom: 12px;'>it's a weekend lol come back on monday for bell times<br>anyways here are the bell times for the week:</p>";
		document.getElementsByClassName("tablenojs")[0].style.opacity = 100;
		document.getElementsByClassName("tablenojs")[0].style.display = "";
	}
}

function updateprogress(){
	if (weekend ==0){
		//Start
		//If class start
		if(currentsec>=daydata.times[0]*60 && currentsec<= daydata.times[daydata.times.length - 1]*60){
			document.getElementsByClassName("progress")[0].style.width = "100%";
			document.getElementsByClassName("progress")[daydata.period.length-1].style.width = "0";
			for(a=0; a<numberofperiods-2;a++){
				//useless?
				if (currentsec < daydata.times[2*a]*60){
					document.getElementsByClassName("progress")[a+1].style.width = "0%";
				}
				else if(currentsec >= daydata.times[2*a+1]*60){
					document.getElementsByClassName("progress")[a+1].style.width = "100%";
				}
				else{
					document.getElementsByClassName("progress")[a+1].style.width = ((((currentsec/60) - daydata.times[2*a])/(daydata.times[2*a+1]-daydata.times[2*a]))*100).toString() + "%";
				}
			}
		}
		//if day finish
		else if (currentsec>= daydata.times[daydata.times.length - 1]*60){
			for (a = 0; a<daydata.period.length;a++){
				document.getElementsByClassName("progress")[a].style.width = "100%";
			}
		}
		else{
			for (a = 0; a<daydata.period.length;a++){
				document.getElementsByClassName("progress")[a].style.width = "0%";
			}
		}
		for (a = 0; a<daydata.period.length-2;a++){
			if(currentsec > (daydata.times[2*a+1]*60)){
				document.getElementsByClassName("progresstext")[a+1].innerHTML = "Complete!"
			}
			else if(currentsec < (daydata.times[2*a]*60)){
				document.getElementsByClassName("progresstext")[a+1].innerHTML = "";
			}
			else if ((currentsec > (daydata.times[2*a]*60)) && (currentsec < (daydata.times[2*a+1]*60))) {
				document.getElementsByClassName("progresstext")[a+1].innerHTML = Math.floor((daydata.times[2*a+1]*60-currentsec)/60).toString() + "m " + Math.floor(((daydata.times[2*a+1]*60-currentsec)%60)).toString() + "s";
				// Code for time in title last
				//document.title = "Baulko Bell Times (" + Math.floor((daydata.times[2*a+1]*60-currentsec)/60).toLocaleString(undefined, {minimumIntegerDigits: 2}).toString() + ":" + Math.floor(((daydata.times[2*a+1]*60-currentsec)%60)).toLocaleString(undefined, {minimumIntegerDigits: 2}).toString() + " left)";
				// Code for time in title first
				document.title = "[" + Math.floor((daydata.times[2*a+1]*60-currentsec)/60).toLocaleString(undefined, {minimumIntegerDigits: 2}).toString() + ":" + Math.floor(((daydata.times[2*a+1]*60-currentsec)%60)).toLocaleString(undefined, {minimumIntegerDigits: 2}).toString() + " left] Baulko Bell Times";
			}
		}
		//time till school start
		if(currentsec < (daydata.times[0]*60)){
			//if over an hour till school start
			if((daydata.times[0]*60-currentsec)>3600){
				document.getElementsByClassName("progresstext")[0].innerHTML = "In " + Math.floor((daydata.times[0]*60-currentsec)/3600).toString() + "h " + Math.floor(((daydata.times[0]*60-currentsec)%3600)/60).toString() + "m";
			}
			//if under an hour till school start
			else{
				document.getElementsByClassName("progresstext")[0].innerHTML = "In " + Math.floor((daydata.times[0]*60-currentsec)/60).toString() + "m " + Math.floor(((daydata.times[0]*60-currentsec)%60)).toString() + "s";
			}
		}
		else{
			document.getElementsByClassName("progresstext")[0].innerHTML = "procrastinate hard!!!";
		}
		if(currentsec > (daydata.times[daydata.times.length-1]*60)){
			document.getElementsByClassName("progresstext")[daydata.period.length-1].innerHTML = "go home nerd";
			document.title = "Baulko Bell Times"
		}
		else{
			document.getElementsByClassName("progresstext")[daydata.period.length-1].innerHTML = "";
		}
	}
	else{
		weekend = 1;
	}
}

function showtimetable(){
	if (localStorage.getItem("userTimetable")!=null){
		var tableindexes={};
		for (let i=0; i < daydata['period'].length; i++){
			if (['1','2','3','4','5','6','7','8'].includes(daydata['period'][i].slice(-1))){
				tableindexes[daydata['period'][i].slice(-1)]=i;
			}
		}
		for (let x=1; x < Object.keys(daytimetable).length+1; x++){
			cleanclassname=daytimetable[x][0].replace(/.$/, '').split(": ")[1].split(" ");
			if (cleanclassname[0]=="Yr" && isNumeric(cleanclassname[1])){
				cleanclassname.shift();
				cleanclassname.shift();
			}
			cleanclassname=cleanclassname.join(" ")+" ("+daytimetable[x][0].split(": ")[0]+")";

			if (daytimetable[x][1]!=""){
				classlocation=" in " + daytimetable[x][1]
			}
			else{
				classlocation=""
			}

			if (cleanclassname.split(" ")[0]=="Study"){
				cleanclassname="Study Period"
				classlocation=""
			}
			if (cleanclassname.split(" ")[3] == "Developmen"){
				cleanclassname=cleanclassname.replace("Developmen","Development")
			}

			document.getElementById("tableid").rows[tableindexes[x]].cells[0].innerHTML=document.getElementById("tableid").rows[tableindexes[x]].cells[0].innerHTML+"<br>"+"<a class='timetableinfo'>"+cleanclassname+classlocation+"</a>";
			document.getElementById("tableid").rows[tableindexes[x]].cells[0].outerHTML=document.getElementById("tableid").rows[tableindexes[x]].cells[0].outerHTML.replace(" class=\"notimetable\"","");
			//document.getElementById("tableid").rows[tableindexes[x]].cells[1].innerHTML=document.getElementById("tableid").rows[tableindexes[x]].cells[1].innerHTML+"<br><a class='timetableinfo'>Room: "+daytimetable[x][1]+" || Teacher: "+daytimetable[x][2]+"</a>";
			//document.getElementById("tableid").rows[tableindexes[x]].cells[1].innerHTML=document.getElementById("tableid").rows[tableindexes[x]].cells[1].innerHTML+"<br><a class='timetableinfo'>Room: "+daytimetable[x][1]+"</a>";
			//document.getElementById("tableid").rows[tableindexes[x]].cells[1].outerHTML=document.getElementById("tableid").rows[tableindexes[x]].cells[1].outerHTML.replace(" class=\"notimetable\"","");
		}
	}
}