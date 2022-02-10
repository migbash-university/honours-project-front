// import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
import { dev } from '$app/env';

/**
 * Description:
 * ~~~~~~~~~~
 * ... assign a Unique ID number-string to the participant;
 * ~~~~~~~~~~
 * Returns:
 * ~~~~~~~~~~
 * {userUID: ''}
*/
export async function get(): Promise < any > {
    // ...
    let userUID: string
    while (true) {
        // ... generate a new userUID;
        userUID = Math.random().toString().slice(2,11);
        // ... check if FILE ALREADY EXISTS;
        const path = 'data/' + userUID + '.json'
        if (fs.existsSync(path)) {
            // if (dev) console.debug('file-exists', path)
            continue;
        }
        else {
            break;
        }
    }
    // ...
    return {
        body: {
            userUID: userUID
        }
    }
}