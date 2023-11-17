const users = require("../model/user");
const insertUserQuery = `INSERT INTO users (email, password) VALUES (?, ?)`;
const updateUserQuery = "UPDATE users SET ? WHERE email = ?";
const bcrypt = require("bcrypt");
const {GeneratToken}=require('../middlewere/auth')
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
      users.query(insertUserQuery, [email, hashpassword], (err, result) => {
        if (err) {
          if (err.code == "ER_DUP_ENTRY") {
            console.log("email");
            console.log(err);
            res.json({ status: false, type: "email" });
          }
        } else {
          res.json({ staus: true });
        }
      });
    } catch (err) {}
  },
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req);
      console.log(req.body);
      const findUserByEmailQuery = "SELECT * FROM users WHERE email = ?";
      users.query(findUserByEmailQuery, [email], async(err, result) => {
        if (result) {
          console.log(result);
          if (result[0]) {
            console.log(result);
            const chekpassword=await bcrypt.compare(password,result[0].password)
            console.log(chekpassword);
            if(chekpassword){
                const token=GeneratToken(result[0],'user')
                console.log(token);
                res.json({status:true,token})
            }else{
                res.json({status:false,type:'password'})
            }
          }else{
            res.json({status:false,type:'email'})
          }
        } else {
        }
      });
    } catch (err) {}
  },
};
