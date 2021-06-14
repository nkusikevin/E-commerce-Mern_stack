import  mongoose  from "mongoose"
import dotenv from "dotenv"
dotenv.config()
// const connection = async ()=>{
//     try{
//      await mongoose.connect(process.env.MONGO_URI,{
//             useCreateIndex:true,
//             useUnifiedTopology:true,
//             useNewUrlParser:true,
//         })
//         console.log(`MONGODB Connected`)
//     }catch{
//     console.log("unable to connect to database")
//     }
// }
//.....local connection to the database.......!
const connection =()=>{
mongoose.connect('mongodb://127.0.0.1:27017/shopping',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
},(error)=>{
    if(!error){
        console.log('database connected successfuly')
    }else{
        console.log('unable to connect')
    }
})}
export default connection