import bcrypt from 'bcryptjs'
const users =[
    {
        name:"kevin",
        email:"nkusikvnhart@gmail.com",
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:"hart",
        email:"kvnhart@gmail.com",
        password:bcrypt.hashSync('123456',10),
        
    },
    {
        name:"nkusi",
        email:"nkusi@gmail.com",
        password:bcrypt.hashSync('123456',10),
       
    }
]
 export default users