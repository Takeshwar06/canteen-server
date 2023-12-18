const Devloper = require("../model/devloperModel")
require("dotenv").config();
module.exports.createDevloper = async (req, res, next) => {
    try {
        const { devName, devImage, password } = req.body;
        if (password === "tiger") {
            let create;
            if (devName && devImage) {
                create = await Devloper.create({
                    devImage, devName
                })
            } else {
                create = await Devloper.create({});
            }
            if (create) {
                return res.status(200).json({ success: true, devInfo: create })
            }
            else return res.status(200).json({ msg: "devloper can not create" })
        } else {
            res.json({ msg: "ghr jake khana bna this is not for you" })
        }

    } catch (error) {
        next(error)
    }
}

module.exports.oneCoinToDev = async (req, res, next) => {
    try {
        const isDev = await Devloper.findById(process.env.DEV_ID);
        if (isDev) {
            isDev.coin = isDev.coin + 1;
            await isDev.save();
            return res.json({ success: true })
        }
        else {
            return res.json({ success: false })
        }
    } catch (error) {
        next(error);
    }
}
module.exports.getDevInfo = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (email === "dev@gmail.com" && password === "dev123") {
            const dev = await Devloper.findById(process.env.DEV_ID)
            if (dev) {
                return res.json({ success: true, devInfo: dev })
            } else {
                return res.json({ success: false })
            }
        } else {
            return res.json({ success: false })
        }
    } catch (error) {
        next(error);
    }
}

// step to devloper profile access and create
// 1. using direct api hit create devloper with (devName,devImage,passward)
// password is not include in schema its for authentication only

// 2. when you hit api return json with DEV_ID this Id set in env with name DEV_ID
// after this your dev account is ready for adding coin

// 3. in clint side you can access this profile with email and password 
// email and password is hard copied check in the code 

// 4. you can also change the dev profile for this you need follow this step 