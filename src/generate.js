function generateProduct(data) {
    const cartItem = document.createElement('div');
    cartItem.className = 'item'; 
    cartItem.textContent = `${data.price}: ${data.prod} $.`;

    const cartContent = document.querySelector('.cartwindow__content');
    return cartItem;
}

export {generateProduct};

export const generateBtn = (className, textContent) => {
    const btn = document.createElement('button')
    btn.className = className
    btn.textContent = textContent
    return btn

}