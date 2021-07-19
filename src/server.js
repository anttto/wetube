import express from "express";

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.end();
});

const handleListening = () => {
    console.log(`Server listening on port : ${PORT}`)
};
app.listen(PORT, handleListening);