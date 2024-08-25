const express = require("express");
const { users } = require("../Data/user.json");

const router = express.Router();

/**
 * Route : /
 * Method : GET
 * Description : Get all the users
 * Access : Public
 * Parameters : None
 */

//localhost:8081/users
http: router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route : /:id
 * Method : GET
 * Description : Get single user by their id
 * Access : Public
 * Parameters : Id
 */

router.get("/:id", (req, res) => {
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
 * Route : /:id
 * Method : GET
 * Description : Get single user by their id
 * Access : Public
 * Parameters : Id
 */

router.post("/", (req, res) => {
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
 * Route : /:id
 * Method : PUT
 * Description : Updating a user by their Id
 * Access : Public
 * Parameters : Id
 */

router.put("/:id", (req, res) => {
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
 * Route : /:id
 * Method : DELETE
 * Description : Deleting a user by their Id
 * Access : Public
 * Parameters : Id
 */

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exit",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: users,
  });
});

/**
 * Route : /users/subscription-details/:id
 * Method : GET
 * Description : Get all user Subscription Details
 * Access : Public
 * Parameters : Id
 */

router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with the ID doesn't exist",
    });
  }

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  // console.log("returnDate", returnDate);
  // console.log("currentDate", currentDate);
  // console.log("subscriptionDate", subscriptionDate);
  // console.log("subscriptionExpiration", subscriptionExpiration);

  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpiration <= currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 100
          : 50
        : 0,
  };
  return res.status(200).json({
    success: true,
    message: "Subscription Details for the user is",
    data,
  });
});

module.exports = router;
