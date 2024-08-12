const express = require("express");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :-)",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
