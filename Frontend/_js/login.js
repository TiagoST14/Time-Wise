document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#botao").addEventListener("click", function() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      
      if (email === "" || password === "") {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      // Criação do objeto
      var log = {
        email: email,
        senha: password
      };

      // Converte o objeto em JSON
      var jsonData = JSON.stringify(log);

      // URL da rota de login no servidor
      var url = 'http://localhost:4000/login';

      // Envia a requisição para o servidor
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData // Aqui usamos a variável jsonData
      })
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(res => {
        const loginMsg = document.getElementById('loginMsg');
        loginMsg.classList.remove('hidden', 'visible', 'success', 'error'); // Remove todas as classes
        localStorage.setItem('usuarioNome', res.body.nome);
        
        if (res.status === 200) {
          // Se a resposta for bem-sucedida, exibe a mensagem de sucesso
          loginMsg.textContent = res.body.msg ;
          loginMsg.classList.add('visible', 'success');

          // Adiciona um delay antes de redirecionar
          setTimeout(() => {
            window.location.href = "./home.html";
          }, 2000); // 3 segundos de delay

        } else if (res.status === 422 || res.status === 404) {
          // Se houver erro de validação, exibe a mensagem de erro
          loginMsg.textContent = res.body.msg;
          loginMsg.classList.add('visible', 'error');
        } else {
          // Se ocorrer um erro diferente, exibe um erro genérico
          throw new Error('Erro ao enviar requisição: ' + res.status);
        }
      })
      .catch(error => {
        const loginMsg = document.getElementById('loginMsg');
        loginMsg.textContent = "Erro ao enviar requisição. Por favor, tente novamente mais tarde.";
        loginMsg.classList.remove('hidden');
        loginMsg.classList.add('visible', 'error');
        console.error('Erro:', error);
      });
    });
  });