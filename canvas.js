// This module handles canvas operations
var myCanvas = ( () => {

	// Get the canvas element from html
	var canvas = document.getElementById("canvas");

	// Set context to use properties
	var context = canvas.getContext("2d");

	// set canvas width and height to window size
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	//changed dynamically when window resized
	window.addEventListener("resize", (e)=>{
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});

	// Initialize mouse pointer and brush size
	var down = false;
	var bs = 15;
	var tools ={ };
	var activeTool;


	// // drawPoint is the function to draw with brush tool
	var brushTool = drawPoint => {
		activeTool="brushTool";

		//first time
		if(!tools["brushTool"])
			tools[activeTool]=drawPoint

	}

	//drawLine is function to draw Line
	var lineTool = drawLine => {
		// when line tool selected change active tool to line tool
		activeTool="lineTool";

		if(!tools["lineTool"])
			tools[activeTool]=drawLine
	}

	var mouseup = e => {

		// If mouse was clicked
		if(down == true) {

			// Unclick it
			down=false;

			// Refresh the context path
			context.beginPath();
		}
	}

	var mousedown = e => {

		// If mouse was not clicked
		if(down == false) {

			// Click it
			down = true;

			//draw with appropriate tool
			tools[activeTool](e);
		}
	}

	var whichToolToSelect=(e)=>{
		tools[activeTool](e);
	}

	// Set listeners
	canvas.addEventListener('mousedown',mousedown);
	canvas.addEventListener('mousemove',whichToolToSelect);

	// Mouse up from entire document should unclick
	document.addEventListener('mouseup',mouseup);

	// Function to set brush size
	var setBrush = size => {
		bs = size;
	}

	// Function to set color
	var setcolor = color => {
		context.globalCompositeOperation = "source-over"
		context.fillStyle = color;
		context.strokeStyle = color;
	}

	// Function to clear canvas
	var clrcan = () => {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	var erase = () => {
		context.globalCompositeOperation = "destination-out";
		context.strokeStyle = "rgba(0,0,0,0)";
	}

	// Subscribe to canvas events that anyone can order
	pubsub.on('clearCanvas', clrcan);
	pubsub.on('changeBrush', setBrush);
	pubsub.on('setColor', setcolor);
	pubsub.on('erase', erase);
	pubsub.on('default-brush', brushTool);
	pubsub.on('drawLine', lineTool);

	// Export the canvas object to access from outside
	return {
		canvas: canvas,
		getBrushSize:()=>{
			return bs;
		},
		getContext:()=>{
			return context;
		},
		getMouseState:()=>{
			return down;
		}
	}

})();