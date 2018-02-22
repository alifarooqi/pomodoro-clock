var i=70;
var session = true;
var paused = true;
var pomodoro;
var sTime=25;
var bTime=5;
var rsTime = sTime*60;
var rbTime = bTime*60;
var alert = true;
var sound = true;

$(document).ready(function(){
  $("#clock").dblclick(function(){
      sTime = parseInt(document.getElementById('session').value, 10);
      bTime = parseInt(document.getElementById('break').value, 10);
      rsTime = sTime*60;
      rbTime = bTime*60;
      if(!paused){
        pausePlay();
      }
      if(session){
        i=70;
        updateTimer('session');
      }
      else {
        i=0;
        updateTimer('break');
      }
      $("#clock").css({"background": "rgba(70, 51, 41, 0.7)", "background": "-webkit-radial-gradient(rgba(70, 51, 41, 0.7)" + i + "%, rgba(186, 163, 120, 0.7) " + i + "%)", "background": "-o-radial-gradient(rgba(70, 51, 41, 0.7)" + i + "%, rgba(186, 163, 120, 0.7) " + i + "%)", "background": "-moz-radial-gradient(rgba(70, 51, 41, 0.7)" + i + "%, rgba(186, 163, 120, 0.7) " + i + "%)", "background": "radial-gradient(rgba(70, 51, 41, 0.7)" + i + "%, rgba(186, 163, 120, 0.7) " + i + "%)"});
    });
  $("#change2Break").click(function(){
    bTime = parseInt(document.getElementById('break').value, 10);
    rbTime = bTime*60;
    i=0;
    if(!paused){
      pausePlay();
    }
    if(session){
      session = false;
    }
    myTimer();
    i=0;
    rbTime = bTime*60;
    $("body").css("background-image", "url('https://s-media-cache-ak0.pinimg.com/originals/8e/ca/3b/8eca3b8965edd86936551cfa88893198.jpg')").fadeIn(3000);
  });
  $("#change2Session").click(function(){
    sTime = parseInt(document.getElementById('session').value, 10);
    rsTime = sTime*60;
    i=70;
    if(!paused){
      pausePlay();
    }
    if(!session){
      session = true;
    }
    myTimer();
    i=70;
    rsTime = sTime*60;
    $("body").css("background-image", "url('http://cdn-media-1.lifehack.org/wp-content/files/2017/01/21060707/Productivity-Desk.jpg')");
  });
  document.onkeypress = function(e){
    if((e || window.event).keyCode === 32){
        pausePlay();
    }
};
});

function mute(){
  if(sound){
    $("#sound").html('<i class="fa fa-volume-off" aria-hidden="true"></i>');
    $("#sound").attr("title", "Unmute");
    sound = false;
  }
  else {
    $("#sound").html('<i class="fa fa-volume-up" aria-hidden="true"></i>');
    sound = true;
    $("#sound").attr("title", "mute");
  }
}

function toggleAlert() {
  if(alert) {
    $("#alert").html('<i class="fa fa-bell" aria-hidden="true" style="color:black;"></i>');
    alert = false;
  }
  else {
    $("#alert").html('<i class="fa fa-bell" aria-hidden="true" style="color: white;"></i>');
    alert = true;
  }
}

function help(){
  alert("Under Progress!");
}

function updateTimer(id) {
  var value = parseInt(document.getElementById(id).value, 10);
  if (value<=0 || value>=100 || isNaN(value)) {
    alert("Please input any value between 1 and 99 (inclusive)!");
    //Reset Timer//
  }
  else if(((id=="session" && session)||(id=="break" && !session)) && paused) {
      $("#timeRem").html(String("0" + value).slice(-2) + ":00");
      sTime = parseInt(document.getElementById('session').value, 10);
        bTime = parseInt(document.getElementById('break').value, 10);
      rsTime = sTime*60;
      rbTime = bTime*60;
  }
}

function increaseValue(id) {
  var value = parseInt(document.getElementById(id).value, 10);
  if (value < 99 && !isNaN(value)){
    value++;
  }
  document.getElementById(id).value = value;
  updateTimer(id);
  return false;
}

function decreaseValue(id) {
  var value = parseInt(document.getElementById(id).value, 10);
  if (value>1 && !isNaN(value)){
    value--;
  }
  document.getElementById(id).value = value;
  updateTimer(id);
  return false;
}

function myTimer() {
  if(session) {
    $("#whichSession").html("Work!");
    $("#clock").css({"background": "rgba(70, 51, 41, 0.7)", "background": "-webkit-radial-gradient(rgba(70, 51, 41, 0.7)" + i + "%, rgba(186, 163, 120, 0.7) " + i + "%)", "background": "-o-radial-gradient(rgba(70, 51, 41, 0.7)" + i + "%, rgba(186, 163, 120, 0.7) " + i + "%)", "background": "-moz-radial-gradient(rgba(70, 51, 41, 0.7)" + i + "%, rgba(186, 163, 120, 0.7) " + i + "%)", "background": "radial-gradient(rgba(70, 51, 41, 0.7)" + i + "%, rgba(186, 163, 120, 0.7) " + i + "%)"});
    var remMin = Math.floor(rsTime/60);
    var remSec = Math.floor(rsTime%60);
    var remTime = String("0" + remMin).slice(-2) + ":" + String("0" + remSec).slice(-2);
    $("#timeRem").html(remTime);
    rsTime--;
    i-=(70/(sTime*60));
    if (rsTime<=0) {
      session = false;
        bTime = parseInt(document.getElementById('break').value, 10);
      rbTime = bTime*60;
      $("body").css("background-image", "url('https://s-media-cache-ak0.pinimg.com/originals/8e/ca/3b/8eca3b8965edd86936551cfa88893198.jpg')").fadeIn(3000);
      if (sound) {
        document.getElementById('alarm').play();
      }
      if(alert) {
      setTimeout(function(){alert("Break Time!")}, 200);
      }
    }
  }
  else {

    $("#whichSession").html("Break!");
    $("#clock").css({"background": "rgba(70, 51, 41, 0.7)", "background": "-webkit-radial-gradient(rgba(70, 51, 41, 0.7)" + i + "%, rgba(186, 163, 120, 0.7) " + i + "%)", "background": "-o-radial-gradient(rgba(70, 51, 41, 0.7)" + i + "%, rgba(186, 163, 120, 0.7) " + i + "%)", "background": "-moz-radial-gradient(rgba(70, 51, 41, 0.7)" + i + "%, rgba(186, 163, 120, 0.7) " + i + "%)", "background": "radial-gradient(rgba(70, 51, 41, 0.7)" + i + "%, rgba(186, 163, 120, 0.7) " + i + "%)"});
    var remMin = Math.floor(rbTime/60);
    var remSec = Math.floor(rbTime%60);
    var remTime = String("0" + remMin).slice(-2) + ":" + String("0" + remSec).slice(-2);
    $("#timeRem").html(remTime);
    rbTime--;
    i+=(70/(bTime*60));
    if (rbTime<=0) {
      session = true;
      sTime = parseInt(document.getElementById('session').value, 10);
      rsTime = sTime*60;
      $("body").css("background-image", "url('http://cdn-media-1.lifehack.org/wp-content/files/2017/01/21060707/Productivity-Desk.jpg')");
    if(sound) {
      document.getElementById('alarm').play();
    }
    if(alert) {
      setTimeout(function(){alert("Time to get back to work!")}, 200);
      }
      }
  }
}

function pausePlay() {
  if(paused){
    pomodoro = setInterval(myTimer, 1000);
    paused = false;
  }
  else{
    clearInterval(pomodoro);
    paused = true;
  }
}