var mysql = require("mysql");
var inquirer = require("inquirer")

// create the connection information for the sql database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "sqlpass123",
	database: "bamazon_DB"
});

// initialize the connection
connection.connect(function(error){
	if (error) {
		throw error;
	}
	console.log("connected as id:", connection.threadId);
	showTable();
	
	// connection.end();
});

var showTable = function(){
	connection.query("SELECT * FROM products", function(err, res){
		for(var i = 0; i < res.length; i++){
			console.log(res[i].item_ID+" | "+res[i].product_name+" | "+res[i].department_name+" | "+res[i].price+" | "+res[i].stock_quantity+"\n")
		}
	askPrompt(res);
	})
}



var askPrompt = function(res){
	inquirer.prompt([{
		name: "item",
		type: "input",
		message: "What is the ID of the product you would like to buy?"
	}]).then(function(answer){
		// console.log(answer.item)
		// console.log(res)

		for(var i = 0; i<res.length; i++){
			if(res[i].item_ID == answer.item){
				var selectedItemID = JSON.stringify(res[i].item_ID);
				var selectedItemQuantity = (res[i].stock_quantity);
				var item = res[i].product_name;
				var price = res[i].price;

				inquirer.prompt([{
					name: "quantity",
					type: "input",
					message: "How many would you like to buy?"
				}]).then(function(answer){
					var userQuantity = answer.quantity

					//is the amount the user wants is avaialble, proceed
					if (userQuantity <= selectedItemQuantity) {
						
						//connect to DB to update quantity
						connection.query("UPDATE products SET ? WHERE ?", [{
							stock_quantity: selectedItemQuantity - userQuantity
						},
						{
							item_ID: selectedItemID
						}], function(err, res){
							console.log("*****************************")
							console.log("You just purchased "+userQuantity+ " " + item + "(s) for $"+ price*userQuantity );
							console.log("*****************************")

							showTable();

						})
					}
					//if user wants more than what's available
					else {
						console.log("Sorry there's not enough stock, buy less or buy something else");
						askPrompt(res);
					}
				})
			}
			
		}
	})
}
