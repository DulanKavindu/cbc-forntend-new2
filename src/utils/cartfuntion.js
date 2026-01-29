export function loardCart() {
    const cartData = localStorage.getItem("cart");
    if(cartData!==null) {
        return JSON.parse(cartData);
    }
    else{
        return [];
    }
}