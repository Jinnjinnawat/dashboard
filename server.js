import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import Notebook from './src/models/notebook.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.get('/api/notebook',
    async(req, res) => {
        try {
            const notebooks = await Notebook.find()
            res.json(notebooks)
        } catch (err) {
            console.error('Failed to fetch notebooks:', err.message)
            res.status(500).json({
                message: 'Failed to fetch notebooks',
                error: err.message,
            })
        }
    })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
