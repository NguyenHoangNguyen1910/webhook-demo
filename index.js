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

  app.post("/", (req, res) => {
  const queryResult = req.body.queryResult;
  const contexts = queryResult.outputContexts || [];
  
  // Hàm phụ để tìm giá trị parameter trong tất cả contexts
  const getParam = (name) => {
    for (let ctx of contexts) {
      if (ctx.parameters && ctx.parameters[name] !== undefined) {
        return toNumber(ctx.parameters[name]);
      }
    }
    return toNumber(queryResult.parameters[name]); // Thử lấy trực tiếp nếu context không có
  };

  // Lấy dữ liệu an toàn từ Contexts
  const q1 = getParam('q1');
  const q2 = getParam('q2');
  const q3 = getParam('q3');
  const q4 = getParam('q4');
  const q5 = getParam('q5');
  const q6 = getParam('q6');
  const q7 = getParam('q7');
  const q8 = getParam('q8');
  const q9 = getParam('q9');

  // ... (Phần tính toán EE, CY, PE của bạn giữ nguyên vì đã đúng)
  
  // Trả kết quả
  res.json({
    fulfillmentText: `Kết quả Burnout của bạn:\n` +
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
