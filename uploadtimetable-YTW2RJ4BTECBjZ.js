// Define timetable file from upload box
var myFile = document.getElementById("timetableupload");

// Define global variables
var jcaldata;
var jsontimetable;

// List of days corresponding to index of .getDay()
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Start parsing timetable when user uploads file
myFile.addEventListener('change',function(){
    var fileReader=new FileReader();
    fileReader.onload=function(){
        // Get vevent items from .ics file
        jcaldata=ICAL.parse(fileReader.result)[2];
        //console.log(jcaldata);
        parseTimetable();
    }
   fileReader.readAsText(this.files[0]);
})

// Create function to add days to a date
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// Function to check if time is in array
function isInArray(array, value) {
    return !!array.find(item => {return item.getTime() == value.getTime()});
  }

// Function to capitalize first letter of every word
function capitalizeWords(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

// Main timetable parsing function
function parseTimetable(){
    const classarray=[];
    const datearray=[];

    // Find first and last dates of a full school week
    firstmondayvevent=findFirstMonday();
    firsteventdate=new Date(firstmondayvevent.toDateString());
    lasteventdate=new Date(firstmondayvevent.addDays(4).toDateString());

    // Loop through all vevents within date range
    currentveventdate=firsteventdate
    let veventparseloop=1;
    // Stop looping through events when past the last day of the week
    while (currentveventdate<=lasteventdate){
        // Iterate over vevents
        currentvevent=jcaldata[veventparseloop][1];
        currentveventdate=new Date(new Date(currentvevent[0][3]).toDateString());
        // Check if vevent is within date range
        if ((currentveventdate<=lasteventdate) && (currentveventdate>=firsteventdate)){
            // Get class details from vevent
            currentveventperiod=currentvevent[4][3].split("\n")[1].replace("Period: ","");
            currentveventname=currentvevent[5][3];
            currentveventlocation=currentvevent[6][3].replace("Room: ","");
            currentveventteacher=capitalizeWords(currentvevent[4][3].split("\n")[0].replace("Teacher:  ","").toLowerCase());
            // Check if class is before/after school
            if (currentveventperiod.length<=8){
                // Check if class is between period 1 and 8
                if ((parseInt(currentveventperiod.slice(-1))>=1) && (parseInt(currentveventperiod.slice(-1))<=8)){
                    // Set period to only the integer
                    currentveventperiod=currentveventperiod.slice(-1);
                    // Add cllass details to array of all classes
                    tempclassdetails=[currentveventdate,currentveventperiod,currentveventname,currentveventlocation,currentveventteacher];
                    classarray.push(tempclassdetails);
                    // Add date to datearray if not already present
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

// Finds date of first monday in the ical file
function findFirstMonday(){
    // Loops through all vevents
    for (let i=0; i < jcaldata.length; i++){
        // Gets date of current vevent
        var date=new Date(jcaldata[i][1][0][3]);
        // Checks if date of vevent is a Monday
        if (date.getDay()==1){
            // Returns the date of the first monday as a Date object            
            return date;
        }
    }
}

// Creates structured json file of all classes in a week
function createTimetableJson(classarray,datearray){
    var timetabledict={};
    let x=0
    // Iterate over each day to create a dictionary entry for each day
    for (let i=0; i < datearray.length; i++){
        var tempdaydict={};
        var daycompleted=false;
        // Iterate over all classes within the current loop day
        while (daycompleted==false){
            // Gets class details from classarray created by parseTimetable function
            classlistitemtemp=classarray[x];
            // Checks if the current iterated class is still on the current loop day
            if (classlistitemtemp[0].getTime()==datearray[i].getTime()){
                // Creates a dictionary item for that period's class details
                tempdaydict[classlistitemtemp[1]]=[classlistitemtemp[2],classlistitemtemp[3],classlistitemtemp[4]];
                // Checks if there are any remaining classes in the list
                if (classarray[x+1]!=undefined){
                    // Continues to the next class in classarray if there are remaining items
                    x++;
                }
                // Completes the loop if all clawssarray items have been parsed
                else {
                    timetabledict[days[datearray[i].getDay()]]=tempdaydict;
                    daycompleted=true;
                }
            }
            // Writes the day dictionary to master dictionary and continues to next day if all classes for that day have been added
            else {
                timetabledict[days[datearray[i].getDay()]]=tempdaydict;
                daycompleted=true;
            }
        }
    }

    // Convert the master timetable dictionary to JSON
    jsontimetable=JSON.stringify(timetabledict);
    //console.log(jsontimetable);

    // Checks if there is already a timetable in localStorage and saves the new one
    if (localStorage.getItem("userTimetable")!=null){
        localStorage.removeItem("userTimetable");
    }
    localStorage.setItem("userTimetable", jsontimetable);
    
    // Send confirmation that timetable has been saved
    document.getElementById("uploadstatus").innerHTML = "Status: Timetable saved successfully! Please <a class='link' href='/'>return to the main page<a> to see your timetable.";
}

function clearTimetableStorage(){
    try{
        localStorage.removeItem('userTimetable')
        document.getElementById("uploadstatus").innerHTML = "Status: Timetable deleted successfully! <a class='link' href='/'>Click here<a> to return to the main page.";
    }
    catch{}
}

// Test if timetable has been saved to local storage
if (localStorage.getItem("userTimetable")!=null){
    console.log(localStorage.getItem("userTimetable"))
}