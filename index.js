const express = require("express");

const { users } = require("./Data/user.json");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :-)",
  });
});

/**
 * Route : /user
 * Method : GET
 * Description : Get all the users
 * Access : Public
 * Parameters : None
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
