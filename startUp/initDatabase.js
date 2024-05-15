const professionMock = require('../mock/professions.json')
const Profession = require('../models/Profession')

module.exports = async () => {
  const professions = await Profession.find()
  if (professions.length !== professionMock.length) {
    await createInitialEntity(Profession, professionMock)
  }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (error) {
        return error
      }
    }),
  )
}
