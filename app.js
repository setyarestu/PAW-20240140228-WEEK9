const express = require("express");
const path = require("path");
require("dotenv").config();

const acaraRoutes = require("./acaraRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/acara", acaraRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
