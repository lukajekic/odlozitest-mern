const ApiModel = require('../models/ApiModels')
const mongoose = require('mongoose')
// GET /api/items
const getItems = async (req, res) => {
    try {
        const now = new Date()
        console.log(now)
        const items = await ApiModel.find({date: {$gte: now }}).sort({date: 1})
        return res.json(items)
    } catch (err) {
        console.error('getItems error:', err)
        return res.status(500).json({ error: 'Failed to fetch items' })
    }
}

// POST /api/items
const addItem = async (req, res) => {
    try {
        const { title, subject, date, votes, closed } = req.body || {}
        if (!title || !subject || typeof votes === 'undefined') {
            return res.status(400).json({ error: 'title, subject and votes are required' })
        }

        const newItem = new ApiModel({ title, subject, date, votes, closed })
        await newItem.save()
        return res.status(201).json(newItem)
    } catch (error) {
        console.error('addItem error:', error)
        return res.status(500).json({ error: 'Failed to create item' })
    }
}


const incrementItem = async (req,res) =>{
    try {
        const {id} = req.params

        const updatedItem = await ApiModel.findByIdAndUpdate(
            id,
            {$inc: {votes:1}},
            {new: true}
        )

        if (!updatedItem) {
            return res.status(404).json({message:"NOT FOUND"})
        }

        res.json(updatedItem)
    } catch (error) {
            return res.status(404).json({message:"NOT FOUND"})
    }
}

const DeleteAll = async (req, res) =>{
    try {
        await ApiModel.deleteMany({})
    res.status(200)
    } catch (error) {
        res.status(500).json({message:"Failed to delete all."})
    }
}

module.exports = { getItems, addItem, incrementItem, DeleteAll }