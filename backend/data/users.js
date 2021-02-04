import bcrypt from "bcryptjs"
const users=[{
    name:"kevin",
    email:"kevin@gmail.com",
    password: bcrypt.hashSync("123456",10),
    isAdmin:true
},{
    name:"cloude",
    email:"cloe@gmail.com",
    password:bcrypt.hashSync("123456",10),
    
},{
    name:"hart",
    email:"hart@gmail.com",
    password:bcrypt.hashSync("123456",10),
   
}]
 export default users