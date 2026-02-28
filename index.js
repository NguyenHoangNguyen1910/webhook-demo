const express = require("express");
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  const p = req.body.queryResult?.parameters || {};

  const total =
    Number(p.q1||0)+Number(p.q2||0)+Number(p.q3||0)+
    Number(p.q4||0)+Number(p.q5||0)+Number(p.q6||0)+
    Number(p.q7||0)+Number(p.q8||0)+Number(p.q9||0);

  let level="";
  if(total<=18) level="Burnout thấp";
  else if(total<=36) level="Burnout trung bình";
  else level="Burnout cao";

  res.json({
    fulfillmentText:`Tổng điểm: ${total}. Mức độ: ${level}`
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server chạy tại port " + PORT);
});