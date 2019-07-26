const express = require("express");
const moment = require("moment");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

let sseExpress = require("sse-express");
const init = require("./Init");
const { multipleWireData, singleWireData, settings } = require("./DataFeed");

// To sync history with fresh
let framesFromStart = 0;
let dataRateSecs = 10;

let FRESHRATE = 10; // secs
let HISTORYRATE = 300; //secs

app.get("/sse", sseExpress, (req, res) => {
  console.log("Request from client");

  //Emit init data
  res.sse("schema", init);

  // Each 1 sec create a data slice signed with current time in UNIX, then feed it to SSE. Current TS serves as an ID
  setInterval(() => {
    let nowTS = moment().unix();

    res.sse("fresh", multipleWireData(nowTS, framesFromStart), nowTS);
    framesFromStart = framesFromStart + FRESHRATE;
  }, FRESHRATE * 1000);
});

//
app.get("/", (req, res) => {
  console.log("Incoming TCP ping");
  res.send("Some response");
});

app.post("/h", (req, res) => {
  let result = [];
  let nowTS = moment().unix();
  console.log(req.body);

  req.body.forEach(req => {
    // key = wire ID
    let key = Object.keys(req).join("");

    // Frame number for last fresh
    const nowFrame = settings[key].startFrame + framesFromStart;

    // get to individual array of ranges
    req[key].forEach(arr => {
      // loop through tss with step 1
      for (let ts = arr[0]; ts <= arr[1]; ts = ts + HISTORYRATE) {
        // console.log('ts', ts);
        // console.log('now frame', nowFrame);
        // console.log('now ts', nowTS);

        //FIXME: A bug, because of latency => have to round stuff
        let frame = Math.round(nowFrame - (nowTS - ts));
        // console.log(
        //     '[NOW FRAME]',nowFrame,
        //     '[NOW TS]',nowTS,
        //     '[CALC TS]',ts,
        //     '[NOW TS] - [CALC TS]',(nowTS-ts),
        //     '[DATA FRAME]',frame
        // );
        result.push(singleWireData(parseInt(key, 10), frame, ts));
      }
    });
  });

  res.send(result);
});

app.listen(5000);
