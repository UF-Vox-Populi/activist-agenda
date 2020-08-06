const mailgun = require("mailgun-js");

var mgAPI = process.env.MG_API || '89ba1a16d628f9c38d3fc47828016993-ffefc4e4-74054983';
var mgDOMAIN = 'mg.activistagenda.vision';
var mg = mailgun({apiKey: mgAPI, domain: mgDOMAIN});

export default function sendMail(from, to, subject, text) {
    const data = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
}