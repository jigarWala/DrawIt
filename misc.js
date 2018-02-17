// This module handles miscellaneous events such as clear canvas, erase and save
var misc = ( () => {

	// Get clear element from toolbar
	var clear=  toolbar.getToolbar().getElementsByClassName('clear')[0];

	// Add event listener
	clear.addEventListener('click', (e) => {

		// Publish clearCanvas event
		pubsub.emit('clearCanvas');
	});

	// Get erase element from toolbar
	var erase = toolbar.getToolbar().getElementsByClassName('erase')[0];

	// Add event listener
	erase.addEventListener('click', (e) => {

		// Publish erase event
		pubsub.emit('erase');
	});

	// Get save element from toolbar
	var save = toolbar.getToolbar().getElementsByClassName('save')[0];

	// Add event listener
	save.addEventListener('click', (e) => {

		// Set the clicked elements href to canvas data
		e.target.href = myCanvas.canvas.toDataURL();

		// Name the downloaded file
		e.target.download =  "myDrawIt.png";
	});

		// get Brush element from toolbar
	var brush =toolbar.getToolbar().getElementsByClassName('brushTool')[0];

	// Add event listener
	brush.addEventListener('click',(e)=>{

		//emit brush_event event so now brush would be active tool
		pubsub.emit('default-brush',brushTool);

	})

	// get Line element from toolbar
	var line =toolbar.getToolbar().getElementsByClassName('lineTool')[0];

	// Add event listener
	line.addEventListener('click',(e)=>{
		//emit drawLine event so now line would be active tool
		pubsub.emit('drawLine',lineTool);

	})

})();