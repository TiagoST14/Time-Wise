document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.form');
    const cpfInput = document.getElementById('cpf');

    cpfInput.addEventListener('keypress', () => {
        let cpfLength = cpfInput.value.length;
        if (cpfLength === 3 || cpfLength === 7) {
            cpfInput.value += '.';
        }
        if (cpfLength === 11) {
            cpfInput.value += '-';
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const novoFuncionario = {
            func_nome: document.getElementById('nome').value,
            func_email: document.getElementById('email').value,
            func_cpf: document.getElementById('cpf').value,
            func_nasc: document.getElementById('nascimento').value,
            func_sexo: document.getElementById('sexo').value,
            func_tel: document.getElementById('telefone').value,
            func_end: document.getElementById('endereco').value,
            func_contrato: document.getElementById('contrato').value,
            func_setor: document.getElementById('setor').value,
            func_filial: document.getElementById('filial').value,
            func_escala: document.getElementById('escala').value
        };

        console.log('Dados enviados:', novoFuncionario);

        fetch('http://localhost:4000/funcCadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoFuncionario)
        })
        .then(response => {

            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.errorcpfmsg || 'Erro ao cadastrar funcionário') });
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta da API:', data);
            alert('Funcionário registrado com sucesso!');
            form.reset(); // Limpa os campos do formulário após o cadastro bem-sucedido
        })
        .catch(error => {
            console.error('Erro durante a requisição:', error);
            alert(error.message || 'Ocorreu um erro ao registrar o Funcionário. Por favor, tente novamente.');
        });
    });

    document.getElementById('voltar_funcionario').addEventListener('click', function() {
        window.location.href = "funcionarios.html";
    });
});
function fecharPopUp(){
    document.getElementById('popup').style.display = 'none';
}
function abrirPopUp(){
    document.getElementById('popup').style.display= 'block';
}
