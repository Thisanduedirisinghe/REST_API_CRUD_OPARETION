const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json())

const convertParams = (req, res, next) => {
    const { id } = req.params;
    req.params.id = parseInt(id);
    next();
};

app.get('/', (req, res) => {
    res.send('Success!!!')
});

let blogs = [];

app.get("/blog", (req, res) => {
    res.json(blogs)
});

app.post("/blog",(req,res) => {
    blogs.push({ id: blogs.length + 1, ...req.body });
    res.status(201).send({ message: "ok!" } );
});

app.put("/blog/:id" , convertParams, (req,res) => {
    const { id } = req.params;
    const index = blogs.findIndex((item) => item.id === id)
    blogs[index] = req.body;
    res.send(blogs[index]);
});

app.get("/blog/:id" , convertParams, (req, res) => {
    const { id } = req.params;
    const index = blogs.findIndex((item) => item.id === id);
    res.send(blogs[index])
});
app.delete("/blog/:id" , convertParams, (req, res) => {
    const { id } = req.params;
    const index = blogs.findIndex((item) => item.id === id);


    if(index === -1) {
        res.status(404).send({ message: "Not Found!"})
    }

    blogs.splice(index, 1);
    res.send({ message: "Deleted!" })
})

app.listen(PORT, () => console.log(`App is listening on PORT: ${PORT}`));