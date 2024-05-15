const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true })

router.patch('/:user', auth, async (req, res) => {
  try {
    const { user } = req.params

    if (user === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(user, req.body, {
        new: true,
      })
      res.send(updatedUser)
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const list = await User.find()
    res.status(200).send(list)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже' })
  }
})

router.get('/:user', auth, async (req, res) => {
  try {
    const { user } = req.params

    User.findOne({ _id: user }, (error, doc) => {
      if (error) {
        console.log(error)
        return res.status(500).json({
          message: 'Не удалось получить пользователя',
        })
      }

      res.json(doc)
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже' })
  }
})

// router.get('/friends/:user', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.user)
//     const friends = await Promise.all(
//       user.following.map((friendId) => {
//         return User.findById(friendId)
//       })
//     )
//     let friendList = []
//     friends.map((friend) => {
//       const { _id, name, avatar } = friend
//       friendList.push({ _id, name, avatar })
//     })
//     res.status(200).json(friendList)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

// router.put('/:user/follow', auth, async (req, res) => {
//   const id = req.params.user
//   const { currentUserId } = req.body

//   if (currentUserId === id) {
//     res.status(403).json(`You can't follow yourself`)
//   } else {
//     try {
//       const followUser = await User.findById(id)
//       const followingUser = await User.findById(currentUserId)

//       if (!followUser.followers.includes(currentUserId)) {
//         await followUser.updateOne({ $push: { followers: currentUserId } })
//         await followingUser.updateOne({ $push: { following: id } })
//         res.status(200).json('You have successfully subscribed')
//       } else {
//         res.status(403).json('The user is already following you')
//       }
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: 'На сервере произошла ошибка. Попробуйте позже' })
//     }
//   }
// })

// router.put('/:user/unfollow', auth, async (req, res) => {
//   const id = req.params.user

//   const { currentUserId } = req.body

//   if (currentUserId === id) {
//     res.status(403).json('Action forbidden')
//   } else {
//     try {
//       const followUser = await User.findById(id)
//       const followingUser = await User.findById(currentUserId)

//       if (followUser.followers.includes(currentUserId)) {
//         await followUser.updateOne({ $pull: { followers: currentUserId } })
//         await followingUser.updateOne({ $pull: { following: id } })
//         res.status(200).json('User Unfollowed!')
//       } else {
//         res.status(403).json('User is not followed by you')
//       }
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: 'На сервере произошла ошибка. Попробуйте позже' })
//     }
//   }
// })

module.exports = router
