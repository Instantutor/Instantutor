const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");

router.post(
    "/"
)