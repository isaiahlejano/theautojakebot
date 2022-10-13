var username_submit = document.getElementById('username_submit');
var twitch_username = document.getElementById('twitch_username');
var twitchinputContainer = document.getElementById('twitch_input');
var speechdivContainer = document.getElementById('speech_div');

username_submit.addEventListener('click', displayRecognizer);
function displayRecognizer(){
    twitchinputContainer.classList.remove("active");
    speechdivContainer.classList.remove("inactive");
    twitchinputContainer.classList.add("inactive");
    speechdivContainer.classList.add("active");
    // console.log("https://twitch.com/" + twitch_username.value);
}

var initialize = document.getElementById('initialize');
var speechRecognizeContainer = document.getElementById('speech_recognize');
var speechResponseContainer = document.getElementById('speech_response');

// SPEECH RECOGNITION SECTION
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;
  
recognition.addEventListener('result', (e) =>{
    var text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join(' ');

    // Display
    if (e.results[0].isFinal){
        var textNode = document.createTextNode(text);
        console.warn(text);
        DOMFormat(speechRecognizeContainer, textNode);
        console.warn(speechRecognizeContainer.innerText.length);
    }

    // Response (Pseudo-AI)
    if(text.includes("jake")){
        // if(text.includes("shout")&&text.includes("out")&&text.includes("for me")){
        //     DOMFormat(speechResponseContainer, document.createTextNode("!so jakenjil"));
        // }
        if(text.includes("pull up")&&text.includes("discord")){
            DOMFormat(speechResponseContainer, document.createTextNode("!discord"));
        }
        if(text.includes("pull up")&&text.includes("my")&&text.includes("social")){
            DOMFormat(speechResponseContainer, document.createTextNode("!socials"));
        }
        if(text.includes("pull up")&&text.includes("my")&&text.includes("socials")){
            DOMFormat(speechResponseContainer, document.createTextNode("!socials"));
        }
        if(text.includes("show")&&text.includes("my")&&text.includes("party")){
            DOMFormat(speechResponseContainer, document.createTextNode("!party"));
        }
        if(text.includes("show")&&text.includes("my")&&text.includes("spotify")){
            DOMFormat(speechResponseContainer, document.createTextNode("!spotify"));
        }
        if(text.includes("show")&&text.includes("my")&&text.includes("rank")){
            DOMFormat(speechResponseContainer, document.createTextNode("!rank"));
        }
        if(text.includes("ping")&&text.includes("my")&&text.includes("tip")&&text.includes("command")){
            DOMFormat(speechResponseContainer, document.createTextNode("!tip"));
        }
        if(text.includes("ping")&&text.includes("my")&&text.includes("commision")&&text.includes("command")){
            DOMFormat(speechResponseContainer, document.createTextNode("!commision"));
        }
        if(text.includes("get")&&text.includes("raid")&&text.includes("message")){
            DOMFormat(speechResponseContainer, document.createTextNode("!raid and !subraid"));
        }
        if(text.includes("roll")&&text.includes("credits")){
            DOMFormat(speechResponseContainer, document.createTextNode("Thanks for the Stream!"));
        }
    } else {
        DOMFormat(speechResponseContainer, document.createTextNode("Auto Jake did not recognized that"));
    }
})

function DOMFormat(DOMName, NodeValue){
    DOMName.innerHTML = "";
    DOMName.appendChild(NodeValue);
}

// DETECT USER TALKING OR NOT
console.warn(recognition)
recognition.onspeechstart = (e) => {
    console.warn(e)
}
recognition.onsoundstart = () => {
    // Start_Btn.classList.add('Mic_Style');
    console.warn('Some sound is being received');
}
recognition.onsoundend = () => {
    // Start_Btn.classList.remove('Mic_Style');
    console.warn('Sound has stopped being received');
}

// DETECT USER TALKING OR NOT
recognition.onspeechend = (e) => {
    recognition.stop();
    initialize.addEventListener('click', speechInit);
    console.warn(e);
}

initialize.addEventListener('click', speechInit);
function speechInit(){
    initialize.classList.add("_listening");
    recognition.stop();
    recognition.start();
    recognition.addEventListener('end', ()=>{
        recognition.start();
    })
}