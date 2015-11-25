var world;
var emojiParticles = [];

var defaultSurface, lowSurface;
var defaultSurfacePoints = [];
var lowSurfacePoints = [];

var slider;

//Emojis
var ghost_emoji, heart_emoji, sunglasses_emoji, thumb_emoji, cactus_emoji, umbrella_rain_emoji, earth_africa, face_with_tongue, pizza, chequered_flag, alien_emoji, angry_emoji, cat, dancer, dolphin, fire, ice_cream, purple_horns, top_hat, spouting_whale;

//Sound
var beep_01;

function preload() {
	ghost_emoji = loadImage("media/ghost.png");
	heart_emoji = loadImage("media/heart.png");
	sunglasses_emoji = loadImage("media/sunglasses_02.png");
	thumb_emoji = loadImage("media/thumb.png");
	cactus_emoji = loadImage("media/cactus.png");
	umbrella_rain_emoji = loadImage("media/umbrella_rain.png");
	face_with_tongue = loadImage("media/face_with_tongue.png");
	earth_africa = loadImage("media/earth_africa.png");
	pizza = loadImage("media/pizza.png");
	chequered_flag = loadImage("media/chequered_flag.png");
	alien_emoji = loadImage("media/alien.png");
	angry_emoji = loadImage("media/angry.png");
	cat = loadImage("media/cat.png");
	dancer = loadImage("media/dancer.png");
	dolphin = loadImage("media/dolphin.png");
	fire = loadImage("media/fire.png");
	ice_cream = loadImage("media/ice_cream.png");
	purple_horns = loadImage("media/purple_horns.png");
	top_hat = loadImage("media/top_hat.png");
	spouting_whale = loadImage("media/spouting_whale.png");

	beep_01= loadSound('media/audio/beep_01.mp3');
	beep_01.playMode('sustain');
}


var verticalWorld = true;
var	hVal = 2;
var	wVal = 2;

var leftOffset = 45;
var rightOffset = 28;

function getDefaultSurfacePoints(curWidth, curHeight){
	var thePoints = [];
	if (verticalWorld){
		thePoints = [
			[-leftOffset,0],
			[((curWidth/2 - curWidth/wVal)) - leftOffset,0],
			[((curWidth/2 - curWidth/wVal)) - leftOffset, curHeight + 5],
			[(curWidth/2 + curWidth/wVal) - rightOffset,curHeight + 5],
			[curWidth/2 + curWidth/wVal - rightOffset, 0],
			[curWidth - rightOffset, 0],
			[curWidth - rightOffset, curHeight],
			[-leftOffset,curHeight]
		];
	}
	else{
		thePoints = [
			[0,0],
			[0, (curHeight/2 - curHeight/hVal)],
			[curWidth - 15, (curHeight/2 - curHeight/hVal)],
			[curWidth - 15, (curHeight/2 + curHeight/hVal)],
			[0, (curHeight/2 + curHeight/hVal)],
			[0, curHeight],
			[curWidth, curHeight],
			[curWidth,0]
		];
	}
	return thePoints;
}


function getLowSurfacePoints(curWidth, curHeight){
	var thePoints = [];
	if (verticalWorld){
		thePoints = [
			[-leftOffset,0],
			[((curWidth/2 - curWidth/wVal)) - leftOffset,0],
			[((curWidth/2 - curWidth/wVal)) - leftOffset, curHeight * 2],
			[(curWidth/2 + curWidth/wVal) - rightOffset,curHeight * 2],
			[curWidth/2 + curWidth/wVal - rightOffset, 0],
			[curWidth - rightOffset, 0],
			[curWidth - rightOffset, curHeight * 3],
			[-leftOffset,curHeight * 3]
		];
	}
	else {
		thePoints = [
			[0,0],
			[0, (curHeight/2 - curHeight/hVal)],
			[curWidth*4, (curHeight/2 - curHeight/hVal)],
			[curWidth*4, (curHeight/2 + curHeight/hVal)],
			[0, (curHeight/2 + curHeight/hVal)],
			[0, curHeight],
			[curWidth*4, curHeight],
			[curWidth*4, 0]
		];
	}
	return thePoints;
}

var emojiSize;
var sizeFactor = 18;

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);

	emojiSize = Math.round(windowWidth/sizeFactor);

	// slider = createSlider(0, 100, 10);
  // slider.position(width/2 - 100, 10);
  // slider.style('width', '200px');
	//Init box2d physics and world
	if (verticalWorld){
		world = createWorld(0,15);
	}
	else{
			world = createWorld(15,0);
	}

	world.SetContactListener(new CustomListener());
		
	//var dPoints = getDefaultSurfacePoints(windowWidth, windowHeight);
	defaultSurface = new SurfaceShape(getDefaultSurfacePoints(windowWidth, windowHeight));
	//var lPoints = getLowSurfacePoints(windowWidth, windowHeight);
	lowSurface = new SurfaceShape(getLowSurfacePoints(windowWidth, windowHeight));

	beep_01.setVolume(0.5);
}
 
