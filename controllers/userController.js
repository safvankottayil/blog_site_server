const users = require("../model/user");
const bcrypt = require("bcrypt");
const { GeneratToken } = require("../middlewere/auth");
const jwt =require('jsonwebtoken')
const saltRounds = 10;
async function bycryptPassword(password) {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {}
}
module.exports = {
  Singup: async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashpassword = await bycryptPassword(password);
      const User = await users.findOne({ email: email });
      if (User) {
        res.json({ status: false, type: "email" });
      } else {
        const data = await users.create({
          email: email,
          password: hashpassword,
        });
        if (data) {
          res.json({ status: true });
        }
      }
    } catch (err) {}
  },
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await users.findOne({ email: email });
      if (result) {
        console.log(result);
        const chekpassword = await bcrypt.compare(password, result.password);
        console.log(chekpassword);
        if (chekpassword) {
          const token = GeneratToken({_id:result._id,email:result.email,password:result.password}, "user");
          res.json({ status: true, token });
        } else {
          res.json({ status: false, type: "password" });
        }
      } else {
        res.json({ status: false, type: "email" });
      }
    } catch (err) {}
  },
};
