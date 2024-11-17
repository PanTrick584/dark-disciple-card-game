require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const connectDB = require("./db/connect");
const cardsRoute = require("./routes/cards-route");
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../dist")));
app.use('/api/v1/cards', cardsRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const port = process.env.PORT || 3333;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error)
    }
}

start();