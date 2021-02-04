import  express  from 'express';
import dotenv  from 'dotenv'
import connection  from './config/dbconfig.js'
import productRoutes from './routes/productRoutes.js'
import {errorHandler ,notFound} from "./middleWare/errorMiddleWare.js"
dotenv.config()
connection()
const app = express();
app.get('/',(req, res)=>{
  res.send('hello world');
});
app.use('/api/products',productRoutes)
app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 4000
app.listen(port,console.log("server is up on 4000"))