/** @format */
import path from "path"
import express from "express";
import dotenv from "dotenv";
import connection from "./config/dbconfig.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import morgan from "morgan"
import { errorHandler, notFound } from "./middleWare/errorMiddleWare.js";
dotenv.config();
connection();
const app = express();
if(process.env.NODE_ENV="development"){
  app.use(morgan("dev"));
}
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world");
});
const __dirname= path.resolve()
app.use('/uploads' ,express.static(path.join(__dirname,'/uploads')) )
app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/config/paypal',(req,res)=> res.send(process.env.PAYPAL_CLIENT_ID))
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 4000;
app.listen(port, console.log("server is up on 4000"));
