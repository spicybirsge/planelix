const express = require('express');
const router = express.Router();
const accounts = require("../../database/schemas/accounts")

router.post("/register", async(req, res) => {
    try {
        const {email,  name} = req.body;
      const usernameUP = req.body.username;
      if(!usernameUP) {
        return res.status(400).json({success:false, message: "username is required", code: 400})
      }

      const username = usernameUP.toLowerCase()

      const userNameTaken = await accounts.findOne({username: username})

      if(userNameTaken) {
        return res.status(400).json({success:false, message: "username is taken",code: 400})
      }

      //soonTm
     

    } catch(e) {
        console.error(e)
        return res.status(500).json({success:false, message: "Internal server error", code: 500})
    }
})

module.exports = router;