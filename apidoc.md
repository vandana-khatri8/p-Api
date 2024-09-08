>  E-Commerce

//Page 1

>>> List Of Products By Search(GET)
* http://localhost:9110/productlist


>>>List Of  Category  (GET)
* http://localhost:9110/cotegorylist


>>>List Of  Brand (GET)
* http://localhost:9110/brandlist


>>>List Of Products by category (GET)
* http://localhost:9110/productlist?categoryId=2



// Page-2


 >>>Product WRT subcategory_name (GET)
* http://localhost:9110/filter/Moisturizer

 >>>Product WRT subcategory_name + brand_name (GET)
 * http://localhost:9110/filter/Face%20care?brand_name=Aqualogica

[
  {
    "_id": "66c3268fa3b23f39d4c9f5d7",
    "product_id": 3,
    "product_name": "Aqualogica Sunscreen",
    "product_type": "sunscreen face cream",
    "category_id": 1,
    "category_name": "skin care",
    "subcategory_id": 5,
    "subcategory_name": "Face care",
    "price": "₹499 ",
    "size": "50g",
    "image ": "https://ibb.co/zGBtSww",
    "Brand_name": "Aqualogica",
    "detail": "Water resistance sunscreen with no white cast with vitamin C",
    "Best for": "best for Oily and Sensitive skin"
  },
  {
    "_id": "66c3268fa3b23f39d4c9f5d8",
    "product_id": 4,
    "product_name": "Aqualogica Radiance+ Smoothie Face Wash with Watermelon & Niacinamide for Clear & Oil-Free Skin - 100ml",
    "product_type": "Face Wash",
    "category_id": 1,
    "category_name": "skin care",
    "subcategory_id": 5,
    "subcategory_name": "Face care",
    "price": " ₹249 ",
    "size": "100ml",
    "image ": "https://ibb.co/rtMDWzv",
    "Brand_name": "Aqualogica",
    "detail": "Radiance+ Smoothie Face Wash with Watermelon & Niacinamide",
    "Best for": "for Clear & Oil-Free Skin "
  }
]

 >>>Product WRT subcategory_name +  Price Range (GET)
 * http://localhost:9110/filter/Eye%20Makeup?lprice=100&hprice=400

 >>>Product WRT subcategory_name + Product-Type (GET)
 * http://localhost:9110/filter/Eye%20Makeup?kajal



//page-3

>>>detail of product wrt to product_id (Get)
* http://localhost:9110/detail/2

 
//Page-4
>>> selected product details by selected category_id (Post)
* http://localhost:9110/productDetails
ex- 
body> {"id":[1,3]} 
res-

>place Order (Post)
* http://localhost:9110/placeOrder


{
    "order_id":1,
     "name":"vandana",
     "address":"1021/30B adhartal jabalpur mp",
    "email":"vandana8888@gmail.com",
    "contact":7785543586,
    "product":[
        20,24,30
    ],
    "price":"1500",
    "status":"on the way"

}

//page-5

>list of all orders by giving email(Get)
* http://localhost:9110/orders
* http://localhost:9110/orders?email=mannat@gmail.com


ex-
[
    {
        "_id": "66b663dce14eebc7239efde2",
        "order_id": 2,
        "name": "mannat",
        "address": "1020/30c adhartal jabalpur mp",
        "email": "mannat@gmail.com",
        "contact": 7785549586,
        "product": [
            2,
            15,
            20
        ],
        "price": "2000",
        "status": "Delieverd"
    }
]


>>>Update order wrt Object_id(Put)
* http://localhost:9110/updateOrder

{
     "_id": "66b6637fe14eebc7239efde1",
     "status":"Delieverd"
}


>>>Delete Order by order_id(DELETE)
* http://localhost:9110/deleteOrder


{
        "_id": "66b6637fe14eebc7239efde1"
     
}