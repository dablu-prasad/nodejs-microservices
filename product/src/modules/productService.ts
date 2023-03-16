import { dbConnection } from "../database";


 class ProductService{
    constructor(){

    }
    public addProduct=async(data)=>{
        await dbConnection.query('INSERT INTO PRODUCTS (product_name,product_type,product_price,product_qty) VALUES ($1,$2,$3,$4)',
            [data.product_name, data.product_type, data.product_price, data.product_qty])
    }

     public productList = async () => {
         return dbConnection.query('SELECT * FROM PRODUCTS')
     }

     public getProductDetail = async (field, userId) => {
         return dbConnection.query(`SELECT * FROM PRODUCTS WHERE ${field.field1}`, [userId.userId])
     }

     public updateProduct=async(data)=>{
         return dbConnection.query(`UPDATE PRODUCTS SET product_name=$1,product_type=$2,product_price=$3,product_qty=$4 WHERE PRODUCT_ID=$5`, [data.productName, data.productType, data.productPrice, data.productQty, data.productId])
     }

}

export default new ProductService;