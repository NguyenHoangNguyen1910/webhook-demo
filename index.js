const express = require("express");
const app = express();

app.use(express.json());

// đảo điểm PE (thang 0–6)
const reverseScore = (score) => 6 - score;

// ép số an toàn
const toNumber = (v) => Number(v || 0);

// phân loại burnout theo trung bình 0–6
const classifyBurnout = (totalAvg) => {
  if (totalAvg <= 2) return "Burnout thấp";
  if (totalAvg <= 4) return "Burnout trung bình";
  return "Burnout cao";
};

app.post("/", (req, res) => {
  const p = req.body.queryResult?.parameters || {};

  // lấy dữ liệu
  const q1 = toNumber(p.q1);
  const q2 = toNumber(p.q2);
  const q3 = toNumber(p.q3);
  const q4 = toNumber(p.q4);
  const q5 = toNumber(p.q5);
  const q6 = toNumber(p.q6);
  const q7 = toNumber(p.q7);
  const q8 = toNumber(p.q8);
  const q9 = toNumber(p.q9);

  // EE (1–3)
  const ee = (q1 + q2 + q3) / 3;

  // CY (4–6)
  const cy = (q4 + q5 + q6) / 3;

  // PE đảo điểm (7–9)
  const pe = (
    reverseScore(q7) +
    reverseScore(q8) +
    reverseScore(q9)
  ) / 3;

  // burnout tổng (trung bình 3 thang)
  const totalAvg = (ee + cy + pe) / 3;

  // phân loại
  const level = classifyBurnout(totalAvg);

  res.json({
    fulfillmentText:
      `EE: ${ee.toFixed(2)}\n` +
      `CY: ${cy.toFixed(2)}\n` +
      `PE (đảo): ${pe.toFixed(2)}\n` +
      `Burnout trung bình: ${totalAvg.toFixed(2)}\n` +
      `Mức độ: ${level}`
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server chạy tại port " + PORT);
});
