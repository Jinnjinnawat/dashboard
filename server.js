import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import Notebook from './src/models/notebook.js'
import Location from './src/models/Location.js'
import NotebookContract from "./src/models/notebookcontract.js";
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

app.get('/api/notebookcontract',
    async(req, res) => {
        try {
            const contracts = await NotebookContract.find()
            res.json(contracts)
        } catch (err) {
            console.error('Failed to fetch notebook contracts:', err.message)
            res.status(500).json({
                message: 'Failed to fetch notebook contracts',
                error: err.message,
            })
        }
    })

app.post('/api/notebook', async(req, res) => {
    try {
        const notebook = new Notebook(req.body)
        const saved = await notebook.save()
        res.status(201).json(saved)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
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

app.put('/api/location/:id',
    async(req, res) => {
        try {
            const location = await Location.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true, runValidators: true }
            )

            if (!location) {
                return res.status(404).json({ message: 'location not found' })
            }

            res.json(location)
        } catch (err) {
            console.error('Failed to update location:', err.message)
            res.status(500).json({
                message: 'Failed to update location',
                error: err.message,
            })
        }
    })


app.put('/api/notebookcontract/:id',
    async(req, res) => {
        try {
            const contract = await NotebookContract.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true, runValidators: true }
            )

            if (!contract) {
                return res.status(404).json({ message: 'Notebook contract not found' })
            }

            res.json(contract)
        } catch (err) {
            console.error('Failed to update notebook contract:', err.message)
            res.status(500).json({
                message: 'Failed to update notebook contract',
                error: err.message,
            })
        }
    })

app.post('/api/notebookcontract', async(req, res) => {
    try {
        const contract = new NotebookContract(req.body)
        const saved = await contract.save()
        res.status(201).json(saved)
    } catch (err) {
        console.error('Failed to create contract:', err.message)
        res.status(500).json({
            message: 'Failed to create contract',
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

app.delete('/api/notebookcontract/:id',
    async(req, res) => {
        try {
            const contract = await NotebookContract.findByIdAndDelete(req.params.id)

            if (!contract) {
                return res.status(404).json({ message: 'Notebook contract not found' })
            }

            res.json({ message: 'Notebook contract deleted', id: req.params.id })
        } catch (err) {
            console.error('Failed to delete notebook contract:', err.message)
            res.status(500).json({
                message: 'Failed to delete notebook contract',
                error: err.message,
            })
        }
    })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
app.delete('/api/location/:id',
    async(req, res) => {
        try {
            const location = await Location.findByIdAndDelete(req.params.id)

            if (!location) {
                return res.status(404).json({ message: 'Location not found' })
            }

            res.json({ message: 'Location deleted', id: req.params.id })
        } catch (err) {
            console.error('Failed to delete location:', err.message)
            res.status(500).json({
                message: 'Failed to delete location',
                error: err.message,
            })
        }
    })