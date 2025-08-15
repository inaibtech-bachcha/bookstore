document.addEventListener('DOMContentLoaded', () => {
    // --- Homepage Logic ---
    if (document.querySelector('.book-list')) {
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.dataset.id;
                const title = button.dataset.title;
                const price = parseFloat(button.dataset.price);

                addToCart({ id, title, price });
            });
        });
    }

    // --- Cart Page Logic ---
    if (document.getElementById('cart-items-container')) {
        displayCart();
    }

    function addToCart(item) {
        let cart = getCart();
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }

        saveCart(cart);
        alert(`${item.title} has been added to your cart.`);
    }

    function displayCart() {
        const cart = getCart();
        const cartContainer = document.getElementById('cart-items-container');
        const cartTotalContainer = document.getElementById('cart-total');
        let total = 0;

        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalContainer.innerHTML = '';
            return;
        }

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <span>${item.title}</span>
                <span>$${item.price.toFixed(2)}</span>
                <input type="number" value="${item.quantity}" min="1" class="update-quantity" data-id="${item.id}">
                <span>$${itemTotal.toFixed(2)}</span>
                <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
            `;
            cartContainer.appendChild(cartItemElement);
        });

        cartTotalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;

        // Add event listeners for remove and update buttons
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                removeFromCart(id);
            });
        });

        document.querySelectorAll('.update-quantity').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = e.target.dataset.id;
                const quantity = parseInt(e.target.value);
                updateQuantity(id, quantity);
            });
        });
    }

    function removeFromCart(id) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== id);
        saveCart(cart);
        displayCart();
    }

    function updateQuantity(id, quantity) {
        let cart = getCart();
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
        }
        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
        saveCart(cart);
        displayCart();
    }

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});
