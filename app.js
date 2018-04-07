//export GOOGLE_APPLICATION_CREDENTIALS="gcp.json"
const express = require('express');
const body_parser = require('body-parser');
var questions = require("./questions");
var fs = require('fs');

//GCP Speech to text
const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();





var app = express();

app.set('view engine','ejs');

app.use(express.static('static'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));


app.get('/',(req,res)=>{

    res.render('index');
});





var b = false;







app.post('/',(req,res)=>{

    b = !b;
    const encoding = 'LINEAR16';
    const sampleRateHertz = 16000;
    const languageCode = 'en-US';

    const request = {
      config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
      },
      interimResults: false, // If you want interim results, set this to true
    };

    // Create a recognize stream
    const recognizeStream = client
      .streamingRecognize(request)
      .on('error', console.error)
      .on('data', (data) =>{
          res.end(data.results[0].alternatives[0].transcript);
      }

      );

    // Start recording and send the microphone input to the Speech API
    if(b){
        record
          .start({
            sampleRateHertz: sampleRateHertz,
            threshold: 0,
            // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
            verbose: false,
            recordProgram: 'rec', // Try also "arecord" or "sox"
            silence: '2.0',
          })
          .on('error', console.error)
          .pipe(recognizeStream);

        console.log('Listening.....');
    }
    else
        record.stop()

});


app.post('/submit',(req,res)=>{
    var f=0;
    for(qs of questions){

        if(qs.question === req.body.question){
            f=1;
            res.send(qs.answer);
            break;
        }

    }
    if(f==0)
        res.send('Sorry, I don\'t have the answer to that question at the moment');

});

app.listen(5000,()=>console.log("Listening on port 5000"));
