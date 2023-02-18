var myFile = document.getElementById("timetableupload");
var jcaldata;
var jsontimetable;
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

myFile.addEventListener('change',function(){
    var fileReader=new FileReader();
    fileReader.onload=function(){
        jcaldata=ICAL.parse(fileReader.result)[2];
        //console.log(jcaldata);
        parseTimetable();
    }
   fileReader.readAsText(this.files[0]);
})

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function isInArray(array, value) {
    return !!array.find(item => {return item.getTime() == value.getTime()});
  }

function capitalizeWords(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

function parseTimetable(){
    const classarray=[];
    const datearray=[];

    firstmondayvevent=findFirstMonday();
    firsteventdate=new Date(firstmondayvevent.toDateString());
    lasteventdate=new Date(firstmondayvevent.addDays(4).toDateString());
    currentveventdate=firsteventdate
    let veventparseloop=1;
    
    while (currentveventdate<=lasteventdate){
        currentvevent=jcaldata[veventparseloop][1];
        currentveventdate=new Date(new Date(currentvevent[0][3]).toDateString());
        if ((currentveventdate<=lasteventdate) && (currentveventdate>=firsteventdate)){
            currentveventperiod=currentvevent[4][3].split("\n")[1].replace("Period: ","");
            currentveventname=currentvevent[5][3];
            currentveventlocation=currentvevent[6][3].replace("Room: ","");
            currentveventteacher=capitalizeWords(currentvevent[4][3].split("\n")[0].replace("Teacher:  ","").toLowerCase());
            if (currentveventperiod.length<=8){
                if ((parseInt(currentveventperiod.slice(-1))>=1) && (parseInt(currentveventperiod.slice(-1))<=8)){
                    currentveventperiod=currentveventperiod.slice(-1);
                    tempclassdetails=[currentveventdate,currentveventperiod,currentveventname,currentveventlocation,currentveventteacher];
                    classarray.push(tempclassdetails);
                    if (isInArray(datearray,currentveventdate)==false){
                        datearray.push(currentveventdate);
                    }
                }
            }
        }
        veventparseloop++;
    }
    //console.log(classarray);
    //console.log(datearray);
    createTimetableJson(classarray,datearray);
}

function findFirstMonday(){
    for (let i=0; i < jcaldata.length; i++){
        var date=new Date(jcaldata[i][1][0][3]);
        if (date.getDay()==1){
            return date;
        }
    }
}

function createTimetableJson(classarray,datearray){
    var timetabledict={};
    let x=0
    for (let i=0; i < datearray.length; i++){
        var tempdaydict={};
        var daycompleted=false;
        while (daycompleted==false){
            classlistitemtemp=classarray[x];
            if (classlistitemtemp[0].getTime()==datearray[i].getTime()){
                tempdaydict[classlistitemtemp[1]]=[classlistitemtemp[2],classlistitemtemp[3],classlistitemtemp[4]];
                if (classarray[x+1]!=undefined){
                    x++;
                }
                else {
                    timetabledict[days[datearray[i].getDay()]]=tempdaydict;
                    daycompleted=true;
                }
            }
            else {
                timetabledict[days[datearray[i].getDay()]]=tempdaydict;
                    daycompleted=true;
            }
        }
    }
    jsontimetable=JSON.stringify(timetabledict);
    console.log(jsontimetable);
    if (localStorage.getItem("userTimetable")!=null){
        localStorage.removeItem("userTimetable");
    }
    localStorage.setItem("userTimetable", jsontimetable);
}


if (localStorage.getItem("userTimetable")!=null){
    console.log(localStorage.getItem("userTimetable"))
}
