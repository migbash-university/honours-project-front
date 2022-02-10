import { dev } from "$app/env";

/**
 * Description:
 * ~~~~~~~~~~
 * ... store the user's responses & ,
 * ... data in a ".json" file for further & ,
 * ... future analytics,
*/
// import fs from 'fs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

/**
 * Description:
 * ~~~~~~~~~~
 * ... intercepts the `POST` data from the Server-Middleware,
 * ... and creates OR appends to existing .CSV file for user data storing,
 * ~~~~~~~~~~
 * Returns:
 * NaN 
 * ... @param {*} req 
 * ... @param {*} res 
*/
export async function post({ params, request }, res): Promise < any > {
    // ... incoming-data;
    let data = await request.json(); // or request.json(), etc
    // ... path-declared;
    const path = 'data/' + data.data['userUID'] + '.json'
    // ...
    data = JSON.stringify(data.data, null, 4);
    // ... DEBUGGING;
    // if (dev) console.debug('ℹ test data recorded!', data)
    // ... create new fil and wrtie data to file;
    fs.writeFile(path, data, 'utf8', function (err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
                return
            } else {
                console.log('Data has been saved to file!');
                return
            }
    });
    // ...
    return {
        status: 200,
        body: {
            msg: '✅ Success! League list cache data has been updated!'
        }
    }
}


/**
 * Description:
 * ~~~~~~~~~~
 * ... function - Method updates re-formats the Object According
 * ... to the necessary properties and parameters of the data,
 * ~~~~~~~~~~
 * Returns:
 * Reformatted JSON object in line with the CSV format outlined,
 * ... @param {*} dataObj 
 * ... @returns 
*/
// function reformatJSONObj(dataObj) {
//     delete dataObj.pastUserOptionsSelect;

//     var newObj = {};

//     // console.log('checkpointObject_1', dataObj.selectedTimeSlots);

//     /**
//      * Dealing with `selectedTimeSlots` 
//      */
//     let timeslotArray = dataObj.selectedTimeSlots;
//     let timeSlotCounter = 0;
//     for (let element of timeslotArray) {
//         // console.log('element-time', element.time);
//         let str = element.time.replace(/\r?\n|\r/g, " ");
//         newObj['selectedTimeSlot_' + timeSlotCounter] = str;
//         timeSlotCounter++;
//     };

//     // console.log('checkpointObject_1', newObj);

//     /**
//      * Dealing with `AllocatedTimeSlots` 
//      */
//     let timeslotArray_2 = dataObj.algorithmRoundResponseData.userData.allocatedTimeSlots;
//     let timeSlotCounter_2 = 0;
//     for (let element of timeslotArray_2) {
//         // console.log('element-time', element.time);
//         let str = element.time.replace(/\r?\n|\r/g, " ");
//         newObj['allocatedTimeSlot_' + timeSlotCounter_2] = str;
//         timeSlotCounter_2++;
//     };

//     // console.log('checkpointObject_2', newObj);

//     /**
//      * Piece the final Data Together;
//      */
//     newObj = {
//         attempt: dataObj.attemptNumber,
//         ...newObj,
//         fairnessScore_1: dataObj.userSatisfaction1stRound.fairness,
//         satisfactionScore_2: dataObj.userSatisfaction2ndRound.satisfaction,
//         fairnessScore_2: dataObj.userSatisfaction2ndRound.fairness,
//         percentageCorrectlyAllocated: dataObj.percentageTimeSlotsSatisfied,
//     };

//     return newObj;
// }