import express, { request, response } from"express";
import {MongoClient,ObjectId} from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { auth } from "./middleware/auth.js";

import { router as loginRouter} from "./routes/login.js";
import { router as signupRouter } from "./routes/signup.js";
import { router as userExistRouter } from "./routes/userExist.js";
import { router as contentRouter} from "./routes/content.js"
import { router as verfiyResetCodeRouter} from "./routes/verfiyResetCode.js"
import { router as setNewPasswordRouter} from "./routes/setNewPassword.js"

import { router as videoRouter} from "./routes/video.js"

const app=express();
dotenv.config();

const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL

app.use(cors())
app.use(express.json());

app.listen(PORT,()=>console.log("server started"))


app.get("/",(request,response)=>{
    response.send("Hello from Express JS")
})


export async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    return client;
}



app.use("/login", loginRouter)
app.use("/signup", signupRouter)
app.use("/content", contentRouter)
app.use("/userExist",userExistRouter)
app.use("/verfiyResetCode",verfiyResetCodeRouter)
app.use("/setNewPassword",setNewPasswordRouter)


app.use("/video",videoRouter)






