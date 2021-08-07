var mongoose = require('mongoose');
var Restaurant = require('../../models/Restaurant');
const PDFDocument = require('pdfkit');
var Item = require('../../models/Item');
var User = require('../../models/User');
var Cart = require('../../models/Cart');
var Order = require('../../models/Order');
var fs = require('fs');

let updateCart = async (req, res) => {
    try {
        let data = req.body;
        let uid = req.body.userid; //! delete afterwards
        //let user = req.user  //! uncomment afterwards
        let user = await User.findOne({
            '_id': uid
        }); //! delete afterwards
        if (data.restaurantId == user.cart.restaurantId || !user.cart.restaurantId) {
            user.cart.restaurantId = data.restaurantId;
            user.cart.items.forEach(e => {
                data.items.forEach(i => {
                    if (e.itemId == i.itemId) {
                        e.quantity += i.quantity;
                        data.items = data.items.filter(f => f != i);
                    }
                })
            })
            data.items.forEach(e => {
                user.cart.items.push({
                    'item': e.item,
                    'quantity': e.quantity,
                    'itemId': e.itemId
                });
            })
            await user.save();
            res.status(200).json({
                "success": true,
                "msg": "Cart Updated",
                "cart": user.cart
            })
        } else {
            res.status(400).json({
                "success": false,
                "error": "Restaurant ID Conflict"
            })
        }
    } catch (e) {
        res.status(400).json({
            "success": false,
            "error": e
        })
    }
}

let getCart = async (req,res) => {
    let user = await User.findOne({"_id":req.body.userId}); //!delete afterwards
    let cart = JSON.parse(JSON.stringify(user.cart))
    for(let i=0;i<cart.items.length;i++){
        let item = await Item.findOne({'_id':cart.items[i].itemId});
        cart.items[i].price = cart.items[i].quantity*item.price;
    }
    res.status(200).json({
        "success":true,
        "cart": cart
    })
}

let generatePDF = async (invoice, restaurant, user, path, res) => {
    function generateHr(doc, y) {
        doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
    }
    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
      
        return year + "/" + month + "/" + day;
      }
      function formatCurrency(paisa) {
        return "Rs. " + (paisa);
      }
      function generateTableRow(
        doc,
        y,
        item,
        description,
        unitCost,
        quantity,
        lineTotal
      ) {
        doc
          .fontSize(10)
          .text(item, 50, y)
          .text(description, 150, y)
          .text(unitCost, 280, y, { width: 90, align: "right" })
          .text(quantity, 370, y, { width: 90, align: "right" })
          .text(lineTotal, 0, y, { align: "right" });
      }
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Foodies", 50, 57)
        .fontSize(10)
        .text("Foodies", 200, 50, { align: "right" })
        .text("221B Baker Street", 200, 65, { align: "right" })
        .text("London", 200, 80, { align: "right" })
        .moveDown();
        doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Invoice", 50, 160);
    
      generateHr(doc, 185);
    
      const customerInformationTop = 200;
    
      doc
        .fontSize(10)
        .text("Invoice ID:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(invoice._id, 150, customerInformationTop)
        .font("Helvetica")
        .text("Invoice Date:", 50, customerInformationTop + 15)
        .text(formatDate(invoice.createdAt), 150, customerInformationTop + 15)
        .text("Amount Paid:", 50, customerInformationTop + 30)
        .text(
          formatCurrency(invoice.final_amount),
          150,
          customerInformationTop + 30
        )
    
        .font("Helvetica-Bold")
        .text(user.name, 300, customerInformationTop)
        .font("Helvetica")
        .text(user.address, 300, customerInformationTop + 15)
        .text(
          user.city +
            ", " +
            user.state +
            ", " +
            user.country,
          300,
          customerInformationTop + 30
        )
        .moveDown();
    
      generateHr(doc, 252);
      let i;
      const invoiceTableTop = 330;
    
      doc.font("Helvetica-Bold");
      generateTableRow(
        doc,
        invoiceTableTop,
        "Serial No.",
        "Item Name",
        "Unit Cost",
        "Quantity",
        "Total"
      );
      generateHr(doc, invoiceTableTop + 20);
      doc.font("Helvetica");
    
      for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
          doc,
          position,
          i+1,
          item.item,
          formatCurrency(item.unitPrice),
          item.quantity,
          formatCurrency(item.unitPrice * item.quantity)
        );
    
        generateHr(doc, position + 20);
      }
    
      const subtotalPosition = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "Subtotal",
        "",
        formatCurrency(invoice.final_amount)
      );
      doc
      .fontSize(10)
      .text(
        "Ordered From: "+restaurant.name,
        50,
        780,
        { align: "center", width: 500 }
      );
      console.log(restaurant);
    doc.end();
    let stream = doc.pipe(fs.createWriteStream(path));
    stream.addListener('finish', function() {
      // HERE PDF FILE IS DONE
      res.sendFile(path);
    });

}

let generateOrder = async (req,res) => {
    let user = await User.findOne({"_id":req.body.userId}); //!delete afterwards
    let cart = JSON.parse(JSON.stringify(user.cart))
    let final_amount = 0
    for(let i=0;i<cart.items.length;i++){
        let item = await Item.findOne({'_id':cart.items[i].itemId});
        final_amount += cart.items[i].quantity*item.price;
        cart.items[i].unitPrice = item.price;
    }
    let data = {"userId": user._id,"restaurantId":cart.restaurantId,"items":cart.items,final_amount}
    let order = await new Order(data);
    await order.save();
    res.status(201).json({
        "success":true,
        order
    })
}

let getInvoice = async (req, res) => {
    let orderId = req.body.orderId;
    let order = await Order.findOne({"_id":orderId});
    let restaurant = await Restaurant.findOne({"_id":order.restaurantId});
    let user = await User.findOne({"_id":req.body.userId});
    await generatePDF(order,restaurant,user,__dirname+'\\temp\\invoice.pdf',res);
}

let getAllOrders = async (req,res)=>{
  let userid = req.body.userid //! delete afterwards
  try{
    let orders = await Order.find({'userId':userid});
    res.status(200).json({
      "success": true,
      orders
    })
  }
  catch(e){
    res.status(400).json({
      "success":false,
      "error": e
    })
  }
  
  
}

module.exports = {
    updateCart,
    getCart,
    generateOrder,
    getInvoice,
    getAllOrders
};