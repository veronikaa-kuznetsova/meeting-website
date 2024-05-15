const express = require('express')
const Profession = require('../models/Profession')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  try {
    const list = await Profession.find()
    if (!list) {
      return res.json({ message: 'Профессии не найдены' })
    }
    res.status(200).json(list)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже' })
  }
})

module.exports = router
