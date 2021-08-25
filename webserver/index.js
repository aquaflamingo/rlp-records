import express from "express"
import db from "./db.js"
import config from "./config.js"

const app = express();
const port = config.PORT

app.get('/',(req,res)=>{
	 res.send("status: OK")
})
app.listen(port, () => console.log(`Express server running at http:\/\/127.0.0.1:${port}`));
