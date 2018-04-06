// appends an audio element to playback and download recording
function createAudioElement(blobUrl) {
    const downloadEl = document.createElement('a');
    downloadEl.style = 'display: block';
    downloadEl.innerHTML = 'download';
    downloadEl.download = 'audio.webm';
    downloadEl.href = blobUrl;
    const audioEl = document.createElement('audio');
    audioEl.controls = true;
    const sourceEl = document.createElement('source');
    sourceEl.src = blobUrl;
    sourceEl.type = 'audio/webm';
    audioEl.appendChild(sourceEl);
    document.body.appendChild(audioEl);
    document.body.appendChild(downloadEl);
}

// request permission to access audio stream
navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    // store streaming data chunks in array
    const chunks = [];
    // create media recorder instance to initialize recording
    const recorder = new MediaRecorder(stream);
    // function to be called when data is received
    recorder.ondataavailable = e => {
      // add stream data to chunks
      chunks.push(e.data);
      // if recorder is 'inactive' then recording has finished
      if (recorder.state == 'inactive') {
          // convert stream data chunks to a 'webm' audio format as a blob
          const blob = new Blob(chunks, { type: 'audio/webm' });
          // convert blob to URL so it can be assigned to a audio src attribute
          createAudioElement(URL.createObjectURL(blob));
      }
    };
}).catch(console.err);

$(document).ready(()=>{
    var b = false

    $('#btn').on('click',(e)=>{
        b = !b
        e.preventDefault();
        if(b)
            recorder.start(10000);

        else
            recorder.stop();
    });

});
