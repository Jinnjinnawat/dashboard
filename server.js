import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import Notebook from './src/models/notebook.js'
import Location from './src/models/Location.js'
import NotebookContract from "./src/models/notebookcontract.js";
import Department from "./src/models/departments.js";
import borrow from './src/models/borrow.js'
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
app.get('/api/department',
    async(req, res) => {
        try {
            const department = await Department.find()
            res.json(department)
        } catch (err) {
            console.error('Failed to fetch notebooks:', err.message)
            res.status(500).json({
                message: 'Failed to fetch notebooks',
                error: err.message,
            })
        }
    })

app.delete('/api/department/:id',
    async(req, res) => {
        try {
            const department = await Department.findByIdAndDelete(req.params.id)

            if (!department) {
                return res.status(404).json({ message: 'department not found' })
            }

            res.json({ message: 'department deleted', id: req.params.id })
        } catch (err) {
            console.error('Failed to delete department:', err.message)
            res.status(500).json({
                message: 'Failed to delete department',
                error: err.message,
            })
        }
    })
app.post('/api/department', async(req, res) => {
    try {
        const department = new Department(req.body)
        const saved = await department.save()
        res.status(201).json(saved)
    } catch (err) {
        res.status(500).json({ message: err.message })
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

app.post('/api/location', async(req, res) => {
    try {
        const location = new Location(req.body)
        const saved = await location.save()
        res.status(201).json(saved)
    } catch (err) {
        console.error('Failed to create location:', err.message)
        res.status(500).json({
            message: 'Failed to create location',
            error: err.message,
        })
    }
})
app.put('/api/department/:id',
    async(req, res) => {
        try {
            const department = await Department.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true, runValidators: true }
            )

            if (!department) {
                return res.status(404).json({ message: 'department not found' })
            }

            res.json(department)
        } catch (err) {
            console.error('Failed to update department:', err.message)
            res.status(500).json({
                message: 'Failed to update department',
                error: err.message,
            })
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

app.get('/api/notebook/full', async(req, res) => { // ✅ แก้ชื่อ route
    try {
        const result = await Notebook.aggregate([{
                $lookup: {
                    from: "location",
                    localField: "LocationID",
                    foreignField: "LocationID",
                    as: "location"
                }
            },
            { $unwind: { path: "$location", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "notebookcontract",
                    localField: "ContractID",
                    foreignField: "ContractID",
                    as: "contract"
                }
            },
            { $unwind: { path: "$contract", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "borrow",
                    localField: "NotebookID",
                    foreignField: "NotebookID",
                    as: "borrow"
                }
            },
            { $unwind: { path: "$borrow", preserveNullAndEmptyArrays: true } },

            {
                $project: {
                    NotebookID: 1,
                    Brand: 1,
                    Model: 1,
                    "location.LocationName": 1,
                    "contract.ContractNo": 1,
                    "contract.Vendor": 1,
                    "borrow.BorrowID": 1,
                    "borrow.Department": 1,
                    "borrow.Status": 1,
                }
            }
        ])
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
app.get('/api/borrow/full', async(req, res) => {
    try {
        const result = await borrow.aggregate([

            // ---- Join Notebook ----
            {
                $lookup: {
                    from: "notebook",
                    localField: "NotebookID",
                    foreignField: "NotebookID",
                    as: "notebook"
                }
            },
            { $unwind: { path: "$notebook", preserveNullAndEmptyArrays: true } },

            // ✅ Join Department ผ่าน DepartmentID จาก Borrow
            {
                $lookup: {
                    from: "department", // ชื่อ collection ใน Atlas
                    localField: "DepartmentID", // field ใน Borrow
                    foreignField: "DepartmentID", // field ใน Department
                    as: "department"
                }
            },
            { $unwind: { path: "$department", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "location",
                    localField: "notebook.LocationID", // ดึง LocationID จาก notebook
                    foreignField: "LocationID",
                    as: "location"
                }
            },
            { $unwind: { path: "$location", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "notebookcontract",
                    localField: "notebook.ContractID", // ดึง LocationID จาก notebook
                    foreignField: "ContractID",
                    as: "contract"
                }
            },
            { $unwind: { path: "$contract", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    BorrowID: 1,
                    Status: 1,
                    "notebook.SerialNumber": 1,
                    "notebook.Brand": 1,
                    "notebook.Model": 1,
                    "department.DepartmentName": 1,
                    "contract.ContractNo": 1,
                    "location.LocationName": 1, // ✅ แสดง LocationName
                }
            }
        ])
        res.json(result)

    } catch (err) {
        console.error('ERROR:', err.message)
        console.error('Borrow full error:', err.message)
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})