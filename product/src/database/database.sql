CREATE TABLE PRODUCTS(
product_id Serial PRIMARY KEY,
product_name VARCHAR(50) ,
	product_type VARCHAR(50),
	product_price Numeric(30,0),
	product_qty Numeric(5,0)
);