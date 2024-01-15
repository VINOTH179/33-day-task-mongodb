// First create a database - I use demo name

use demo

// create a collection

db.createCollection("products");

// Insert the products.json in the collection

db.products.insertMany([product.json]);

// 1. Find all the information about each products

db.products.find().toArray();

// 2. Find the product price which are between 400 to 800

db.products.find({ product_price: { $gt: 400, $lt: 800 } });

// 3. Find the product price which are not between 400 to 600

db.products.find({ product_price: { $not: { $gt: 400, $lt: 600 } } }).toArray();

// 4. List the four product which are grater than 500 in price

db.products.find({ product_price: { $gte: 500 } }).limit(4);

// 5. Find the product name and product material of each products

db.products.find({}, { product_name: 1, product_material: 1, _id: 0 }).toArray();

// 6. Find the product with a row id of 10

db.products.find({ id: "10" });

// 7. Find only the product name and product material

db.products.find({}, { product_name: 1, product_material: 1, _id: 0 }).toArray();

// 8. Find all products which contain the value of soft in product material

db.products.find({ product_material: { $eq: "Soft" } });

// 9. Find products which contain product color indigo  and product price 492.00

db.products.find({
    $or: [{ product_color: { $eq: "indigo" } }, { product_price: { $eq: 492 } }],
});

// 10. Delete the products which product price value are same

db.products.aggregate([
    {
        $group: {
            _id: "$product_price",
            duplicate: { $addToSet: "$product_price" },
            totalcount: { $sum: 1 }
        }
    },
    { $match: { totalcount: { $gt: 1 } } }
]).forEach((doc) => {
        db.products.deleteMany({product_price: { $in: doc.duplicate } });
    });

// Before count=25 product, After duplicate delete count=21 product for check

    db.products.count()