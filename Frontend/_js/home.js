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
    const date = new Date();
    const hora = addZero(date.getHours());
    const minutos = addZero(date.getMinutes());
    const segundos = addZero(date.getSeconds());

    
    const dia = addZero(date.getDate());
    const mes = addZero(date.getMonth()+1);
    const ano = addZero(date.getFullYear());
    
    const currentTime = `${hora}:${minutos}:${segundos} ${dia}/${mes}/${ano}`;
    currentTime.String;
    console.log("Ponto",currentTime);
    const res = document.getElementById("res");
        //console.log("hora:",hora,":",minutos,":",segundos);
        //console.log(dia,"/",mes,"/",ano);

    const time = (hora,minutos,segundos);
       
        res.innerHTML = `HORA ${hora}:${minutos}:${segundos} DATA ${dia}/${mes}/${ano}`
        
    //res.innerHTML = `HORA ${hora}`
}
function showTime(time){
    
}
function addZero(value){
    // Funcação adiciona zero a frente da data 
    // falta implementar ao codigo acima 
    return String(value).padStart(2,"0")
    
}


//getTime();


window.setInterval(getTime ,1000);
