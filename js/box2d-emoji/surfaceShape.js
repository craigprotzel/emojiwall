/*
// Built from
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
//https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp05_libraries/box2d-html5/NOC_5_03_ChainShape_Simple
*/

/*---------- SAND SURFACE CLASS ----------*/
function SurfaceShape(surfacePoints) {

	this.surface = [];
	// Here we keep track of the screen coordinates of the chain

	for (var j = 0; j < surfacePoints.length; j++){
		this.surface.push(new box2d.b2Vec2(surfacePoints[j][0], surfacePoints[j][1]));
	}

	for (var i = 0; i < this.surface.length; i++) {
		this.surface[i] = scaleToWorld(this.surface[i]);
	}

	//Put the surface in its world
	var chain = new box2d.b2ChainShape();
	chain.CreateChain(this.surface, this.surface.length);
	
	// Need a body to attach shape!
	var bd = new box2d.b2BodyDef();
	this.body = world.CreateBody(bd);

	// Define a fixture
	var fd = new box2d.b2FixtureDef();
	// Fixture holds shape
	fd.shape = chain;

	// Some physics
	fd.density = 1.0;
	fd.friction = 0.5;
	fd.restitution = 0.7;

	// Attach the fixture
	this.body.CreateFixture(fd);

	// Draw the edge chain as a series of vertex points
	this.display = function() {
		//strokeWeight(1);
		//stroke(50);
		noStroke();
		//fill(0,0,0,1);
		fill(0);
		beginShape();
		for (var i = 0; i < this.surface.length; i++) {
			var v = scaleToPixels(this.surface[i]);
			vertex(v.x, v.y);
		}
		endShape(CLOSE);
	};

	//Remove surface from the box2d world
	this.killBody = function() {
		world.DestroyBody(this.body);
	};

}