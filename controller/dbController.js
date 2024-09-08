let mongo = require('mongodb')
// import mongo from 'mongodb'
let {MongoClient} = mongo ;
let mongoUrl = "mongodb+srv://vandana:vandana@cluster0.tfjhvav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let client = new MongoClient(mongoUrl)
// database connectivity 
async function dbConnect(){
    await client.connect()
    console.log("connection successful")
}
let db = client.db('purplledata');


// generic code for getting data which will be use whenever getData require 
async function getData(colName,query){
   let output = []
   try{
    const cursor = db.collection(colName).find(query);
    for await(const data of cursor){
        output.push(data)
    }
    cursor.close();
}
 catch(err){
    output.push({"Error":"Error in get Data"})
}

return output
}



async function postData(colName,data){
    let output;
    try{
        output = db.collection(colName).insertOne(data)
    }
    catch(err){
        output.push({"Error":"Error in Post Data"})
    }
    return output
}

async function updateData(colName,condition,data)
    {
        let output ;
        try{
            output=await db.collection(colName).updateOne(condition,data)
        }
        catch(err){
            output={"response":"error in updating data"}
        }
      return output
    }

    async function deleteData(colName,condition){
        let output;
        try{
            output=await db.collection(colName).deleteOne(condition)
        }
        catch(err){
            output={
                "response":"error in Deleting Data"
            }
        }
        return output
    }


module.exports = {
    dbConnect,
    getData,
    postData,
    updateData,
    deleteData
}