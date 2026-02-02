export function loadCart() {
    const cartData = localStorage.getItem("cart");
    console.log("Loaded cart data:", cartData);
    if (cartData !== null) {
        return JSON.parse(cartData);
    } else {
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