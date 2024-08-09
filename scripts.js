document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cart-items');
    const cart = [];

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

            // Atualizar visualização do carrinho
            updateCart();
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

    // Finalizar pedido
    document.getElementById('checkout').addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio.');
            return;
        }

        alert('Pedido finalizado com sucesso!');
        cart.length = 0; // Limpar o carrinho
        updateCart();
    });

    // Formulário de pedido
    document.getElementById('order-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const quantity = parseInt(document.getElementById('quantity').value, 10);

        if (name && quantity > 0) {
            alert(`Pedido recebido! Nome: ${name}, Quantidade: ${quantity}`);
            // Aqui você pode adicionar código para enviar os dados para um servidor, por exemplo.
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});
