// import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
import { dev } from '$app/env';
import { init } from '$lib/mongodb/init';

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
    const { db } = await init();
    // ...
    const resultArray: string[] = await db.collection("participants")
      .distinct('userUID')
      .then(function(result) {
        // ... DEBUGGING;
        if (dev) console.debug('result', result)
        // ...
        return result
    });
    // ...
    while (true) {
      // ...
      const userUID = Math.random().toString().slice(2,11);
      // ...
      if (resultArray.includes(userUID) === false) { 
        return {
          status: 200,
            body: {
              userUID: userUID
          }
        }
      }
    }
}