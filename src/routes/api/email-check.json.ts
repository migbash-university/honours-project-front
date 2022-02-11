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
*/
export async function get(): Promise < any > {
    try {
        // ...
        const path = 'data/'
        // ...
        fs.readdir(path, (err, files) => {
            files.forEach(async file => {
                if (file.toString().includes('.json')) {
                    // ...
                    const fileUserData = await loadFileContents(path + file)
                    // ...
                    const userEmail: string = fileUserData.userEmail
                    if (dev) console.log(userEmail);

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
                }
            });
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