document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');

    // Adicionar itens ao carrinho
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const menuItem = this.closest('.menu-item');
            const name = menuItem.getAttribute('data-name');
            const price = parseFloat(menuItem.getAttribute('data-price'));

            const item = {
                name,
                price,
                quantity: 1
            };

            // Adicionar ou atualizar o item no carrinho
            const existingItemIndex = cart.findIndex(i => i.name === item.name);
            if (existingItemIndex >= 0) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push(item);
            }

            // Salvar carrinho no localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });

    // Atualizar a visualização do carrinho
    function updateCart() {
        cartItems.innerHTML = '';

        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
            return;
        }

        const ul = document.createElement('ul');
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}`;
            ul.appendChild(li);
        });

        cartItems.appendChild(ul);
    }

    updateCart();

    // Finalizar pedido
    document.getElementById('checkout')?.addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio.');
            return;
        }

        alert('Pedido finalizado com sucesso!');
        localStorage.removeItem('cart'); // Limpar o carrinho no localStorage
        cart.length = 0; // Limpar o carrinho local
        updateCart();
    });

    // Formulário de pedido
    document.getElementById('order-form')?.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const quantity = parseInt(document.getElementById('quantity').value, 10);

        if (name && quantity > 0) {
            alert(`Pedido recebido! Nome: ${name}, Quantidade: ${quantity}`);
            // Aqui você pode adicionar código para enviar os dados para um servidor, por exemplo.
