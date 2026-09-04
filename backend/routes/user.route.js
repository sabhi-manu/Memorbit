const express = require("express")
const authenticateToken = require("../utilities")

const userController = require("../controllers/user.controller")

const route = express.Router()

route.post("/create-user", userController.createUserController)
route.post("/login", userController.loginUserController)

route.get("/get-user",authenticateToken,userController.getCurrnetUser)


module.exports = route