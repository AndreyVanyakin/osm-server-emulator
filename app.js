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

const FRESHRATE = 10; // secs
const PING_RATE_SECS = 15;
const KEEPALIVE_RATE_SECS = 60;
const HISTORYRATE = 300; //secs

app.get("/sse", sseExpress, (req, res) => {
  console.log("Request from client");

  //Emit init data
  res.sse("schema", init);

  // Each 1 sec create a data slice signed with current time in UNIX, then feed it to SSE. Current TS serves as an ID
  setInterval(() => {
    let nowTS = moment().unix();

    console.log("Sending fresh");
    res.sse("fresh", multipleWireData(nowTS, framesFromStart), nowTS);
    framesFromStart = framesFromStart + FRESHRATE;
  }, FRESHRATE * 1000);

  // SEND UNIDIRECTIONAL PINGS FOR CLIENT TO DETECT DISCONNECTS
  setInterval(() => {
    console.log(moment().format("MM:ss"), "Sending PING");
    res.sse("ping", PING_RATE_SECS);
  }, PING_RATE_SECS * 1000);

  // SEND EMPTY MESSAGES TO KEEP CONNECTION ALIVE
  setInterval(() => {
    console.log(moment().format("mm:ss"), "Sending KEEP-ALIVE");
    res.sse("", KEEPALIVE_RATE_SECS);
  }, KEEPALIVE_RATE_SECS * 1000);
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
