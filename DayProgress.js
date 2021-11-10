var isTesting = false;


const width = 125
const h = 5
const w = new ListWidget()
w.backgroundColor = new Color("#222222")

const colorBlue = "#00ced1";
const colorDarkBlue = "#006a6b";
const colorGreen = "#00dd2f";
const colorRed = "#B94E48";
const colorYellow = "#f0e000";
const colorGray = "#48484b";
const colorLightGray = "#efefef";


var now = new Date();

if(isTesting){
    now = new Date(2021,5,24, 13,55,0)
}
var weekday = now.getDay();
var currentHour = now.getHours();
const minutesUntilNextHour = now.getMinutes() // for this hour
var currentTimeInMinutes = currentHour *60 + minutesUntilNextHour;

var hourPlayTimeStart = 18;var hourPlayTimeEnd = 23;
// Flex time                    = 8 am - 9 am               = 1 hour
// work time                    = 9 am - 1 pm & 2 pm - 5 pm = 7 hours
// work out                     = 5 pm - 6 pm               = 1 hour
// play time                    = 6 pm - 11 pm              = 5 hours
// watch tv and go to sleep     = 11 pm - 8 am              = 9 hours



var isItTheWeekend = weekday == 0 || weekday == 6;
var isItLunchTime = currentHour == 13;
var isItWorkOutTime = currentHour == 17;
var isItPlayTime = currentHour > hourPlayTimeStart && currentHour <  hourPlayTimeEnd;
    
const workTotalHours = 9 *60;
const workStartTime = 9 *60;
const workEndingTime = (17 *60) - (9 *60);
const workCurrentTime = (currentHour *60) + minutesUntilNextHour - (9 *60)





StartApp();

Script.setWidget(w)
Script.complete()
w.presentLarge()





function StartApp(){
    //4th Quarter
    CreateTitle(getQuarter(), colorBlue, 13, 0)
    if (isItTheWeekend && false) {
        CreateTitle("It's the weekend", colorGreen)
    } else {

        //last update string
        CreateTitle(getWeekDayString() + (isTesting || true ? " | Last update: " + now.toISOString().split('T')[0] + " at " +now.toLocaleTimeString() : ""), colorLightGray, 8)
        if(currentHour < 9){
            //work count down
            CreateTitle(getTimeRemainingUntilWorkMessage(), colorYellow)
        } else {

            CreateTitle("Day Progress", colorBlue, 9,0)
            CreateTitle("9am"+createSpaces(33)+"6pm", colorLightGray, 9,1)
            CreateProgressBar(workTotalHours, workCurrentTime, colorGreen, colorRed)
            var percentage = getPercent(workCurrentTime,workTotalHours, 100);
            CreateTitle(getProgressSpace(percentage,5)+ percentage + "%", colorLightGray, 7, 0)

            if(percentage >= 100){
                CreateTitle("Day completed", colorGreen)
            }
        }
    }
    // LUNCH TIME
    if (isItLunchTime) {
              CreateTitle("Lunch time", colorGreen, 15, 6);
              CreateProgressBar(60, minutesUntilNextHour)

    // WORK OUT TIME
    } else if(isItWorkOutTime){
              CreateTitle("Work out time", colorGreen, 15, 6);
              CreateProgressBar(60, minutesUntilNextHour)

    // PLAY TIME
    } else if(isItPlayTime){
             CreateTitle("It's Play Time!", colorGreen, 15, 6);
             
             // TODO: show indicator on time progress
             //CreateProgressBar(total, havegone, barColor = colorGreen, backgroundColor = colorRed)
             // total = end*60min - start*6min
             // havegone = time in minutes - start*60min
             // barColor = colorGreen
             // backgroundcolor = colorblue
             
             log("total: " + (hourPlayTimeEnd*60 - hourPlayTimeStart*60))
             log("Current: " + (currentTimeInMinutes - hourPlayTimeStart*60))
             CreateProgressBar((hourPlayTimeEnd*60 - hourPlayTimeStart*60), (currentTimeInMinutes - hourPlayTimeStart*60)  
                , colorGreen, colorDarkBlue)
             CreateTitle("6pm" + createSpaces(20)+"11pm")
    }else
    {
        CreateTitle("This week", colorBlue, 9, 0)
                    CreateTitle("Sun"+createSpaces(35)+"Sat", colorLightGray, 9,1)
        CreateProgressBar(6, weekday)
        log(weekday)
        CreateTitle(getProgressSpace(weekday,80)+ getWeekDayString().substring(0,3), colorLightGray, 7, 0)


        CreateTitle("This year", colorBlue, 9, 3)
        CreateProgressBar(365, getDayOfYear())
        var percentage = getPercent(getDayOfYear(),365, 100);
        CreateTitle(getProgressSpace(percentage,6)+ percentage + "%", colorLightGray, 7, 0)
        CreateTitle(getProgressSpace(percentage,6)+ getQuarter(), colorLightGray, 7, 3)
        CreateTitle("Day " +getDayOfYear() + " of " + 365 + " | " + (365-getDayOfYear())+" days remaining this year.", colorLightGray , 6)
    }
}

