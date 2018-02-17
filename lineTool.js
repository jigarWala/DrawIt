// This module handles the operatons of draws line like change size and show in HTML
var lineTool=(()=>{

startPoint=undefined


var drawLine = e => {

		var down=myCanvas.getMouseState();
		var context=myCanvas.getContext();
		var bs=myCanvas.getBrushSize();
		// If the mouse button is pressed
		if(down == true) {


			//if 2 points not got
			if(startPoint===undefined){
				context.beginPath();
				context.arc(e.clientX, e.clientY, bs/2, 0, 2*Math.PI);

				// Fill the point
				context.fill();
				context.stroke();

				startPoint=[e.clientX,e.clientY]
			}
			else{
				console.log('ful zaal')
				context.moveTo(startPoint[0],startPoint[1]);
				context.lineTo(e.clientX,e.clientY);
				var prev=context.lineWidth
				context.lineWidth = bs;
				context.stroke();
				startPoint=undefined
				context.lineWidth = prev;

			}
		}

	}
return drawLine;

})();
