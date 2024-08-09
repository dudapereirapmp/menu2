document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const item = document.getElementById('item').value;
    const quantity = document.getElementById('quantity').value;

    if (name && item && quantity) {
        alert(`Pedido recebido!\nNome: ${name}\nItem: ${item}\nQuantidade: ${quantity}`);
        // Aqui você pode adicionar código para enviar os dados para um servidor, por exemplo.
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
