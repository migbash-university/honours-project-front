// import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { init } from "$lib/mongodb/init";
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
export async function post({ params, request }, res): Promise < any > {
    // ... incoming-data;
    const data = await request.json(); // ... or request.json(), etc
    // ...
    const userUID: string = data.userUID;
    // ... check if FILE ALREADY EXISTS;
    const { db } = await init();
    // ...
    return await db.collection("participants")
      .findOne({
        'userUID': userUID
      })
      .then(function(result) {
      // ...
      // if (dev) console.debug('result', result)
      // ...
      if (result) { 
        return {
          status: 200,
          body: {
              auth: true,
              user_data: result
          }
        }
      }
      else {
        return {
          status: 200,
          body: {
              auth: false
          }
        }
      }
    });
}