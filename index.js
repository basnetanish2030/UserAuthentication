const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static',express.static(__dirname + '/views'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("DB connection successfully");
})
.catch((err) => {
  console.error(err.message);
});

app.use('/auth', authRoutes);


