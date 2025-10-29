const ConfigModel = require('../models/ConfigDataModel')

const getConfig = async (req,res)=>{
const config = await ConfigModel.findOne()
res.json(config)
}


const updateConfig = async (req,res)=>{
    try {
        const updatedItem = await ConfigModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )

        res.json(updatedItem)
    } catch (error) {
        res.status(500)
    }
}


module.exports = {getConfig,updateConfig}