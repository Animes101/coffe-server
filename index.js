const express=require('express');
const app=express();
require('dotenv').config();
const PORT=3000;
const cors=require('cors')

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json())



app.get('/', (req,res)=>{

    res.send('server is running')
})



const uri = "mongodb+srv://animesbarman101:AnimeS0000@cluster0.26qzwj8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    //  DataBase Name And collection name
    const coffeDb = client.db("CoffeBD");
    const coffes = coffeDb.collection("coffes");


    // post coffe item 
    app.post("/cofeadd", async(req, res) => {

      const coffe=req.body;

      if(coffe){

        const result=await coffes.insertOne(coffe);

        res.status(200).json({
          message:'success fully add coffe',
          data:result

        })
      }else


        {

          res.send('coffe not found');
        }

      });

      // get coffe item

      app.get('/coffe', async (req,res)=>{

        const result= await coffes.find().toArray();

        if(result){

          res.status(200).json({

          message:'all data ',
          data:result
          
        })
        }



      })


      // delete coffe
       app.delete('/coffe/:id', async (req,res)=>{

        const id = req.params.id;

        const query = { _id: new ObjectId(id) };
        const result = await coffes.deleteOne(query);

        console.log(result)

        if(result.deletedCount>0){


          res.status(200).json({
            message:'delete success fully',
            success:true,
          })
        }



      })


      // update coffe
      app.put('/coffeUpdate/:id', async (req,res)=>{

        const id = req.params.id;

        console.log(id)



      })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.listen(PORT, ()=>{

    console.log('server is running')
})