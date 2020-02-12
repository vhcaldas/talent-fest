// const btnLogin = document.getElementById('processImage');
const btnCapture = document.getElementById('capture');
const player = document.getElementById('player');
const snapshotCanvas = document.getElementById('snapshot');
let videoTracks;
const subscriptionKey = "a76225be0539425da6665eeb02a8973f";

btnCapture.addEventListener("click", function () {
    const context = snapshot.getContext('2d');
    context.drawImage(player, 0, 0, snapshotCanvas.width,
        snapshotCanvas.height)
    const canvas = snapshotCanvas.toDataURL();
    const fbStorage = firebase.storage().ref();
    const child = fbStorage.child('users/' + (new Date()) + '.png')
    child.putString(canvas, 'data_url').then(snap => getImageFromFirebase(child))
});

const getImageFromFirebase = (img) => {
    img.getDownloadURL().then(url => detectFace(url))
}

const handleSuccess = function (stream) {
    player.srcObject = stream;
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
    }).fail(function () {
        document.getElementById("camera").innerHTML = "Usuárix não Cadastradx."
        setTimeout(() => {
            window.location.reload()
        }, 3000);
    });
};

function identifyImage(response) {
    const faceId = response[0].faceId;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Ocp-Apim-Subscription-Key", "a76225be0539425da6665eeb02a8973f");

    const raw = JSON.stringify({ "personGroupId": "laboratoria", "faceIds": [faceId], "maxNumOfCandidatesReturned": 1 });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://laboratoriaface.cognitiveservices.azure.com/face/v1.0/identify", requestOptions)
        .then(response => response.text())
        .then(result => getName(result))
        .catch(function () {
            document.getElementById("camera").innerHTML = "Usuárix não Cadastradx."
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }
        );
};

function getName(result) {

    const findData = JSON.parse(result);
    const findPersonId = findData[0].candidates[0].personId;
    const settings = {
        "url": "https://laboratoriaface.cognitiveservices.azure.com/face/v1.0/persongroups/laboratoria/persons/" + `${findPersonId}`,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Ocp-Apim-Subscription-Key": "a76225be0539425da6665eeb02a8973f",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "{body}": ""
        }
    };
    $.ajax(settings).done(function (response) {
        const findName = response.name
        document.getElementById('camera').innerHTML = "Bem vindx, " + `${findName}` + "! Você está logadx."
    }).fail(
        function () {
            document.getElementById("camera").innerHTML = "Usuárix não Cadastradx."
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }
    );
}


