const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')
const cors = require('cors')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads')
    }
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api', routes)
app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})
app.use('/api/uploads', express.static('uploads'))

const PORT = process.env.PORT ?? 4000

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase()
    })
    await mongoose.connect(process.env.mongoUri)
    app.listen(4000, () => console.log(`Сервер запущен на порту ${PORT}`))
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

start()
