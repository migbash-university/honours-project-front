/**
 * Description:
 * ~~~~~~~~~~
 * ... store the user's responses & ,
 * ... data in a ".json" file for further & ,
 * ... future analytics,
*/
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { init } from "$lib/mongodb/init";
import { dev } from "$app/env";


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
    // ...
    data = data.data;
    // ...
    delete data['_id']
    // ... create new fil and wrtie data to file;
    const { db } = await init();
    // ...
    await db.collection("participants")
      .update(
        { 'userUID': data.userUID }, 
        { '$set': data } , 
        { upsert: true }
      )
      .then(function(result) {
        if (dev) console.log("✅ data saved");
      });
    // ...
    return {
        status: 200,
        body: {
            msg: '✅ data saved'
        }
    }
}