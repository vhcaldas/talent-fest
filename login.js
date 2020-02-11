/* fluxo de captura da imagem */

const btnCapture = document.getElementById('capture');
const player = document.getElementById('player');
const snapshotCanvas = document.getElementById('snapshot');
let videoTracks;


const handleSuccess = function (stream) {
	player.srcObject = stream;
	videoTracks = stream.getVideoTracks();

};
navigator.mediaDevices.getUserMedia({ video: true })
	.then(handleSuccess);

btnCapture.addEventListener("click", function () {
	const context = snapshot.getContext('2d');
	// Draw the video frame to the canvas.
	context.drawImage(player, 0, 0, snapshotCanvas.width,
		snapshotCanvas.height);
	videoTracks.forEach(function(track) {track.stop()});

});

const addToFirebase = () => {
	console.log('deu certo!')
}




