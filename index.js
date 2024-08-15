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
 * Route : /users
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

/**
 * Route : /users/:id
 * Method : GET
 * Description : Get single user by their id
 * Access : Public
 * Parameters : Id
 */

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't exist",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  }
});

/**
 * Route : /users/:id
 * Method : GET
 * Description : Get single user by their id
 * Access : Public
 * Parameters : Id
 */

app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(400).json({
      success: false,
      message: "User already exist",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: users,
  });
});

/**
 * Route : /users/:id
 * Method : PUT
 * Description : Updating a user by their Id
 * Access : Public
 * Parameters : Id
 */

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: updateUserData,
  });
});

/**
 * Route : /users/:id
 * Method : DELETE
 * Description : Deleting a user by their Id
 * Access : Public
 * Parameters : Id
 */

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exit",
    });
  }
  // need to build logic to delete the user
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
