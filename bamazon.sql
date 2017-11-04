DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	item_ID int(11) not null,
    product_name varchar(100),
    department_name varchar(100),
    price decimal(10,4), 
    stock_quantity int(11),
	PRIMARY KEY (item_ID)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
	("The Witcher 3", "Games", "50.00", "30"),
    ("Super Mario World", "Games", "45.00", "19"), 
    ("Fiji Apple", "Produce", "1.50", "200"),
    ("Ribeye", "Produce", "20.00", "50"),
    ("Towel", "Household", "5.00", "80"),
    ("Soap", "Household", "2.00", "30"),
    ("Hoodie", "Apparel", "25.00", "12"),
    ("Sweatpants", "Apparel", "13.00", "25"),
    ("iPhone X", "Electronics", "999.00", "8"),
    ("Note 8", "Electronics", "930.00", "6");