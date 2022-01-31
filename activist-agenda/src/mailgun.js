const mailgun = require("mailgun-js");

var mgAPI = process.env.MG_API || '';
var mgDOMAIN = process.env.MG_DOMAIN || 'mg.activistagenda.vision';
var mg = mailgun({apiKey: mgAPI, domain: mgDOMAIN});

export function sendMail(from, to, subject, text) {
    const data = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };
    mg.messages().send(data, function (error, body) {
        if (error) throw error;
    });
}

export function sendMailHtml(from, to, subject, html) {
    const data = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };
    mg.messages().send(data, function (error, body) {
        if (error) throw error;
    });
}
