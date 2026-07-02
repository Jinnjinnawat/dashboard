import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import Notebook from './src/models/notebook.js'
import Location from './src/models/Location.js'

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

const getLocations = async(req, res) => {
    try {
        const locations = await Location.find()
        res.json(locations)
    } catch (err) {
        console.error('Failed to fetch locations:', err.message)
        res.status(500).json({
            message: 'Failed to fetch locations',
            error: err.message,
        })
    }
}

app.get('/api/location', getLocations)


app.put('/api/notebook/:id',
    async(req, res) => {
        try {
            const notebook = await Notebook.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true, runValidators: true }
            )

            if (!notebook) {
                return res.status(404).json({ message: 'Notebook not found' })
            }

            res.json(notebook)
        } catch (err) {
            console.error('Failed to update notebook:', err.message)
            res.status(500).json({
                message: 'Failed to update notebook',
                error: err.message,
            })
        }
    })

app.delete('/api/notebook/:id',
    async(req, res) => {
        try {
            const notebook = await Notebook.findByIdAndDelete(req.params.id)

            if (!notebook) {
                return res.status(404).json({ message: 'Notebook not found' })
            }

            res.json({ message: 'Notebook deleted', id: req.params.id })
        } catch (err) {
            console.error('Failed to delete notebook:', err.message)
            res.status(500).json({
                message: 'Failed to delete notebook',
                error: err.message,
            })
        }
    })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})