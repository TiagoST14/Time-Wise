document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("card_user").addEventListener("click", function() {
        
        window.location.href = "telaCadastro.html";
    });
    document.getElementById("sair").addEventListener("click", function() {
        
        window.location.href = "telaLogin.html";
    });
    document.getElementById('cardFuncionario').addEventListener("click",function(){
            
        window.location.href = "funcionarios.html";
    });

    document.getElementById('cardEmpresa').addEventListener("click",function(){
        window.location.href= "empresas.html";
    })
    function atualizarNomeUsuario() {
        const usuarioLogElement = document.getElementById('usuario_log');
        const usuarioNome = localStorage.getItem('usuarioNome') || 'Usuário';
        usuarioLogElement.textContent = usuarioNome;
    }
    atualizarNomeUsuario();
});

function getTime(){
    
    //const res = document.getElementById('res').value
    const now = new Date();
    
    // Obtendo a data e hora atuais
    const dia = addZero(now.getDate());
    const mes = addZero(now.getMonth() + 1);
    const ano = now.getFullYear();
    const hora = addZero(now.getHours());
    const minutos = addZero(now.getMinutes());
    const segundos = addZero(now.getSeconds())
    
    
    const res = document.getElementById('res')
   
        //console.log("hora:",hora,":",minutos,":",segundos);
        //console.log(dia,"/",mes,"/",ano);

    const time = (hora,minutos,segundos);
       
        res.innerHTML = `${hora}:${minutos}:${segundos} `
        //DATA ${dia}/${mes}/${ano}
        
    //res.innerHTML = `HORA ${hora}`
   
}
function showTime(time){
    
}
function addZero(value){
    // Funcação adiciona zero a frente da data 
    // falta implementar ao codigo acima 
    return String(value).padStart(2,"0")
    
}
//Função para obter o endereço usando a API do Nominatim
const chaveApi = 'pk.09c321c4408ab27407892c09dcc2abff'
function obterEndereco(latitude, longitude, callback) {
    const url = `https://us1.locationiq.com/v1/reverse?key=${chaveApi}&lat=${latitude}&lon=${longitude}&format=json&`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log("Resposta da API LocationIQ:", data); // Log para depuração

        if (data && data.address) {
            const road = data.address.road || "N/A";
            const suburb = data.address.suburb || "N/A";
            const city = data.address.city || "N/A";
            const country = data.address.country || "N/A";

            // Formata o endereço desejado
            const enderecoFormatado = `${road}, ${suburb}, ${city}, ${country}`;
            callback(enderecoFormatado);
        } else {
            callback('Endereço não encontrado.');
        }
    })
    .catch((error) => {
        console.error('Erro ao converter coordenadas em endereço:', error);
        callback('Erro ao obter o endereço.');
    });
}

// Função para registrar a data, hora e localização do clique
function registrarHora() {
    
    const now = new Date();
    
    // Obtendo a data e hora atuais
    const dia = addZero(now.getDate());
    const mes = addZero(now.getMonth() + 1);
    const ano = now.getFullYear();
    const hora = addZero(now.getHours());
    const minutos = addZero(now.getMinutes());
    const segundos = addZero(now.getSeconds())
    
    const dataPonto = `${dia}/${mes}/${ano}`;
    const horaPonto = `${hora}:${minutos}:${segundos}`;

    const log = document.getElementById('log');
    const registro = document.createElement('p');
    registro.textContent = `Ponto registrado em: Data: ${dataPonto}, Hora: ${horaPonto}`;
    log.appendChild(registro);

    // Obter a localização e adicionar ao log
    obterLocalizacao((localizacao) => {
        const log = document.getElementById('log');
        const registro = document.createElement('p');
        registro.textContent = `Data: ${data}, Hora: ${hora}, ${localizacao}`;
        log.appendChild(registro);
    });
}
function dadosDoUsuario(){

}
getTime();
window.setInterval(getTime ,1000);
document.getElementById('registrar').addEventListener('click', registrarHora);

