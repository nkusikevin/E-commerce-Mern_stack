/** @format */
import path from "path";
import express from "express";
import dotenv from "dotenv";
import connection from "./config/dbconfig.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleWare/errorMiddleWare.js";
dotenv.config();
connection();
console.log(process.env.MONGO_URI);
const app = express();
if ((process.env.NODE_ENV = "development")) {
	app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
	console.log("production");
	app.use(express.static(path.join(__dirname, '/frontend/build')));
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	);
} else {
	console.log("pro");
	app.get("/", (req, res) => {
		res.send("Api Is Running");
	});
}

app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 4000;
app.listen(port, console.log("server is up on 4000"));
