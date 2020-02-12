const btnLogin = document.getElementById('processImage');
const btnCapture = document.getElementById('capture');
const player = document.getElementById('player');
const snapshotCanvas = document.getElementById('snapshot');
let videoTracks;
const subscriptionKey = "a76225be0539425da6665eeb02a8973f";
const showInfoImage = document.getElementById("jsonOutput");

btnLogin.addEventListener("click", function () {
    firebase.firestore().collection('users').get().then(snap => snap.forEach(i => console.log(i.data().img.path)));
})

/* fluxo de captura da imagem */


btnCapture.addEventListener("click", function () {
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
        "url": "https://laboratoriaface.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_02&returnRecognitionModel=false&detectionModel=detection_02",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": "a76225be0539425da6665eeb02a8973f"
        },
        "data": JSON.stringify({ "url": `${url}` }),
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    }).fail(function () {
        alert("error");
    });
};

/* function processImage() {
  // Replace <Subscription Key> with your valid subscription key.
    var subscriptionKey = "a76225be0539425da6665eeb02a8973f";

    var uriBase =
    "https://laboratoriaface.cognitiveservices.azure.com/face/v1.0/detect";

    // Request parameters.
    var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes":
    "age,gender,headPose,smile,facialHair,glasses,emotion," +
    "hair,makeup,occlusion,accessories,blur,exposure,noise"
    };

    // Display the image.
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;

    // Perform the REST API call.
    $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function (xhrObj) {
    xhrObj.setRequestHeader("Content-Type", "application/json");
    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

    .done(function (data) {
    // Show formatted JSON on webpage.
    $("#responseTextArea").val(JSON.stringify(data, null, 2));
    })

    .fail(function (jqXHR, textStatus, errorThrown) {
    // Display error message.
    var errorString = (errorThrown === "") ?
    "Error. " : errorThrown + " (" + jqXHR.status + "): ";
    errorString += (jqXHR.responseText === "") ?
    "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
    jQuery.parseJSON(jqXHR.responseText).message :
    jQuery.parseJSON(jqXHR.responseText).error.message;
    alert(errorString);
    });
    }; */
