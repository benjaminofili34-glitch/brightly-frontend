const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

app.use(cors());
const path = require('path');

app.use(express.json()); 
let myLesson = require('./lesson.js')


//  RETURNING STATIC IMAGES with 404 error if not available   
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/images', (req, res) => {
    res.status(404).json({ error: "404 - Image not found" });
});


// GET /lessons
app.get('/', (req,res)=>{
    res.json(' Eureka it works')
})
app.get('/lessons', (req,res)=>{
    // console.log(myLesson)
    res.json(myLesson)
})
// POST /orders

// app.post('/orders',(req,res) =>{
//     const order = req.body;
//     console.log(order)
//     res.json("Order Submitted Successfully")
// })

app.post('/orders', (req, res) => {
    console.log("Received body:", req.body);

    const order = req.body;

    if (!order || !order.name || !order.phone ||
        !Array.isArray(order.items) || order.items.length === 0) {
        return res.status(400).json({
            error: "Missing required order details"
        });
    }

    res.status(200).json({
        message: "Order received for testing. Not saved yet."
    });
});

// PUT /lessons/:id

app.put('/lessons/:id', (req, res) => {

    const id = Number(req.params.id);

    const lesson = myLesson.find(item => item.id === id);

    if (!lesson) {
        return res.status(404).json({
            error: "Lesson not found"
        });
    }

    console.log("Lesson found:", lesson);
    console.log("Updates received:", req.body);

    if (req.body.id !== undefined) {
    return res.status(400).json({
        error: "Lesson ID cannot be changed"
    });
    }
    
    if (req.body.space !== undefined &&
    (!Number.isInteger(req.body.space) || req.body.space < 0)) {
    return res.status(400).json({
        error: "Spaces must be a non-negative integer"
    });
    }
    Object.assign(lesson, req.body);

    res.json(lesson);
});


// Other routes

// Start server



app.use((req, res) => {
    res.status(404).json({ error: "404 - Resource not found" });
});

app.listen(PORT ,() =>{
    console.log(`server running at http://localhost:${PORT}/`);
} )
