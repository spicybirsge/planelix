const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;
const accounts = require("../database/schemas/accounts")
const verifyUserToken = async (req, res, next) => {
    const authHeader = req.header("authorization");
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Unauthorized", code: 401 })
    }

    const token = authHeader.split(' ')[1];

    try { 

        const tokenData = jwt.verify(token, JWT_SECRET);
        if(tokenData.type === "USER_ACCOUNT_TOKEN") {

            const account = await accounts.findOne({_id: tokenData._id, pid: tokenData.pid}).select('-pid');
            if(!account) {
                return res.status(401).json({ success: false, message: "Unauthorized", code: 401 })
            }

            req.account = account;
            return next();


        } else {
            return res.status(401).json({ success: false, message: "Unauthorized", code: 401 })
        }
    } catch {
        return res.status(401).json({success: false, message: "Unauthorized", code: 401})  
    }
}

module.exports = verifyUserToken;