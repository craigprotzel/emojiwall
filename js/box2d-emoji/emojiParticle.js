/*
// Built from
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
//https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp05_libraries/box2d-html5/NOC_5_03_ChainShape_Simple
*/

/*---------- EMOJI PARTICLE CLASS ----------*/
function Emoji(xPos, yPos, emoji_type){
	//this.d = 15;
	this.toggleShape = false;

	this.r = random(50,255);
	this.g = random(150,200);
	this.b = random(150,255);

	this.img = emoji_type;

	this.lifeTime = 0;
	this.soundFX = beep_01;

	//Define a body
	var bd = new box2d.b2BodyDef();
	bd.type = box2d.b2BodyType.b2_dynamicBody;
	bd.position = scaleToWorld(xPos,yPos);

	//Define a fixture
	var fd = new box2d.b2FixtureDef();
	fd.shape = new box2d.b2CircleShape();
	fd.shape.m_radius = scaleToWorld(emojiSize/2);

	fd.density = 1.0;
	fd.friction = 0.5;
	//bounciness
	fd.restitution = 0.8;

	//Create the body
	this.body = world.CreateBody(bd);
	//Attach the fixture
	this.body.CreateFixture(fd);

	// From example
	if (verticalWorld){
		this.body.SetLinearVelocity(new box2d.b2Vec2(random(-0.5, 0.5)),0);
		this.body.SetAngularVelocity((random(-0.01,0.01))/10);
	}
	else{
		this.body.SetLinearVelocity(new box2d.b2Vec2(0, random(-0.5, 0.5)));
		this.body.SetAngularVelocity((random(-0.01,0.01))/10);
	}

	//COLLISION LOGIC
	this.body.SetUserData(this);
  this.change = function() {
		/*
    //console.log("Hit!");
    if (this.lifeTime > 55 && this.lifeTime < 115){
			this.toggleShape = true;
			this.soundFX.play();
    }
    */
  };

	//Remove particle from the box2d world
	this.killBody = function() {
		world.DestroyBody(this.body);
		console.log("Removing body!!!");
	};

	//Is the particle ready for deletion?
	this.done = function() {
		// Let's find the screen position of the particle
		//var transform = this.body.GetTransform();
		var pos = scaleToPixels(this.body.GetPosition());
		// Is it off the bottom of the screen?
		if (verticalWorld){
			if (pos.y > height + 100){
				this.killBody();
				return true;
			}
		}
		else if (pos.x > (width + 100)){
			//console.log("Kill body");
			//if ( (pos.x > (width + this.d)) || (pos.x < -this.d) ){
			this.killBody();
			return true;
		}
		return false;
	};


	//NOT WORKING
	this.applyForce = function(force) {
		
		//var curBodyCtr = this.body.GetWorldCenter();
		//this.body.ApplyForce(force, curBodyCtr);

		//this.body.SetLinearVelocity(force);
	};


	// Drawing the Particle
	this.display = function() {

		this.lifeTime++;

		// Get the body's position
		var pos = scaleToPixels(this.body.GetPosition());
		// Get its angle of rotation
		//var a = this.body.GetAngleRadians();

		// Draw the body
		rectMode(CENTER);
		push();
		translate(pos.x,pos.y);
		
		if (!verticalWorld){
			rotate(-(PI/2));
		}

		//rotate(a/10);
		fill(this.r, this.g, this.b);
		noStroke();
		// if (!this.toggleShape){
		image(this.img, 0, 0, emojiSize, emojiSize);
		// }
		// else{
		// 	ellipse(0,0,this.d,this.d);
		// }
		pop();
	};
}