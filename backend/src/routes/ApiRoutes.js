const express = require('express')
const router = express.Router()
const {getItems, addItem,  incrementItem} = require('../controllers/ApiControllers')
const {getConfig, updateConfig} = require('../controllers/ConfigDataControllers')


router.get('/', (req,res)=>{
    res.send("hi")
})


router.get('/items', getItems)
router.post('/items', addItem)

router.put('/items/:id', incrementItem)



router.get("/config", getConfig)

router.put("/config/:id", updateConfig)
module.exports = router