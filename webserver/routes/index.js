import express from "express"
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	 res.send("status: OK")
});

export default router;
