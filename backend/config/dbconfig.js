import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
const connection = async () => {
	try {
		console.log("environment var :" + process.env.MONGO_URI);
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useCreateIndex: true,
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log(`MONGODB Connected : ${conn.connection.host}`);
	} catch (error) {
		console.log(`unable to connect to database: ${error.message}`);
		process.exit(1);
	}
};
//.....local connection to the database.......!
// const connection =()=>{
// mongoose.connect(
// 	process.env.MONGO_URI,
// 	{
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useCreateIndex: true,
// 	},
// 	(error) => {
// 		if (!error) {
// 			console.log("database connected successfuly");
// 		} else {
// 			console.log("unable to connect");
// 		}
// 	}
// );}
export default connection;
