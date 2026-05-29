const formulario = document.getElementById("formContato");

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    alert("Mensagem enviada com sucesso!");

});