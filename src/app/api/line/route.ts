// const request = require("request");

// //รับ request (แชทข้อความ) จาก line
// export default function Line(req, res) {
//   //for verificatoin
//   if (req.body.event.lenght === 0) {
//     res.status(200).json({});
//     reply("hello");
//     return;
//   }

//   let event = req.body.events[0];
//   let reply_token = event.replyToken;

//   if (event.message.text) {
//     reply(reply_token, event.message.text);
//   }
// }

// async function reply(reply_token, msg) {
//   let headers = {
//     "Content-type": "application/json",
//     Authorization: "Bearer {" + process.env.CHANNEL_ACCESS_TOKEN + "}",
//   };

//   let body = JSON.stringify({
//     replyToken: reply_token,
//     messages: Array.isArray(msg)
//       ? msg.map((message) => ({ type: "text", text: message }))
//       : [{ type: "text", text: msg }],
//   });

//   request.post({
//     url: "https://api.line.me/v2/bot/message/reply",
//     headers: headers,
//     body: body,
//   });
// }
