import cookieParser from "cookie-parser";
import express, { urlencoded }  from "express"
import UserRouter from "./route/userRoute";

const app = express();
const Port = 3000;



app.use(urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())


app.use("/api",UserRouter);

app.get("/",(req,res)=>{
    res.send("HEllo blog")
})

app.listen(Port,()=>{
    console.log(`server running on http//localhost:${Port}`);
})