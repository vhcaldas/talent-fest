// const btnLogin = document.getElementById('processImage');
const btnCapture = document.getElementById('capture');
const player = document.getElementById('player');
const snapshotCanvas = document.getElementById('snapshot');
let videoTracks;
const subscriptionKey = "a76225be0539425da6665eeb02a8973f";
const showInfoImage = document.getElementById("jsonOutput");

/* fluxo de captura da imagem */
btnCapture.addEventListener("click", function () {
    firebase.firestore().collection('users').get().then(snap => snap.forEach(i => console.log(i.data().img.path)));
    const context = snapshot.getContext('2d');
    // const gl = snapshotCanvas.getContext('webgl', {preserveDrawingBuffer: true})
    context.drawImage(player, 0, 0, snapshotCanvas.width,
        snapshotCanvas.height)
    const canvas = snapshotCanvas.toDataURL();
    //const pictureName = (`${new Date()}.png`);
    const fbStorage = firebase.storage().ref();
    const child = fbStorage.child('users/' + (new Date()) + '.png')

    child.putString(canvas, 'data_url').then(snap => getImageFromFirebase(child))
    //videoTracks.forEach(function(track) {track.stop()});
});

const getImageFromFirebase = (img) => {
    img.getDownloadURL().then(url => detectFace(url))
}

const handleSuccess = function (stream) {
    player.srcObject = stream;
    //videoTracks = stream.getVideoTracks();
};

navigator.mediaDevices.getUserMedia({ video: true })
    .then(handleSuccess);

function detectFace(url) {


    const settings = {
        "url": "https://laboratoriaface.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false&detectionModel=detection_01",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": "a76225be0539425da6665eeb02a8973f"
        },
        "data": JSON.stringify({ "url": `${url}` }),
    };
    $.ajax(settings).done(function (response) {
        identifyImage(response);
        console.log(response);
    }).fail(function () {
        alert("error");
    });
};

function identifyImage(response) {
    const faceId = response[0].faceId;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Ocp-Apim-Subscription-Key", "a76225be0539425da6665eeb02a8973f");

    var raw = JSON.stringify({ "personGroupId": "laboratoria", "faceIds": [faceId], "maxNumOfCandidatesReturned": 1, "confidenceThreshold": 0.5 });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://laboratoriaface.cognitiveservices.azure.com/face/v1.0/identify", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

};
