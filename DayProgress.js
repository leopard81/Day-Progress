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
const now = new Date()
var weekday = now.getDay();
const minutes = now.getMinutes()

StartApp();
Script.setWidget(w)
Script.complete()
w.presentMedium()









function StartApp(){
    CreateTitle(getQuarter(), colorBlue, 13, 0)
    if (weekday == 0 || weekday == 6) {
        CreateTitle("It's the weekend", colorGreen)
    } else {
        CreateTitle(getWeekDayString() + " | Last update: " + GetCurrentTime(), colorLightGray, 8)
        getTimeRemainingWidget()
        w.addSpacer(3)
    }

    if (!isItLunchTime()) {
        CreateTitle("This week", colorBlue, 9, 3)

        getwidget(7, (weekday + 1) == 1 ? 7 : weekday + 1)
        CreateTitle("This year", colorBlue, 9, 3)

        getwidget(12, now.getMonth() + 1)
    } else {
        CreateTitle("Lunch time", colorGreen, 20, 6);
    }
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

function getTimeRemainingWidget() {
    var currentHour = now.getHours();
    if (currentHour <= 9) {
        var message = "Work starting in " + (9 - currentHour) + " hour(s)";
        CreateTitle(message, colorYellow)
    } else {
        CreateTitle("Day Progress")
        const imgw = w.addImage(createProgress(18 - 9, currentHour - 9, colorGreen, colorRed))
        imgw.imageSize = new Size(width, h)
        CreateTitle(CreatePercent((currentHour - 9),(18 - 9)), colorLightGray, 10, 0)
        w.addSpacer(2)
    }
}




function GetCurrentTime(){
  var time = now.getHours() + ":" + now.getMinutes();
  return time;
}

function CreatePercent(SmallNumber, BigNumber){
  return (parseInt((SmallNumber / BigNumber) * 100)) + "%";
}


function CreateTitle(str, color = colorBlue, size = 13, space = 6) {
    const titlew = w.addText(str)
    titlew.textColor = new Color(color)
    titlew.font = Font.boldSystemFont(size)
    w.addSpacer(space)
}


function isItLunchTime() {
    var time = now.getHours();
    return time == 11;
}


function getWeekDayString() {
    var weekday = new Date().toLocaleString('en-us', {
        weekday: 'long'
    });
    return weekday;
}

function getwidget(total, haveGone) {
    const imgw = w.addImage(createProgress(total, haveGone, colorGreen, colorRed))
    imgw.imageSize = new Size(width, h)
    CreateTitle(CreatePercent(haveGone,total), colorLightGray, 10, 0)
    w.addSpacer(6)
}

function createProgress(total, havegone, barColor, backgroundColor) {
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