Webcam.set
({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: '90'
});

camera = document.getElementById("webcam");

Webcam.attach(camera);

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>"
    });
}

console.log("ml5_version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ueAi-746E/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}
function speak(){
    var synth= window.speechSynthesis;
    speak_1="the first prediction is"+prediction_1;
    speak_2="the second preiction is"+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_1+speak_2)
    synth.speak(utterthis)
}
function identify_snapshot()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, got_result);
}
function got_result(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("name").innerHTML = results[0].label;
        document.getElementById("name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "Amazing")
        {
            document.getElementById("emoji").innerHTML = "&#128512";
        }
        if(results[0].label == "Victory")
        {
            document.getElementById("emoji").innerHTML = "&#9996";
        }
        if(results[0].label == "Good")
        {
            document.getElementById("emoji").innerHTML = "&#128545";
        }
        if(results[0].label == "Hello")
        {
            document.getElementById("emoji").innerHTML = "&#128512";
        }
        if(results[0].label == "Appreciation")
        {
            document.getElementById("emoji").innerHTML = "&#128079";
        }

        if(results[1].label == "Amazing")
        {
            document.getElementById("emoji_2").innerHTML = "&#128512";
        }
        if(results[1].label == "Victory")
        {
            document.getElementById("emoji_2").innerHTML = "&#9996";
        }
        if(results[1].label == "Good")
        {
            document.getElementById("emoji_2").innerHTML = "&#128545";
        }
        if(results[1].label == "Hello")
        {
            document.getElementById("emoji_2").innerHTML = "&#128512";
        }
        if(results[1].label == "Appreciation")
        {
            document.getElementById("emoji_2").innerHTML = "&#128079";
        }
    }
}

