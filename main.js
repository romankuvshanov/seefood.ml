// Variables initialization
const URL = "model/";
let model;
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";
let isSoundOn = false;
let turnOnSound = new Audio();
let hotDogSound = new Audio();
let notHotDogSound = new Audio();

// Loading sounds
turnOnSound.src = 'sounds/turnOnSound.wav';
hotDogSound.src = 'sounds/hotDog.wav';
notHotDogSound.src = 'sounds/notHotDog.wav';

// Resets UI after new upload
function reset_UI() {
	document.getElementById('output').src = "imgs/loading_animation.webp";
	document.getElementById("help_message").innerHTML = 'HELP US TO IMPROVE: DID WE RECOGNISE IT RIGHT?';
	document.getElementById("yesno_buttons").style.display = 'grid';
	document.getElementById("categories_buttons").style.display = 'none';
	document.getElementById("sucess_message").style.display = 'none';
}

// Switches sound variable and icon
function switch_sound() {
	speakerIcon = document.getElementById('speaker_icon');
	speakerIconApp = document.getElementById('speaker_icon_app');
	if (isSoundOn) {
		isSoundOn = false;
		speakerIcon.innerHTML = "volume_off";
		speakerIconApp.innerHTML = "volume_off";
	} else {
		isSoundOn = true;
		speakerIcon.innerHTML = "volume_up";
		speakerIconApp.innerHTML = "volume_up";
		turnOnSound.play();
	}
}

// Sends mistakenly recognised pictures to the serever
async function send_picture(type = 'other') {
	let formData = new FormData();
    let fileField = document.querySelector('input[type="file"]');
    formData.append('filename', fileField.files[0])
    formData.append('type', type)
	
	document.getElementById("categories_buttons").style.display = 'none';
	document.getElementById("sucess_message").style.display = 'flex';
        
    await fetch('upload.php', {
		method: 'POST',
		mode: 'no-cors',
		body: formData
		});
}

// If picture was recognized correctly 
function yes() {
	document.getElementById("yesno_buttons").style.display = 'none';
	document.getElementById("sucess_message").style.display = 'flex';
}

// If picture was not recognized correctly 
function no() {
	document.getElementById("help_message").innerHTML = 'WHAT CATEGORY IS RIGHT THEN?';
	document.getElementById("yesno_buttons").style.display = 'none';
	document.getElementById("categories_buttons").style.display = 'grid';
}

// Main function for recoginition after picture uploaded
async function start(event) {
	if (event.target.files.length) {
		let start_screen = document.getElementById('start_screen');
		let app = document.getElementById('app');
		start_screen.style.display = 'none';
		app.style.display = 'grid';
	
		reset_UI();
	
		let image = new Image();
		image.src = window.URL.createObjectURL(event.target.files[0]);
	
		model = await tmImage.load(modelURL, metadataURL);
		console.log("Модель загружена");
	
		const prediction = await model.predict(image);
		console.log(prediction);
	
		document.getElementById('output').src = image.src;
		
		if (prediction[0].probability.toFixed(2) < 0.5) {
			document.getElementById("hotdog_caption").hidden = true;
			document.getElementById("not_hotdog_caption").hidden = false;
			if (isSoundOn) {
				notHotDogSound.play();
			}
		} else {
			document.getElementById("hotdog_caption").hidden = false;
			document.getElementById("not_hotdog_caption").hidden = true;
			if (isSoundOn) {
				hotDogSound.play();
			}
		}
	}
	
}