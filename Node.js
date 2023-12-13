
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const Item = require('./modals/schema');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
const dbConnection = connectDB();
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
dbConnection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.post('/api/items', async (req, res) => {
    try {
        if (!req.body || !req.body.name) {
            throw new Error('Item name is required');
        }

        const newItem = new Item({ name: req.body.name });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/items/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
