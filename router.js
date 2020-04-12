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

router.get('/add', (req, res) => {
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
  req.body.wrong_count = 0

  const obj2 = new Word(req.body)
  // push array to database
  obj2.save().then(item => {
    res.redirect('./play')
  })
})

router.get('/play', (req, res) => {
  Word.findOne().sort({_id: -1}).limit(1).exec((err, data) => {
    res.render('play', {data})
  })
})

router.post('/play', (req, res) => {
  // obj คือ A หรือ B หรือ C หรือ D ที่ user ทาย
  const obj = req.body.alphabet

  Word.findOne().sort({_id: -1}).limit(1).exec((err, data) => {
    const first_alphabet = data.full_word[0]
    // กรณีทายผิด
    if (first_alphabet !== obj) {
      data.wrong_count += 1
      data.save()
      console.log('Update finished, incorrect answer.')
      res.redirect('./play')
    } else {    // กรณีทายถูก
      data.word_trash.push(first_alphabet)
      data.full_word.shift()
      data.remaining -= 1
      data.save()
      console.log('Update finished, correct answer.')
      if (data.remaining === 0) {
        res.redirect('./score')
      } else res.redirect('./play')
    }
  })
})

router.get('/score', (req, res) => {
  Word.findOne().sort({_id: -1}).limit(1).exec((err, data) => {
    res.render('score', {data})
  })
})

module.exports = router;