function getProgressSpace(number, multiplier = 4){
  
 return createSpaces((number/10)*multiplier);
}


function createSpaces(number){
    var spaceString = "";
    for(let i = 0; i < number; i++){
        spaceString = spaceString + " ";
    }
    return spaceString;
}

function getQuarter() {
    var monthNumber = now.getMonth()
    var message = "";
    if (monthNumber < 4) {
        message = "1st Quarter"
    } else if (monthNumber < 6) {
        message = "2nd Quarter"
    } else if (monthNumber < 8) {
        message = "3rd Quarter"
    } else {
        message = "4th Quarter"
    }
    return message;
}
function getTimeRemainingUntilWorkMessage(){
    return "Work starts in " + ((9*60)- (currentHour*60+minutesUntilNextHour))+ " minutes(s)";
}


function getDayOfYear(){
var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start;
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);
console.log('Day of year: ' + day);
return day;
}


function GetCurrentTime(){
  var time = now.getHours() + ":" + now.getMinutes();
  return time;
}

function getPercent(SmallNumber, BigNumber, maxNumber){
    var percent = (parseInt((SmallNumber / BigNumber) * 100));

    if(maxNumber != null && percent > maxNumber){
        return maxNumber;
    }
    return percent;
}
function getRatio(firstNumber, secondNumber){
  return firstNumber + "/" + secondNumber;
}


function CreateTitle(str, color = colorBlue, size = 13, space = 6) {
    const titlew = w.addText(str)
    titlew.textColor = new Color(color)
    titlew.font = Font.boldSystemFont(size)
    w.addSpacer(space)
}
function CreateProgressBar(total, havegone, barColor = colorGreen, backgroundColor = colorRed) {
    const imgw = w.addImage(drawProgressBar(total, havegone, barColor, backgroundColor))
    imgw.imageSize = new Size(width, h)
}
// function CreateBarPercent(total, haveGone, spacer = 6) {
//     CreateProgressBar(total, haveGone, colorGreen, colorRed)
//     CreateTitle(getPercent(haveGone,total), colorLightGray, 10, 0)
//     w.addSpacer(spacer)
// }



function getWeekDayString() {
    var weekday = now.toLocaleString('en-us', {
        weekday: 'long'
    });
    return weekday;
}


function drawProgressBar(total, havegone, barColor, backgroundColor) {
    log(havegone / total);
    const context = new DrawContext()
    context.size = new Size(width, h)
    context.opaque = false
    context.respectScreenScale = true
    context.setFillColor(new Color(backgroundColor))
    const path = new Path()
    path.addRoundedRect(new Rect(0, 0, width, h), 3, 2)
    context.addPath(path)
    context.fillPath()
    context.setFillColor(new Color(barColor))
    const path1 = new Path()
    path1.addRoundedRect(new Rect(0, 0, width * havegone / total, h), 3, 2)
    context.addPath(path1)
    context.fillPath()
    return context.getImage()
}
