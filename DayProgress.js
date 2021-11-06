var isTesting = true;


const width = 125
const h = 5
const w = new ListWidget()
w.backgroundColor = new Color("#222222")

const colorBlue = "#00ced1";
const colorGreen = "#00dd2f";
const colorRed = "#B94E48";
const colorYellow = "#f0e000";
const colorGray = "#48484b";
const colorLightGray = "#efefef";


var now = new Date();

if(isTesting){
    now = new Date(2021,10,3, 18,1,0)
}
var weekday = now.getDay();
var currentHour = now.getHours();
const minutes = now.getMinutes()

var isItTheWeekend = weekday == 0 || weekday == 6;
var isItLunchTime = currentHour == 13;
    
    const workTotalHours = 9;
    const workStartTime = 9;
    const workEndingTime = 18 - 9;
    const workCurrentTime = currentHour - 9








StartApp();

Script.setWidget(w)
Script.complete()
w.presentLarge()





function StartApp(){
    CreateTitle(getQuarter(), colorBlue, 13, 0)
    if (isItTheWeekend) {
        CreateTitle("It's the weekend", colorGreen)
    } else {
        CreateTitle(getWeekDayString() + " | Last update: " + now.toISOString().split('T')[0] + " at " +now.toLocaleTimeString(), colorLightGray, 8)
        if(currentHour < 9){
            CreateTitle(getTimeRemainingUntilWorkMessage(), colorYellow)
        } else {
            CreateTitle("Work Day Progress")
            //working here
            CreateProgressBar(workTotalHours, workCurrentTime, colorGreen, colorRed)
            CreateTitle(getProgressSpace(getPercent(workCurrentTime,workTotalHours))+ getPercent(workCurrentTime,workTotalHours) + "%", colorLightGray, 10, 0)
            w.addSpacer(2)
        }
        w.addSpacer(3)
    }

    if (!isItLunchTime) {
        CreateTitle("This week", colorBlue, 9, 3)
        CreateProgressBar(7, (weekday + 1) == 1 ? 7 : weekday + 1)

        CreateTitle("This year", colorBlue, 9, 3)
        CreateProgressBar(365, getDayOfYear())
        CreateTitle(getRatio(getDayOfYear(), 365 ), colorLightGray, 9)
    } else {
        CreateTitle("Lunch time", colorGreen, 20, 6);
    }
}

function getProgressSpace(number){
  log("number:  " + number);
    log("number2:  " + (number/10)*5);
  
 return createSpaces((number/10)*4);
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
    return "Work starting in " + (9 - currentHour) + " hour(s)";
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

function getPercent(SmallNumber, BigNumber){
  return (parseInt((SmallNumber / BigNumber) * 100));
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
