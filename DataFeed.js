const moment = require('moment');
const xlsx = require('node-xlsx');

// Settings for each wire
const settings = {
    1: {phase: true, startFrame: 19200, multiplier: 1.0},
    2: {phase: true, startFrame: 19200, multiplier: 1.0},
    3: {phase: true, startFrame: 19200, multiplier: 1.0},
    4: {phase: false, startFrame: 19200, multiplier: 1.0},
    5: {phase: true, startFrame: 19200, multiplier: 1.0},
    6: {phase: true, startFrame: 19200, multiplier: 1.0},
    7: {phase: true, startFrame: 19200, multiplier: 1.0},
    8: {phase: false, startFrame: 19200, multiplier: 1.0},
    9: {phase: true, startFrame: 19200, multiplier: 1.0},
    10: {phase: true, startFrame: 19200, multiplier: 1.},
    11: {phase: true, startFrame: 19200, multiplier: 1.0},
    12: {phase: false, startFrame: 19200, multiplier: 1.0}
}

//  Importing the files
const phase = xlsx.parse(`${__dirname}/assets/phase.xlsx`)[0].data;
const opgw = xlsx.parse(`${__dirname}/assets/opgw.xlsx`)[0].data;
// console.log(opgw);

// Calculate the trend data. Assuming 1 frame === 1 second
// const calcTrend = (data, frame, frameRange=7200, samplesNumber=12) => {
//     let trend = [];

//     for (let i = 0; i < samplesNumber-1; i++) {
//         let frameNumber = frame - i * (frameRange / samplesNumber);
//         let item = data[frameNumber] === undefined ? 0 : data[frameNumber][6];
        
//         trend.push(item)
//     }

//     return trend.reverse();
// }

// Fetch data from the XLS
const singleWireData = (objId, frame, ts ) => {
    
    const data = settings[objId].phase ? phase : opgw;
    
    return {
            "ts": ts,    
            "obj": objId,        
            "Tamb": data[frame][1],
            "F": data[frame][3],
            "Fmn": data[frame][2],
            "Fmx": data[frame][4],
            "Frms": data[frame][5],
            "I": data[frame][6],
            // "Itrend": calcTrend(data, frame),
            "VI": data[frame][7],
            "msg": [data[frame][8]]
            // "msg": data[frame][8]
    }

}

// Generate a slice of data with certain Frame signed by a TS
const multipleWireData = (ts, frame) => {
    // Array of wire IDS
    const ids = Object.keys(settings);
    return ids.map(id => singleWireData(parseInt(id, 10), settings[id].startFrame + frame, ts));
}

//  


module.exports = multipleWireData;

module.exports = {
    singleWireData,
    multipleWireData,
    settings
}

// New Format

// const JSONnew = [
//     {"ts": 121122222, "obj": 1, "F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "Itrend": [1,2,3,4], "VI": 1, "msg": [10,20,30]}
//     {"ts": 121122222, "obj": 1, "F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "Itrend": [1,2,3,4], "VI": 1, "msg": [10,20,30]}
//     {"ts": 121122222, "obj": 1, "F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "Itrend": [1,2,3,4], "VI": 1, "msg": [10,20,30]}
//     {"ts": 121122222, "obj": 1, "F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "Itrend": [1,2,3,4], "VI": 1, "msg": [10,20,30]}
//     {"ts": 121122222, "obj": 1, "F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "Itrend": [1,2,3,4], "VI": 1, "msg": [10,20,30]}
// ]



// Format OLD
// const JSON = {
//     "121122222" : {
//         "1": {"F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "VI": 1, "msg": [10,20,30]},
//         "2": {"F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "VI": 1, "msg": [10,20,30]},
//         "3": {"F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "VI": 1, "msg": [10,20,30]},
//         "4": {"F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "VI": 1, "msg": [10,20,30]},
//         "5": {"F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "VI": 1, "msg": [10,20,30]},
//         "6": {"F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "VI": 1, "msg": [10,20,30]},
//         "7": {"F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "VI": 1, "msg": [10,20,30]},
//         "8": {"F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "VI": 1, "msg": [10,20,30]},
//         "9": {"F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "VI": 1, "msg": [10,20,30]},
//         "10": {"F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "VI": 1, "msg": [10,20,30]},
//         "11": {"F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "VI": 1, "msg": [10,20,30]},
//         "12": {"F": 2000, "Fmn": 1900, "Fmx": 2100, "Frms": 20, "I": 10, "VI": 1, "msg": [10,20,30]}
//     }
// }