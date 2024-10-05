// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5001;

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.x9xlpou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const userCollection=client.db('StudentManagementDB').collection('studentManagement')
    // user related api collection post or insert
    app.post("/users",async(req,res)=>{
      const user=req.body;      
      // insert email if users dosent exist
      const queary={email:user.email};      
      const exestingUser=await userCollection.findOne(queary);
      if (exestingUser) {        
        return res.send({message:"user already exist",insertedId:null})
      }
      const result=await userCollection.insertOne(user);
      res.send(result)
    })






    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  
  }
}
run().catch(console.dir);


app.get("/",(req,res)=>{
    res.send("Student management server")
});
app.listen(PORT,()=>{
    console.log(`student management server is running ${PORT}`);
})
