const mongoose = require("mongoose");

const gameSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    full_word: {
      type: Array
    }
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "word"
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
const Word = mongoose.model("word", gameSchema);
module.exports = Word;