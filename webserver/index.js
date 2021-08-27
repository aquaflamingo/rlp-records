import express from "express"
import config from "./config.js"
import {connect} from "./db.js"
import memberRouter from "./routes/members.js"

const app = express();
const port = config.PORT

// Connect to Mongoose
connect()

// app.use("/members", memberRouter)
// app.use("/ping", (req,res)=>{
// 	 res.send("pong")
// })

app.use("/", (req,res)=>{
	 res.send("status: OK")
})

app.listen(port, () => console.log(`Express server running at http:\/\/127.0.0.1:${port}`));
