export function loardCart() {
    const cartData = localStorage.getItem("cart");
    if(cartData!==null) {
        return JSON.parse(cartData);
    }
    else{
        return [];
    }
}

export function addToCart(productId, quantity) {
    const cartData = loardCart();
    const index = cartData.findIndex((item) => item.productId === productId);
    if(index==-1){
        cartData.push({productId, quantity});
    }
    else{
        const newQuantity = cartData[index].quantity + quantity;
        if(newQuantity <= 0){
            cartData.splice(index, 1);
        }
        else{
            cartData[index].quantity = newQuantity;
        }
    }


}

export function saveCart(cartData) {
    localStorage.setItem("cart", JSON.stringify(cartData));
}