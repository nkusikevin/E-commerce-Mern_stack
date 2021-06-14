import mongoose from "mongoose"
import users  from "./data/users.js"
import products  from "./data/products.js"
import User  from "./models/user.js"
import Products  from "./models/products.js"
import Order  from "./models/order.js"
import connectdb  from "./config/dbconfig.js"
 
connectdb()

const importdata = async()=>{
    try{
        await Order.deleteMany()
        await User.deleteMany()
        await Products.deleteMany()
        const CreatedUser = await User.insertMany(users)
        const adminUser = CreatedUser[0]._id
        const sampleProducts = products.map(products=>{
            return{...products, user: adminUser}
        })
        await Products.insertMany(sampleProducts)
        console.log("Data imported");
        process.exit()
    }catch(error){
        console.error(error);
        process.exit(1)
    }
}

importdata()