var timer = 0;
var elapsedTime = 0;
var showingDefault = true;

function draw(){
	background(0);
	//Set up time
	var timeStep = 1.0/30;
	world.Step(timeStep,10,10);

  var flowRate = getFlowRate();
	var curEmoji;

	// Control freq flow of particles
	if ((random(1)) < flowRate) {
		var curRandom = random(1);
		if (curRandom > 0.95){
			curEmoji = ghost_emoji;
		}
		else if (curRandom > 0.9){
			curEmoji = heart_emoji;
		}
		else if (curRandom > 0.85){
			curEmoji = sunglasses_emoji;
		}
		else if (curRandom > 0.8){
			curEmoji = cactus_emoji;
		}
		else if (curRandom > 0.75){
			curEmoji = umbrella_rain_emoji;
		}
		else if (curRandom > 0.7){
			curEmoji = earth_africa;
		}
		else if (curRandom > 0.65){
			curEmoji = face_with_tongue;
		}
		else if (curRandom > 0.6){
			curEmoji = pizza;
		}
		else if (curRandom > 0.55){
			curEmoji = chequered_flag;
		}
		else if (curRandom > 0.5){
			curEmoji = alien_emoji;
		}
		else if (curRandom > 0.45){
			curEmoji = angry_emoji;
		}
		else if (curRandom > 0.4){
			curEmoji = cat;
		}
		else if (curRandom > 0.35){
			curEmoji = dancer;
		}
		else if (curRandom > 0.3){
			curEmoji = dolphin;
		}
		else if (curRandom > 0.25){
			curEmoji = fire;
		}
		else if (curRandom > 0.2){
			curEmoji = ice_cream;
		}
		else if (curRandom > 0.15){
			curEmoji = purple_horns;
		}
		else if (curRandom > 0.1){
			curEmoji = top_hat;
		}
		else if (curRandom > 0.05){
			curEmoji = spouting_whale;
		}
		else{
			curEmoji = thumb_emoji;
		}

		//for (var i = 0; i < 5; i++){
		if (verticalWorld){
			emojiParticles.push(new Emoji(width/2,-100, curEmoji));
		}
		else{
			emojiParticles.push(new Emoji(-100,height/2, curEmoji));
		}
	}

	// Display all the particles
	for (var j = emojiParticles.length-1; j >= 0; j--) {
		emojiParticles[j].display();
		//Logic to remove particles
		if (emojiParticles[j].done()) {
			emojiParticles.splice(j,1);
		}
	}

	if (timer > 2400 && timer < 2700){
		// Draw the low surface
		if (showingDefault){
			defaultSurface.killBody();
			showingDefault = false;
		}
		//console.log("Showing low surface!");
		lowSurface.display();
		timer++;
	}
	else if (timer > 2700){
		defaultSurface = new SurfaceShape(getDefaultSurfacePoints(windowWidth, windowHeight));
		showingDefault = true;
		//console.log("Stop showing low!");
		emojiSize = Math.round(windowWidth/sizeFactor);
		timer = 0;
	}
	else{
		timer++;
		defaultSurface.display();
	}
	// var curTime = Math.round(timer/60);
	// fill(255);
	// text("Timer: " + curTime, 20, 30);
}

function getFlowRate(){
	var flowRate;
	if(showingDefault){
		var val = 10;
		//var val = slider.value();
		flowRate = map(val,0,100,0.1,0);
	}
	else{
		flowRate = 0;
	}
	return flowRate;
}

function mousePressed(){
	// flowRate -= 0.1;
	/*
	var xForce = -10 * ( (mouseX - windowWidth/2)/(windowWidth/2) );
	var curB2DForce = new box2d.b2Vec2(xForce, 0);
	console.log(curB2DForce);

	for (var i = sandParticles.length-1; i >= 0; i--) {
		sandParticles[i].applyForce(curB2DForce);
		console.log("Applying force");
	}
	*/
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	
	/*
	defaultSurface.killBody();
	defaultSurface = new SurfaceShape(getDefaultSurfacePoints(curWidth, curHeight));
	lowSurface = new SurfaceShape(getLowSurfacePoints(curWidth, curHeight));
	*/
	timer = 2500;
}