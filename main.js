function preload() {
    nose = loadImage('nose.png');
    headphones = loadImage('headphones.png');
    hat = loadImage('https://i.postimg.cc/QxtRVrS5/images-removebg-preview.png');
    glasses = loadImage('https://i.postimg.cc/JnrXmKmr/giphy-1.gif')
}


function setup() {
    canvas = createCanvas(600, 400)
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 400);
    video.hide();
    video.center();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
}


function modelLoaded(){
    console.log("poseNet Initialised!");
    
}
var nose_x = 0;
var nose_y = 0;
var earleft_x = 0;
var earleft_y = 0;
var earright_x = 0;
var earright_y = 0;
var eyeleft_x = 0;
var eyeleft_y = 0;
var eyeright_x = 0;
var eyeright_y = 0;


function gotPoses(results) {
    if(results.length > 0){
        console.log(results);
        nose_x = results[0].pose.nose.x-50;
        nose_y = results[0].pose.nose.y-30;
        
        earleft_x = results[0].pose.leftEar.x;
        earleft_y = results[0].pose.leftEar.y;
        earright_x = results[0].pose.rightEar.x-110;
        earright_y = results[0].pose.rightEar.y-140;
        
        eyeleft_x = results[0].pose.leftEye.x;
        eyeleft_x = results[0].pose.leftEye.x;
        eyeright_y = results[0].pose.rightEye.y;
        eyeright_y = results[0].pose.rightEye.y;
        
        console.log("Nose X = "+ nose_x);
        console.log("Nose Y = "+ nose_y);
    }
}

function draw() {
    image(video, 0, 0, 600, 400);
    // fill(255, 255, 0);
    // stroke(255, 0,0)
    // circle(nose_x, nose_y, 30);
    // console.log(select);
    var select = document.getElementById("filters").selectedOptions[0].value;
    // var text = select.options[select.selectedIndex].value;
    console.log(select);
    if(select == "nose"){
        image(nose, nose_x+20, nose_y, 60, 60);
        
    }
    else if(select == "glasses"){
        image(glasses, eyeleft_x-100, eyeright_y-70, 140, 140);
    }
    else if(select == "hat"){
        image(hat, earright_x+50, earright_y-80, 250, 200);
        
    }
    else if(select == "headphones"){
        image(headphones, earright_x, earright_y, 350, 200);
    }
    else if(select == "all"){
        image(nose, nose_x+20, nose_y, 60, 60);
        image(glasses, eyeleft_x-100, eyeright_y-70, 140, 140);
        image(hat, earright_x+50, earright_y-80, 250, 200);
        image(headphones, earright_x, earright_y, 350, 200);

    }
}


function take_snapshot() {
    save('filtered_image.png');

}
