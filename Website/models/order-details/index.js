var orderDetail = function(orderId, productId, quantity, price, amount){
  this.orderId = orderId;
  this.productId = productId;
  this.quantity = quantity;
  this.price = price;
  this.amount = amount;
}

module.exports = orderDetail;
