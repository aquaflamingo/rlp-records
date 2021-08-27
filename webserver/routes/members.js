import express from "express"
import Member from "../models/Member.js"

const router = express.Router();

router.get('/', (req, res, next) => {
	 Member.findOne().exec().then((r)=> {
			res.send(r)
	 })
});

export default router;
