const express = require('express');
const path = require('path');

const sequelize = require('./utils/database');
const todoRoutes = require('./routes/todo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/api/todo', todoRoutes);

app.use((req, res, next) => {
    res.sendFile('/index.html');
})

async function start() {
    try {
        await sequelize.sync({ force: false });
        app.listen(PORT, () => console.log(`Listen on PORT: ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();