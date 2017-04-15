var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "1ambikapd",
  database: "bamazon"
});



connection.connect(function(err) {
  if (err) throw err;
  else{
  console.log("connected as id " + connection.threadId);
}
});

connection.query("SELECT * FROM products", function(err, res) {
	console.log("ID" +" | " + "Item" +" | " + "DepartmentName"+" | " + "Price" + " | "+"Quantity");
  for (var i = 0; i < res.length; i++) {
    console.log(res[i].item_id + " | " + res[i].product_name + "  | " + res[i].department_name + "  | " + res[i].price + " | " + res[i].stock_quantity);
  }
  console.log("-----------------------------------");
});
 



function order(){
	
	inquirer.prompt([

		{
			type:"input",
			name:"item_id",
			message:" ID of the product  would like to buy?"

		},
		{
			type:"input",
			name:"stock_quantity",
			message:"How many units of the product  would like to buy"

		}
		]).then(function (answer) {
		    var selecteditem = answer.item_id;
		    var selectedquentity =answer.stock_quantity;

		    quentityCheck(selecteditem, selectedquentity);
		
	})
		
}

function continueshopping(){
inquirer.prompt([
 	{
 		type:"list",
 		name:"yes",
 		message:"Options",
		choices: ["Continue Shopping", "Done for the day",]
 	}
 	]).then(function(answer){
 	console.log(answer.yes);
 	if (answer.yes === "Continue Shopping") {
 		
 		//console.log("Came here");
 		order();
 		
 	} else if (answer.yes === "Done for the day"){
	console.log("Thank you for Shopping with us.");
	}

 });
 }


// }
  var table = function(){

	connection.query("SELECT * FROM Products", function(err, result) {
	
	  
	  });

	
}
var quentityCheck = function (id, quantity){
	connection.query('SELECT * FROM Products WHERE item_id = ' + id, function (err, result){
		if (err) throw err;

		var total = result[0].price * quantity;

		var remaining = result[0].stock_quantity - quantity;

		if (remaining < 0){
			console.log('Insufficient stock. There are only '+ result[0].stock_quantity + 'item(s) left.');
		} else {
			console.log('You have bought ' + quantity + ' ' + result[0].product_name + ' for $' + total);
			console.log('There are ' + remaining + ' ' + result[0].product_name + ' remaining.')
			Update(id, remaining)
		}
	});
}
var Update = function(id, quantity){
	connection.query('update products set stock_quantity = ' + quantity + ' where item_id = ' + id, function(err, result) {
        if (err) throw err;
    });
    continueshopping();
}

order();
table();

