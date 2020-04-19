module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {} ;
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id, qty, itemPrice) {
        var storedItem = this.items[id]
        // var oneItemPrice = itemPrice * qty
        // console.log(oneItemPrice)
        storedItem = this.items[id] = {item: item, qty: qty, pricePerOne: itemPrice}
        this.totalPrice
        this.totalQty 
    }
    // console.log("carpricepricepricerrr", typeof this.items, this.items)

    this.generateArray = function() {
        var arr = []
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};

// function to remove an item
this.remove = function(item, id, qty, itemPrice) {
    var storedItem = this.item[id]
    storedItem = this.item[id] = {item: item, qty: qty, pricePerOne: itemPrice}
    this.totalPrice
    this.totalQty 
}