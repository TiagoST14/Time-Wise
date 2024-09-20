document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const cardFuncionario = document.getElementById('card_funcionario');
    if (cardFuncionario) {
        cardFuncionario.addEventListener("click", function() {
            window.location.href = "";
        });
    }

    const sairButton = document.getElementById('sair');
    if (sairButton) {
        sairButton.addEventListener('click', function() {
            window.location.href = "home.html";
        });
    }

    const novoFuncionarioButton = document.getElementById('novoFuncionario');
    if (novoFuncionarioButton) {
        novoFuncionarioButton.addEventListener('click', function() {
            window.location.href = "telaCadastro.html";
        });
    }

    const voltarFuncionarioButton = document.getElementById('voltar_funcionario');
    if (voltarFuncionarioButton) {
        voltarFuncionarioButton.addEventListener('click', function() {
            window.location.href = "administradores.html";
        });
    }
});
   fetch('http://localhost:4000/buscaAdm')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar usuários: ' + response.statusText);
            }
            return response.json();
        })
        .then(users => {
            const usuariosList = document.getElementById('card_admin');
            if (usuariosList) {
                usuariosList.innerHTML = ''; // Limpa a lista antes de adicionar novos itens
    
                if (users.length === 0) {
                    const noUsersMessage = document.createElement('li');
                    noUsersMessage.textContent = 'Nenhum usuário cadastrado';
                    usuariosList.appendChild(noUsersMessage);
                } else {
                    users.forEach(user => {
                        const listItem = document.createElement('li');
                        listItem.textContent = user.nome;
                        usuariosList.appendChild(listItem);
                        
                    });
                }
            }
        })
        .catch(error => {
            console.error('Erro durante a requisição:', error);
            alert('Ocorreu um erro ao buscar os usuários. Por favor, tente novamente.');
        });
        /*function excluirUsuario(nome, listItem) {
            fetch('http://localhost:4000/deleteUser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: nome })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir usuário: ' + response.statusText);
                }
                alert('Usuário excluído com sucesso');
                listItem.remove(); // Remove o usuário da lista no frontend
            })
            .catch(error => {
                console.error('Erro durante a exclusão:', error);
                alert('Ocorreu um erro ao excluir o usuário. Por favor, tente novamente.');
            });
        }*/




            document.addEventListener("DOMContentLoaded", function() {
                // Event listener para o botão de buscar
                document.getElementById('buscar-admin').addEventListener('click', async function() {
                    const buscaNome = document.getElementById('busca').value.trim();
                    
                    if (buscaNome === '') {
                        alert('Por favor, digite um nome para buscar.');
                        return;
                    }
            
                    try {
                        const response = await fetch(`http://localhost:4000/buscaAdm?nome=${encodeURIComponent(buscaNome)}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
            
                        if (!response.ok) {
                            throw new Error(`Erro ao buscar administrador: ${response.statusText}`);
                        }
            
                        const data = await response.json();
                        mostrarResultadoBusca(data);
                    } catch (error) {
                        console.error('Erro durante a busca:', error);
                        alert('Ocorreu um erro ao buscar o administrador. Por favor, tente novamente.');
                    }
                });
            
                // Event listener para o botão de deletar
                document.getElementById('deletar-admin').addEventListener('click', async function() {
                    const buscaNome = document.getElementById('busca').value.trim();
            
                    if (buscaNome === '') {
                        alert('Por favor, digite um nome para buscar antes de deletar.');
                        return;
                    }
            
                    if (!confirm(`Tem certeza que deseja excluir o administrador ${buscaNome}?`)) {
                        return;
                    }
            
                    try {
                        const response = await fetch('http://localhost:4000/deletaAdm', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ nome: buscaNome })
                        });
            
                        if (!response.ok) {
                            throw new Error(`Erro ao excluir administrador: ${response.statusText}`);
                        }
            
                        alert('Administrador excluído com sucesso.');
                        limparResultadoBusca()
                    } catch (error) {
                        console.error('Erro durante a exclusão:', error);
                        alert('Ocorreu um erro ao excluir o administrador. Por favor, tente novamente.');
                    }
                });
            
                // Função para mostrar o resultado da busca
                function mostrarResultadoBusca(data) {
                    const resultadoDiv = document.getElementById('card_admin');
                    resultadoDiv.innerHTML = '';
            
                    if (Array.isArray(data) && data.length > 0) {
                        data.forEach(admin => {
                            const adminDiv = document.getElementById('card_admin');
                            adminDiv.textContent = `Nome: ${admin.nome}`;
                            
                        });
                    } else {
                        resultadoDiv.innerText = 'Nenhum administrador encontrado.';
                    }
                }
            
                // Função para limpar o resultado da busca
                function limparResultadoBusca() {
                    const resultadoDiv = document.getElementById('resultadobusca');
                    resultadoDiv.innerHTML = '';
                }
            });
            




















/*document.addEventListener('DOMContentLoaded', () => {
    const formBusca = document.querySelector('.formBusca');

    formBusca.addEventListener('submit', async function (evento) {
        evento.preventDefault();
        const inputBusca = document.getElementById('buscaNome').value;

        try {
            const response = await fetch(`http://localhost:4000/buscar?nome=${encodeURIComponent(inputBusca)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.statusText}`);
            }

            const data = await response.json();
            mostrarResultado(data);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            document.getElementById('resultadoBusca').innerText = 'Erro ao buscar usuário';
        }
    });

    function mostrarResultado(data) {
        const resultadoDiv = document.getElementById('resultadoBusca');
        resultadoDiv.innerHTML = '';

        if (Array.isArray(data) && data.length > 0) {
            data.forEach(usuario => {
                const userDiv = document.createElement('div');
                userDiv.textContent = `Nome: ${usuario.nome}, Email: ${usuario.email}, Telefone: ${usuario.telefone}`;
                resultadoDiv.appendChild(userDiv);
            });
        } else {
            resultadoDiv.innerText = 'Nenhum usuário encontrado';
        }
    }
});*/
