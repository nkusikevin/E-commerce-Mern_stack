import  express  from 'express';
import dotenv  from 'dotenv'
import  products  from './data/products.js '
dotenv.config()
const app = express();
 const port = process.env.PORT || 4000
// respond with "hello world" when a GET request is made to the homepage
app.get('/',(req, res)=>{
  res.send('hello world');
});
app.get('/api/products',(req,res)=>{
  res.json(products)
})
app.get('/api/product/:id',(req,res)=>{
  const pro = products.find(p=>p._id === req.params.id)
  res.json(pro)
})
app.listen(port,console.log("server is up on 4000"))