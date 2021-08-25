import express from "express"
import config from "./config.js"
import {connect} from "./db.js"
import Member from "./models/Member.js"

const app = express();
const port = config.PORT

connect().then((c) => {
	 app.listen(port, () => console.log(`Express server running at http:\/\/127.0.0.1:${port}`));

	 Member.find({}).then((c)=>console.log(c)).catch((e)=>console.error(e))

}).catch((e)=> console.error("error", e))

app.get('/',(req,res)=>{
	 Member.create({name: "Hello" })
			.then((d)=>{ 
				 console.log("here is d", d)
				 d.save()
						.then((res)=>console.log("Was saved", res))
						.catch((e)=>console.error("was not saved", e))
			})
			.catch((e)=>console.error("could not create", e))

			res.send("status: OK")
	 })
