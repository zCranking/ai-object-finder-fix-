Status = "";
answers = [];
object = "";
function setup(){
    canvas = createCanvas(600, 470);
    canvas.position(600, 450);
    video = createCapture(VIDEO);
    video.hide();
}
function modelLoaded(){
    console.log("model loaded");
    Status = true;
    objectDetector.detect(video);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    answers = results;
}
function draw(){
    image(video, 0, 0, 600, 470);
    if(Status != ""){
        objectDetector.detect(video, gotResult);
        for(i=0;i<answers.length;i++){
            document.getElementById("status").innerHTML = "ObjectDetector🔍 has found " + answers.length + " number of objects";
            fill('green');
            confidence = floor(answers[i].confidence * 100);
            text(answers[i].label + " " + confidence + "%", answers[i].x-20, answers[i].y-20);
            noFill();
            stroke('green');
            rect(answers[i].x, answers[i].y, answers[i].width, answers[i].height);
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object = document.getElementById("input").value;
    console.log(object);
    if(answers[0].label == object){ 
        video = "";
        objectDetector.detect(gotResult);
        document.getElementById("status").innerHTML = object + " was found.";
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(object + "was found.");
        synth.speak(utterThis);
    }
    else{
        document.getElementById("status").innerHTML = object + " was not found.";
    }
}