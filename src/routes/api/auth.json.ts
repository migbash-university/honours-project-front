// import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
import { dev } from '$app/env';

/**
 * Description:
 * ~~~~~~~~~~~~
 * ... an ASYNC/AWAIT function-method
 * ... for reading files SEQUENTIALLY;
 * 
 * ... @param {*} fileName 
 * ... @returns 
*/
async function loadFileContents(fileName) {
    let data = await fs.promises.readFile(
        fileName, 
        "utf8", 
        function(err, fileData) {
            // check-for-reading-errors
            if (err) {
                throw new Error(err)
            }
            return fileData
    });
    data = JSON.parse(data);
    return data;
}

/**
 * Description:
 * ~~~~~~~~~~
 * ... assign a Unique ID number-string to the participant;
 * ~~~~~~~~~~
 * Returns:
 * ~~~~~~~~~~
 * {userUID: ''}
*/
export async function post({ params, request }, res): Promise < any > {
    // ... incoming-data;
    const data = await request.json(); // or request.json(), etc
    // ...
    const userUID: string = data.userUID;
    let userExists = false;
    let fileUserData: any;
    // ...
    // ... check if FILE ALREADY EXISTS;
    const path = 'data/' + userUID + '.json'
    if (fs.existsSync(path)) {
        userExists = true;
        // ... return user-data;
        fileUserData = await loadFileContents(path)
    }
// ...
    if (userExists) {
        // ...
        return {
            status: 200,
            body: {
                auth: userExists,
                user_data: fileUserData
            }
        }
    } else {
        // ...
        return {
            status: 200,
            body: {
                auth: userExists
            }
        }
    }
}