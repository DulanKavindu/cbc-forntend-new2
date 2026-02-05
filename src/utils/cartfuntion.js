export function loadCart() {
    const cartData = localStorage.getItem("cart");
    

    if (cartData === null || cartData === "undefined") {
        return [];
    }

    try {
        return JSON.parse(cartData);
    } catch  {
        
        return [];
    }
}

export function saveCart(cartData) {
    localStorage.setItem("cart", JSON.stringify(cartData));
}

export function addToCart(productId, quantity) {
    const cartData = loadCart();
    const index = cartData.findIndex((item) => item.productId === productId);

    if (index === -1) {
        cartData.push({ productId, quantity });
    } else {
        const newQuantity = cartData[index].quantity + quantity;
        if (newQuantity <= 0) {
            cartData.splice(index, 1);
        } else {
            cartData[index].quantity = newQuantity;
        }
    }

    saveCart(cartData);
}
export function deleteFromCart(productId) {
    const cartData = loadCart();
    const index = cartData.findIndex((item) => item.productId === productId);
    if (index !== -1) {
        const newCart = cartData.splice(index, 1);
        saveCart(newCart);
    }
}