const express = require("express");
const router = express.Router();
const Word = require("./model");

// GET all
router.get("/", (req, res) => {
  Word.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// // GET 1
// router.get("/:_id", (req, res) => {
//   Word.findById(req.params._id).exec((err, data) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).send(data);
//   });
// });

// POST (create new data)
router.post("/", (req, res) => {
  const obj = new Word(req.body);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
  });
});

// PUT (update current data)
router.put("/:_id", (req, res) => {
  Word.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
  });
});

// DELETE (delete 1 data)
router.delete("/:_id", (req, res) => {
  Word.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("ลบข้อมูลเรียบร้อย");
  });
});

router.get('/add', (req, res, next) => {
  res.render('add')
})

router.post('/save', (req, res) => {
  const word = []
  const obj = req.body.full_word
  if (!/^[A-D]+$/.test(obj)) {
    res.render('add_wrong')
    throw 'Wrong Input'
  }

  // create array of alphabet from word entered
  for (const alphabet of obj) {
    // check valid char
    word.push(alphabet)
  }
  const num = word.length

  req.body.full_word = word
  req.body.remaining = num
  const obj2 = new Word(req.body)
  // push array to database
  obj2.save().then(item => {
    res.render('add')
  })
})

module.exports = router;