const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const scrapeRoutes = require('./routes/scrape');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/scrape', scrapeRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
