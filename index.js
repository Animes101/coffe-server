const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000
const cors=require('cors')


app.use(cors());
app.use(express.json())



app.get('/', (req,res)=>{

    res.send('server is running')
})














app.listen(PORT, ()=>{

    console.log('server is running')
})