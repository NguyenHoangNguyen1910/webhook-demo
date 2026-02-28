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
  const queryResult = req.body.queryResult || {};
  const contexts = queryResult.outputContexts || [];

  // tìm parameter từ context hoặc trực tiếp
  const getParam = (name) => {
    for (let ctx of contexts) {
      if (ctx.parameters && ctx.parameters[name] !== undefined) {
        return toNumber(ctx.parameters[name]);
      }
    }
    return toNumber(queryResult.parameters?.[name]);
  };

  // lấy dữ liệu
  const q1 = getParam("q1");
  const q2 = getParam("q2");
  const q3 = getParam("q3");
  const q4 = getParam("q4");
  const q5 = getParam("q5");
  const q6 = getParam("q6");
  const q7 = getParam("q7");
  const q8 = getParam("q8");
  const q9 = getParam("q9");

  // ===== tính burnout =====
  // EE: q1 q2 q3
  const ee = (q1 + q2 + q3) / 3;

  // CY: q4 q5 q6
  const cy = (q4 + q5 + q6) / 3;

  // PE (đảo điểm): q7 q8 q9
  const pe = (
    reverseScore(q7) +
    reverseScore(q8) +
    reverseScore(q9)
  ) / 3;

  // trung bình chung
  const totalAvg = (ee + cy + pe) / 3;

  res.json({
    fulfillmentText:
      `Kết quả Burnout của bạn:\n` +
      `- Kiệt sức (EE): ${ee.toFixed(2)}/6\n` +
      `- Hoài nghi (CY): ${cy.toFixed(2)}/6\n` +
      `- Hiệu suất (PE-đảo): ${pe.toFixed(2)}/6\n` +
      `------------------\n` +
      `Burnout trung bình: ${totalAvg.toFixed(2)}\n` +
      `Kết luận: ${classifyBurnout(totalAvg)}`
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server chạy tại port " + PORT);
});
