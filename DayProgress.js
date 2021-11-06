var isTesting = false;


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
    now = new Date(2021,5,24, 18,28,0)
}
var weekday = now.getDay();
var currentHour = now.getHours();
const minutes = now.getMinutes()

var isItTheWeekend = weekday == 0 || weekday == 6;
var isItLunchTime = currentHour == 13;
    
    const workTotalHours = 9 *60;
    const workStartTime = 9 *60;
    const workEndingTime = (18 *60) - (9 *60);
    const workCurrentTime = (currentHour *60) + minutes - (9 *60)








StartApp();

Script.setWidget(w)
Script.complete()
w.presentMedium()





function StartApp(){
    //4th Quarter
    CreateTitle(getQuarter(), colorBlue, 13, 0)
    if (isItTheWeekend && false) {
        CreateTitle("It's the weekend", colorGreen)
    } else {

        //last update string
        CreateTitle(getWeekDayString() + (isTesting ? " | Last update: " + now.toISOString().split('T')[0] + " at " +now.toLocaleTimeString() : ""), colorLightGray, 8)
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

    if (!isItLunchTime) {
        CreateTitle("This week", colorBlue, 9, 0)
                    CreateTitle("Sun"+createSpaces(35)+"Sat", colorLightGray, 9,1)
        CreateProgressBar(7, (weekday + 1) == 1 ? 7 : weekday + 1)


        CreateTitle("This year", colorBlue, 9, 3)
        CreateProgressBar(365, getDayOfYear())
        var percentage = getPercent(getDayOfYear(),365, 100);
        CreateTitle(getProgressSpace(percentage,6)+ percentage + "%", colorLightGray, 7, 0)
        CreateTitle(getProgressSpace(percentage,6)+ getQuarter(), colorLightGray, 7, 6)
        CreateTitle("Day " +getDayOfYear() + " of " + 365 , colorLightGray, 6)
    } else {
        CreateTitle("Lunch time", colorGreen, 20, 6);
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
