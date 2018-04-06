//source ~/.bashrc
//gcloud auth activate-service-account --key-file=./gcp.json
const express = require('express');
const body_parser = require('body-parser');
var questions = require("./questions");
var fs = require('fs');


var app = express();

app.set('view engine','ejs');

app.use(express.static('static'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));


app.get('/',(req,res)=>{

    res.render('index');
});


app.post('/',(req,res)=>{
      //
      // var params = {
      //   audio: fs.createReadStream('audio-file1.flac'),
      //   content_type: 'audio/flac',
      //   timestamps: true,
      //   word_alternatives_threshold: 0.9,
      //   keywords: ['colorado', 'tornado', 'tornadoes'],
      //   keywords_threshold: 0.5
      // };
      //
      // speech_to_text.recognize(params, function(error, transcript) {
      //   if (error)
      //     console.log('Error:', error);
      //   else{
      //       var qs =  JSON.parse( JSON.stringify(transcript, null, 2) ).results[0].alternatives[0].transcript;
      //       console.log(qs);
      //       var f=0;
      //       for(i of questions){
      //           if(i.question == qs){
      //               res.send(i.answer);
      //               f=1;
      //               break;
      //           }
      //
      //       }
      //       if(f==0)
      //           res.send("please ask something different");
      //   }
      // });
      var f = 0;
      for(i of questions){

        if(i.question == req.body.question){
            res.send(i.answer);
            f=1;
            break;
        }

    }
    if(f==0)
        res.send("please ask something different");


});

app.listen(5000,()=>console.log("Listening on port 5000"));
