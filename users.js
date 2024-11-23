const userForm = document.getElementById('user-form');
const userList = document.querySelector('#user-list ul');

// Simula armazenamento local de usuários
let localUsers = [];

// Carregar usuários iniciais da API
fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(data => {
        localUsers = data.users; // Salva os usuários na lista local
        localUsers.forEach(user => addUserToList(user));
    });

// Adicionar novo usuário ao local e na interface
userForm.addEventListener('submit', e => {
    e.preventDefault();

    const user = {
        id: Date.now(), // Cria um ID único para o usuário
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        age: parseInt(document.getElementById('age').value),
        image: document.getElementById('image').value || 'https://via.placeholder.com/150'
    };

    localUsers.push(user); // Adiciona à lista local
    addUserToList(user); // Atualiza a interface
    userForm.reset(); // Reseta o formulário
});

// Função para adicionar usuário na lista (interface)
function addUserToList(user) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div>
            <img src="${user.image}" alt="${user.firstName}" style="width:50px;height:50px;border-radius:50%;">
            <strong>${user.firstName} ${user.lastName}</strong> - ${user.email} (${user.age} anos)
        </div>
        <button class="btn-delete" data-id="${user.id}">Remover</button>
    `;
    userList.appendChild(li);

    // Evento para remover usuário da lista local e da interface
    li.querySelector('.btn-delete').addEventListener('click', () => {
        removeUser(user.id, li);
    });
}

// Função para remover usuário da lista local
function removeUser(id, listItem) {
    const userIndex = localUsers.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        localUsers.splice(userIndex, 1); // Remove da lista local
        listItem.remove(); // Remove o elemento da interface
    } else {
        alert('Não foi possível remover o usuário.'); // Mensagem caso o usuário não seja encontrado
    }
}
