// import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// ~~~~~~~~~~~~
// ... LIBRARY & API DEPNDENCIES,
const nodemailer = require('nodemailer');
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');

import { dev } from '$app/env';
import { init } from '$lib/mongodb/init';

// ~~~~~~~~~~~~
// ... EMAIL CONFIG,
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',          // ... ZOHO HOST;
    port: 465,                      // ... ZOHO PORT;
    secure: true,                   // ... use SSL;
    service: 'gmail',
    auth: {                         // ... email & pass (AUTH.);
        user: import.meta.env.VITE_EMAIL.toString(),
        pass: import.meta.env.VITE_EMAIL_PASSWORD.toString()
    }
});
// ~~~~~~~~~~~~
// ... open template file, (Using Handlebars.JS);
const email_template = fs.readFileSync(path.join('static/email/', 'email-invite-back.hbs'), 'utf8');
// ~~~~~~~~~~~~
// ... create email generator template with Handlebars, to populate email template;
const template = Handlebars.compile(email_template);

/**
 * Description:
 * ~~~~~~~~~~
 * ... assign a Unique ID number-string to the participant;
*/
export async function get(): Promise < any > {
    try {
        // ... GET ALL PARTICIPANTS;
        const { db } = await init();
        // ...
        const data: any[] = await db.collection("participants")
          .find().toArray()
          .then(function(result) {
            if (result) {
              if (dev) console.log('result', result)
              return result;
            }
          });
        // ...
        if (dev) console.debug('data', data)
        // ...
        data.forEach(async (fileUserData: any) => {
            // ...
            if (dev) console.debug('fileUserData', fileUserData)
            // ...
            const userEmail: string = fileUserData.userEmail
            const lastTestDate: number = fileUserData.last_test_completion_date
            // ...
            const lastDate = new Date(lastTestDate);
            // ... determine-difference-in-days;
            const newDate = new Date(lastDate).getDate(); //convert string date to Date object
            const currentDate = new Date().getDate();
            const diff = currentDate - newDate;
            // ... act-accordingly;
            if (diff > parseInt(import.meta.env.VITE_TEST_INTERVAL.toString()) &&
                parseInt(fileUserData.current_test_status.toString()) < parseInt(import.meta.env.VITE_TOTAL_TEST_NUMBER.toString()) &&
                fileUserData.emailNotified == false) {
                // ...
                fileUserData.emailNotified = true;
                // ~~~~~~~~~~
                // ... declare VARs;
                const from = 'StarBased Project <starbasedproject@gmail.com>'
                const subject = 'Welcome next StarBased Test!'
                // ~~~~~~~~~~
                // ... attachments of the email;
                const attachments = [
                    // ~~~~~~~~~~
                    // ... ENUCS LOGO ICONS FOOTER
                    {
                        filename: 'starbased-logo.png',
                        path: 'static/email/assets/starbased-logo.png',
                        cid: 'starbasedLogo'     // same cid value as in the html img src
                    },
                ]
                // ... declare email opts. ;
                const mailOptions = {
                    from: from,                                 // ... FROM email;
                    to: userEmail,                              // ... TO - Member email;
                    subject: subject,                           // ... EMAIL SUBJECT / TITLE;
                    attachments: attachments,                   // ... necessary IMGs & FILES for the EMAIL;
                    html: template(fileUserData)                // ... process template with locals - {passwordResetAddress};
                };
                // ~~~~~~~~~~
                // ... finalize the POST request & send out email;
                // res.setHeader('Content-Type', 'application/json');
                // ...
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                        // res.end(JSON.stringify(error));
                    } else {
                        // res.end(JSON.stringify(info.response));
                        // console.log('Email sent: ' + info.response);
                    }
                });
                // ~~~~~~~~~~
                //... write back NEW DATA to the MEMBERS LIST FILE;
                delete fileUserData['_id'];
                // ...
                await db.collection("participants").update(
                  { 'userUID': fileUserData.userUID },
                  { '$set': fileUserData },
                  { upsert: true }
                );
            }
        });
        // ...
        return {
            body: {
                msg: "Success!'"
            }
        }
    } catch (error) {
        // ...
        return {
            body: {
                msg: error
            }
        }
    }
}