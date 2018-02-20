(()=>{

socket = io.connect();

//when color changes from one client emit event to server so it can broadcast it to others
pubsub.on('setColor', color =>socket.emit('colorChange',color));

//when brush size changes from one client emit event to server so it can broadcast it to others
pubsub.on('changeBrush', brushSize => socket.emit('changeBrush',brushSize));

pubsub.on('clearCanvas',()=>socket.emit('clearCanvas'));

pubsub.on('erase',()=>socket.emit('erase'));

socket.on('clearCanvas',myCanvas.clearCanvas);

socket.on('erase',myCanvas.erase);

//from server when other user does the changes
socket.on('changeBrush',bs=>{
	//actually change the brush size
	myCanvas.setBrush(bs);
	//change the view
	brushTool.setBrushSize(bs);
});

//when other users change the color
socket.on('colorChange',myCanvas.setColor)

})();