const Mainlatlng = require('./MainLineLatLng');

const init = {
    // Департаменты, если всего один, то рендерить аккордеон не нужно
    deps:
        {
            1: {lines: [1], Name:"Ставропольское ПМЭС"},
            2: {lines: [2], Name:"Кубанское ПМЭС"}
        },
    
    lines:
        {
            1: {ranges: [1,2], Name:"ВЛ 330кВ Нальчик-Владикавказ-2", latlng: Mainlatlng, parentDep: 1 },
            2: {ranges: [3], Name:"ВЛ 220кВ Нальчик-Баксан", latlng: [[43.347893, 44.502565],[43.190809, 44.437718],[43.170221, 44.274261]], parentDep: 2}
        },

    ranges: 
        {
            1: {obj: [1,2,3,4], towers:[1,2], latlng: [[43.066426664708, 44.478042125702],[43.082688534652, 44.506098031998]], distance:3.1, parentLine: 1},
            2: {obj: [5,6,7,8], towers:[2,3], latlng: [[43.082688534652, 44.506098031998],[43.08274926, 44.51645941]], distance:1.5, parentLine: 1},
            3: {obj: [9,10,11,12], towers:[4,5], latlng: [[43.347893, 44.502565],[43.190809, 44.437718]], distance:4.4 ,parentLine: 2}  
        },

    towers: 
        {
            1: {number: "757", Name: "У330-2ту+5", Type: "DE", hasSensors: false, coordinates: [43.08274926, 44.51645941]},
            2: {number: "753", Name: "У330-3В+5", Type: "DE", hasSensors: true, coordinates: [43.082688534652, 44.506098031998]},
            3: {number: "736", Name: "У330-2ту+5", Type: "DE", hasSensors: false, coordinates: [43.066426664708, 44.478042125702]},
            5: {number: "211", Name: "У220-2", Type: "DE", hasSensors: true, coordinates: [43.347893, 44.502565]},
            4: {number: "245", Name: "У220-2+14", Type: "DE", hasSensors: false, coordinates: [43.190809, 44.437718]}
        },

    obj: 
        { 
            1: {Type: "1_phaseA", sensorID: "-16-010", Fy: 10000, Fr: 15000, FRms: 200, Iy: 5, Ir: 10, parentRange: 1},
            2: {Type: "2_phaseA", sensorID: "-16-011", Fy: 10000, Fr: 15000, FRms: 200, Iy: 5, Ir: 10, parentRange: 1},
            3: {Type: "3_phaseA", sensorID: "-16-012", Fy: 10000, Fr: 15000, FRms: 200, Iy: 5, Ir: 10, parentRange: 1},
            4: {Type: "4_OPGW", sensorID: "-07-007", Fy: 10000, Fr: 15000, FRms: 200, Iy: 5, Ir: 10, parentRange: 1},
            5: {Type: "1_phaseA", sensorID: "-16-013", Fy: 10000, Fr: 15000, FRms: 200, Iy: 5, Ir: 10, parentRange: 2},
            6: {Type: "2_phaseA", sensorID: "-16-014", Fy: 10000, Fr: 15000, FRms: 200, Iy: 5, Ir: 10, parentRange: 2},
            7: {Type: "3_phaseA", sensorID: "-16-015", Fy: 10000, Fr: 15000, FRms: 200, Iy: 5, Ir: 10, parentRange: 2},
            8: {Type: "4_OPGW", sensorID: "-07-008", Fy: 10000, Fr: 15000, FRms: 200, Iy: 5, Ir: 10, parentRange: 2},
            9: {Type: "1_phaseA", sensorID: "-16-016", Fy: 10000, Fr: 15000, FRms: 200, Iy: 5, Ir: 10, parentRange: 3},
            10: {Type: "2_phaseA", sensorID: "-16-017", Fy: 10000, Fr: 15000, FRms: 200, Iy: 5, Ir: 10, parentRange: 3},
            11: {Type: "3_phaseA", sensorID: "-16-018", Fy: 10000, Fr: 15000, FRms: 200, Iy: 5, Ir: 10, parentRange: 3},
            12: {Type: "4_OPGW", sensorID: "-07-009", Fy: 10000, Fr: 15000, FRms: 200, Iy: 5, Ir: 10, parentRange: 3}
        },

    units: 'mertric / imperial'
};

module.exports = init;