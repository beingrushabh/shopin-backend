const AWS = require("aws-sdk");
const express = require("express");
const config = require("./Config.json");
const cors = require("cors");
const app = express();

//AWS config update
AWS.config.update({
  apiVersion: "2010-12-01",
  accessKeyId: config.AccessKeyID,
  secretAccessKey: config.SecretAccessKey,
  region: "us-east-1",
});

//SO we wont get cross origin connection error
var corsOptions = {
  credentials: true,
};
app.use(cors(corsOptions));

function encode(data) {
  let buf = Buffer.from(data);
  let base64 = buf.toString("base64");
  return base64;
}

app.get("/GetObject", (req, res) => {
  var params = {
    Bucket: "shopin1",
    Key: "logo.png",
  };
  console.log(params);
  var s3 = new AWS.S3();
  s3.getObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      var s3url = "data:image/jpeg;base64," + encode(data.Body);
      res.send(s3url);
    }
  });
});

var PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("listening on port 5000.."));
