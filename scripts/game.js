var p1, p2;
var p1lastKey, p2lastKey;
var p1count, p2count;
var stoptime = false;
var timer;
var nikotimer;
var bounce = 0;
var music;

$(document).ready(function () {
    init();
});

function init() {
    var go = drawSplash();
    music = new Audio('music/bennyhill.mp3');
    go.onclick= function() {
        startCountdown();
        this.parentNode.removeChild(this);
    }
}

function drawSplash() {
    var im;
    im = document.createElement('img');
    im.src = "images/start.png";
    im.id = "gobutton";
    im.style = "top: 300px; position:absolute; left:400px;";
    document.body.appendChild(im);
    return document.getElementById('gobutton');
}
function startGame() {
    drawGameBoard();
    initPlayers();
    applyKeyboardListener();
    drawGo();
    window.setTimeout(function (){
        $('#go').effect("shake");
    }, 3500);
    initTimer();
}

function startCountdown(){
    var count = document.createElement('h1');
    count.appendChild(document.createTextNode("3"));
    count.id = "countdown";
    count.style = "font-family: Helvetica, sans-serif; font-size: 60px; top: 325px; position:absolute; left: 525px;";
    document.body.appendChild(count);
    timer = window.setInterval(function (){
        if ($("#countdown").text() >= 1) {
            $("#countdown").text(parseInt($("#countdown").text()) - 1);
        } else if ( $("#countdown").text() == 0) {
            $("#countdown").text("Start!");
        } else {
            $("#countdown").text("");
            clearInterval(timer);
            startGame();
        }
    }, 1000);
}
function drawGameBoard() {
    drawHeader();
    drawMasterBranchTitle();
    drawP1BranchTitle();
    drawP2BranchTitle();
    drawP1Branch();
    drawP2Branch();
    drawMasterBranch();
}

function drawHeader() {
    var im;
    im = document.createElement('img');
    im.src = "images/header.png";
    im.id = "header";
    im.style = "position:absolute;width: 1200px";
    document.body.appendChild(im);
}
function drawP1BranchTitle() {
    var im;
    im = document.createElement('img');
    im.src = "images/titleplayer1.png";
    im.id = "titleb1";
    im.style = "top: 560px; position:absolute; left: 10px";
    document.body.appendChild(im);
}

function drawMasterBranchTitle() {
    var im;
    im = document.createElement('img');
    im.src = "images/titlemaster.png";
    im.id = "titlem";
    im.style = "top: 636px; position:absolute; left: 10px";
    document.body.appendChild(im);
}

function drawP2BranchTitle() {
    var im;
    im = document.createElement('img');
    im.src = "images/titleplayer2.png";
    im.id = "titleb2";
    im.style = "top: 720px; position:absolute; left: 10px";
    document.body.appendChild(im);
}

function drawP1Branch() {
    var im;
    im = document.createElement('img');
    im.src = "images/branch1.png";
    im.id = "branch1";
    im.style = "top: 500px; position:absolute; left:100px; width: 1000px";
    document.body.appendChild(im);
}

function drawP2Branch() {
    var im;
    im = document.createElement('img');
    im.src = "images/branch2.png";
    im.id = "branch2";
    im.style = "top: 660px; position:absolute; left:100px; width: 1000px";
    document.body.appendChild(im);
}

function drawMasterBranch() {
    im = document.createElement('img');
    im.src = "images/master.png";
    im.id = "master";
    im.style = "top: 560px; position:absolute; left:100px; width: 1100px";
    document.body.appendChild(im);
}

function initPlayers() {
    p1 = drawPlayer1();
    p2 = drawPlayer2();
    p1count = 0;
    p2count = 0;
}

function drawPlayer1() {
    var im;
    im = document.createElement('img');
    im.src = "images/p1.png";
    im.id = "p1";
    im.style = "top: 528px; position:absolute; left:140px; width:50px;";
    document.body.appendChild(im);
    return document.getElementById('p1');
}

function drawPlayer2() {
    var im;
    im = document.createElement('img');
    im.src = "images/p2.png";
    im.id = "p2";
    im.style = "top: 708px; position:absolute; left:140px; width:50px;";
    document.body.appendChild(im);
    return document.getElementById('p2');
}

function initTimer() {
    timer = window.setTimeout(processTimeout, 5000);
}
function processTimeout() {
    if(!stoptime) {
        stoptime = true;
        drawStop();
        drawNiko();
        animateNiko();
        drawSpeech();
        window.setTimeout(function (){
            $('#stop').effect("shake");
        }, 3500);
    } else {
        stoptime = false;
        drawGo();
        if(document.getElementById('niko') != null) {
            deleteNiko();
        }
        window.setTimeout(function (){
            $('#go').effect("shake");
        }, 3500);
    }
    initTimer();
}

function drawStop() {
    music.pause();
    var goimg = document.getElementById('go');
    if (goimg != null) {
        goimg.parentNode.removeChild(goimg);
    }
    var im;
    im = document.createElement('img');
    im.id = "stop";
    im.src = "images/stop.png";
    im.style = "top: 350px; position:absolute; left:120px; width:600px;";
    document.body.appendChild(im);
}

