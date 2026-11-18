require('dotenv').config();
const express = require('express');
const logger = require('./logger');
const chatRoutes = require('./routes/chat.routes');
const produkRoutes = require('./produkRoutes');

const app = express();
app.use(express.json());
app.use(logger);
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));
app.use('/api', chatRoutes);
app.use('/produk', produkRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));