const mongoose = require('mongoose')

const db = async () => {
    try {
        const uri = (process.env.MONGO_URI || '').trim()
        if (!uri) {
            throw new Error('MONGO_URI is not set')
        }

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('MONGODB CONNECTED')
    } catch (error) {
        console.error('MONGO ERROR:', error.message || error)
        // rethrow so caller can decide what to do (server may still start for local dev)
        // throw error
    }
}

module.exports = db