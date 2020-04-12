const mongoose = require("mongoose");

const gameSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    full_word: {
      type: Array
    },
    remaining: {
      type: Number
    },
    word_trash: {
      type: Array
    },
    wrong_count: {
      type: Number
    }
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "word",
    versionKey: false
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
const Word = mongoose.model("word", gameSchema);
module.exports = Word;