function drawGo() {
    music.play();
    var stopimg = document.getElementById('stop');
    if(stopimg != null) {
        stopimg.parentNode.removeChild(stopimg);
    }
    var im;
    im = document.createElement('img');
    im.id = "go";
    im.src = "images/go.png";
    im.style = "top: 350px; position:absolute; left:120px; width:600px;";
    document.body.appendChild(im);
}

function drawNiko() {
    var im;
    im = document.createElement('img');
    im.id = "niko";
    im.src = "images/nikosmall.jpg";
    im.style = "top: 340px; position:absolute; left:800px; width:100px;";
    document.body.appendChild(im)
}

function drawSpeech() {
    var im;
    im = document.createElement('img');
    im.id = "speech";
    im.src = "images/speech.png";
    im.style = "top: 300px; position:absolute; left:925px; width:100px;";
    document.body.appendChild(im)
}

function animateNiko() {
    var niko = document.getElementById('niko');
    nikotimer = window.setInterval(function() {
        switch (bounce) {
            case 0:
                niko.style.top = parseInt(niko.style.top) + 5 + 'px';
                bounce++;
                break;
            case 1:
                niko.style.top = parseInt(niko.style.top) + 5 + 'px';
                bounce++;
                break;
            case 2:
                niko.style.top = parseInt(niko.style.top) + 5 + 'px';
                bounce++;
                break;
            case 3:
                niko.style.top = parseInt(niko.style.top) - 5 + 'px';
                bounce++;
                break;
            case 4:
                niko.style.top = parseInt(niko.style.top) - 5 + 'px';
                bounce++;
                break;
            case 5:
                niko.style.top = parseInt(niko.style.top) - 5 + 'px';
                bounce = 0;
                break;
            default:break;
        }
    }, 50)
}

function deleteNiko() {
    clearInterval(nikotimer);
    var niko = document.getElementById('niko');
    if(niko != null) {
        niko.parentNode.removeChild(niko);
    }
    var speech = document.getElementById('speech');
    speech.parentNode.removeChild(speech);
}

function applyKeyboardListener() {
    onkeydown=processKeyInput;
}

function processKeyInput(e){
    //65 a 68 d
    //37 left 39 right
    switch (e.which) {
        case 65:
            movep1('a');
            p1count++;
            break;
        case 68:
            movep1('d');
            p1count++;
            break;
        case 37:
            movep2('l');
            p2count++;
            break;
        case 39:
            movep2('r');
            p2count++;
            break;
        default:break;
    }
    if(p1count >= 190) {
        win(1);
    }
    if(p2count >= 190) {
        win(2);
    }
}

function movep1(key) {
    if(stoptime) {
        deleteNiko();
        lose(1);
    }
    if (p1lastKey == key) {
        //do nothing
    } else {
        p1.style.left = parseInt(p1.style.left)+5+'px';
        p1lastKey = key;
    }
}

function movep2(key) {
    if(stoptime) {
        deleteNiko();
        lose(2);
    }
    if (p2lastKey == key) {
        //do nothing
    } else {
        p2.style.left = parseInt(p2.style.left)+5+'px';
        p2lastKey = key;
    }
}

function lose(p) {
    clearTimeout(timer);
    var lost = document.createElement('h1');
    lost.appendChild(document.createTextNode("Player " + p + " Lost!"));
    lost.id = "lost";
    lost.style = "font-family: Helvetica, sans-serif;top: 225px; position:absolute; left: 490px;";
    document.body.appendChild(lost);
    var im;
    im = document.createElement('img');
    im.id = "done";
    im.src = "images/closed.png";
    im.style = "top: 300px; position:absolute; left: 515px;";
    document.body.appendChild(im);
    im = document.createElement('img');
    im.id = "closeddesc";
    im.src = "images/closeddesc.png";
    im.style = "top: 400px; position:absolute; left: 375px;";
    document.body.appendChild(im);
    music.pause();
    destroyEverything();
}

function win(p) {
    clearTimeout(timer);
    var win = document.createElement('h1');
    win.appendChild(document.createTextNode("Player " + p + " Won!"));
    win.id = "win";
    win.style = "font-family: Helvetica, sans-serif; top: 225px; position:absolute; left: 490px;";
    document.body.appendChild(win);
    var im = document.createElement('img');
    im.id = "done";
    im.src = "images/merged.png";
    im.style = "top: 300px; position:absolute; left: 515px;";
    document.body.appendChild(im);
    im = document.createElement('img');
    im.id = "mergeddesc";
    im.src = "images/mergeddesc.png";
    im.style = "top: 400px; position:absolute; left: 310px;";
    document.body.appendChild(im);
    win = document.createElement('span');
    win.appendChild(document.createTextNode("Player " + p));
    win.id = "win";
    win.style = "font-family: Helvetica, sans-serif; font-size: 20px; color: grey; top: 424px; position:absolute; left: 430px;";
    document.body.appendChild(win);
    music.pause();
    destroyEverything();
}

function destroyEverything() {
    onkeydown = function() {
        console.log('game is over!');
    }
    var thing = document.getElementById('stop')
    if(thing != null) {
        thing.parentNode.removeChild(thing);
    }
    var go = document.getElementById('go');
    if(go != null) {
        go.parentNode.removeChild(go);
    }
    var header = document.getElementById('header')
    header.parentNode.removeChild(header);

    var done = document.getElementById('done');
    done.onclick = function() {
        window.location.reload();
    }
}