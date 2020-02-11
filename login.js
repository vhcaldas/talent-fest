/* fluxo de captura da imagem */

const btnCapture = document.getElementById('capture');
const player = document.getElementById('player');
const snapshotCanvas = document.getElementById('snapshot');

const handleSuccess = function (stream) {
	player.srcObject = stream;
};
navigator.mediaDevices.getUserMedia({ video: true })
	.then(handleSuccess);

btnCapture.addEventListener("click", function () {
	
})


