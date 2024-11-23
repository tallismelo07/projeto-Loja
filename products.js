const productForm = document.getElementById('product-form'); // Formulário de produto
const productList = document.querySelector('#product-list ul'); // Lista de produtos

// Simula armazenamento local de produtos
let localProducts = [];

// Carregar produtos iniciais da API
fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        localProducts = data.products; // Salva os produtos na lista local
        localProducts.forEach(product => addProductToList(product)); // Adiciona à interface
    })
    .catch(err => console.error('Erro ao carregar produtos:', err));

// Evento para adicionar novo produto
productForm.addEventListener('submit', e => {
    e.preventDefault();

    // Captura os valores do formulário
    const product = {
        id: Date.now(), // Gera um ID único
        title: document.getElementById('title').value.trim(),
        price: parseFloat(document.getElementById('price').value),
        brand: document.getElementById('brand').value.trim(),
        category: document.getElementById('category').value.trim(),
        thumbnail: document.getElementById('thumbnail').value.trim() || 'https://via.placeholder.com/150'
    };

    // Valida os campos antes de adicionar
    if (!product.title || isNaN(product.price)) {
        alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        return;
    }

    localProducts.push(product); // Adiciona o produto à lista local
    addProductToList(product); // Atualiza a interface
    productForm.reset(); // Reseta o formulário
});

// Função para adicionar o produto à lista
function addProductToList(product) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div>
            <img src="${product.thumbnail}" alt="${product.title}" style="width:50px;height:50px;border-radius:50%;">
            <strong>${product.title}</strong> - R$${product.price.toFixed(2)}<br>
            Marca: ${product.brand} | Categoria: ${product.category}
        </div>
        <button class="btn-delete" data-id="${product.id}">Remover</button>
    `;
    productList.appendChild(li);

    // Evento para remover produto da lista local e da interface
    li.querySelector('.btn-delete').addEventListener('click', () => {
        removeProduct(product.id, li);
    });
}

// Função para remover produto
function removeProduct(id, listItem) {
    const productIndex = localProducts.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        localProducts.splice(productIndex, 1); // Remove da lista local
        listItem.remove(); // Remove da interface
    } else {
        alert('Produto não encontrado.');
    }
}
