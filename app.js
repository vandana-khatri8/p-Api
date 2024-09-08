let express = require('express');
let app = express();
let port = 9110; 
let cors = require('cors');
let {dbConnect , getData,postData,updateData,deleteData} = require('./controller/dbController.js');
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./swagger.json');
let package = require('./package.json');
let{ObjectId} = require('mongodb')

swaggerDocument.info.version = package.version;
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

let key = "hellomannat";
//ket we pass  through the header 

app.use(express.json())
app.use(cors())

// creat routes
app.get('/health',(req,res)=>{
    res.send('hii from express')
     
});
// app.get('/location',async (req,res) => {

//     let query = {}
//     let Collection = "location";
//     // let authKey = req.headers['x-access-auth']
//     // if(authKey == key){
//     //     let output = await getData(collection,query)
//     //     res.send(output)
//     // }
//     // else{
//     //     res.status(401).send('unauthorised');
//     // }
    
//     let output = await getData(Collection,query)
//     res.send(output)
   
// });

app.get('/productlist',async (req,res) => {

    let query = {}
    let categoryId = req.query.categoryId
    // let brand_name  = req.query.Brand_name
    let Collection = "productlist";
   
 if(categoryId){
        query = {category_id:Number(categoryId)}
    }

//  else if(brand_name)
//     { query = {Brand_name:brand_name}
// }
    else{
        query = {}
    }
    let output = await getData(Collection,query)
    res.status(200).send(output)
   
});



// for cotegorylist

app.get('/category',async (req,res) => {

    let query = {}
    let Collection = "category"
    let output = await getData(Collection,query)
    res.send(output)
   
});


// for brandlist brandlist
app.get('/brandlist',async (req,res) => {

    let query = {}
    let Collection = "brandlist";
    let output = await getData(Collection,query);
  
    res.send(output)
   
});

// route for filter product with category_type 

app.get('/filter/:subcategory_name',async (req,res) => {

    let query = {};
    let brand_name = req.query.brand_name;
    let subcategory_name = req.params.subcategory_name;
    // let category_name = req.params.category_name;
    let hprice = String(req.query.hprice);
    let lprice = String(req.query.lprice);
    let product_type = req.query.product_type
    if(brand_name){
    query = {
        "subcategory_name":subcategory_name,
        "Brand_name" : brand_name
    }
}
else if(hprice &lprice){
    query={
        "subcategory_name":subcategory_name,
        $and:[{price:{$gt:lprice,$lt:hprice}}]
    }
}

else if(product_type){
    query={
        "subcategory_name":subcategory_name,
        "product_type" :product_type

    }
}
    else{
        
        query={
            "subcategory_name":subcategory_name
        }
    }
    
    let Collection = "productlist";;
    let output = await getData(Collection,query);
    res.send(output);
   
});


// page3 details of product

app.get('/detail/:id',async(req,res) => {
    let id = Number(req.params.id);
    let  query = {"product_id":id };
    // let query = {_id:new ObjectId(req.params.id)}
    let Collection = "productlist";
    let output = await getData(Collection,query)
    res.send(output)
})

// page-4 selected product details by given categoryid

app.post('/productDetails',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {category_id:{$in:req.body.id}};
        let Collection = "productlist";
        let output = await getData(Collection,query)
        res.send(output)
    }
    else
    {
        res.send(`please pass data in the formate of {"id":[1,2,3]}`)
    }
})

// page4 placeOrder

app.post('/placeOrder',async(req,res) => {
      let data = req.body;
        let Collection = "orders";
        let response = await  postData(Collection,data);
        res.send(response);

});

// get order
app.get('/orders',async (req,res) => {

    let query = {};
    if(req.query.email){
        query={email:req.query.email}
    }

    let Collection = "orders";
    let output = await getData(Collection,query);
    res.send(output)
   
});
// update order

app.put('/updateOrder',async(req,res) => {
    let collection = "orders"
    let condition = {"_id":new ObjectId(req.body._id) }
    let data ={
        $set:{
            
            "status":req.body.status
        }
    }
    let response = await updateData(collection,condition,data)
    res.send(response)
})

app.delete('/deleteOrder',async(req,res) => {
    let collection = "orders"
    let condition = {"_id":new ObjectId(req.body._id) }
    let response = await deleteData (collection,condition);
    res.send(response)
})


// create server

app.listen(port,(err)=>{
    dbConnect()
    if(err) throw err;
    console.log(`server is running on port ${port}`)
})

module.exports = app ;