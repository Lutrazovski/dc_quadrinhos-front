function abrir(url) {
    window.open(url)
}

function preencheCombo(dados, idCombo){
    let combo = document.getElementById(idCombo);
    combo.innerHTML = '<option selected>Escolha...</option>';
    for(var i=0; i < dados.length; i++){
        let option = document.createElement('option');
        option.value = dados[i].id;
        option.text = dados[i].nome;
        combo.appendChild(option);
    }
}

function listarHerois(){
    fetch('http://localhost:8080/herois').
    then(response=>response.json()).
    then(function(dados){
            preencheCombo(dados,'heroi')
        }
    );
}

function listarQuadrinhos() {

    fetch('http://localhost:8080/quadrinhos').
    then(function (response){
        response.json().then(function(dados) {
            //recuperar o corpo da tabela
            let corpoDaTabela = document.getElementById('corpoDaTable');
            //limpar o corpo da tabela
            corpoDaTabela.innerHTML = '';
            //percorrer os dados e montar as linhas da tabela
            dados.forEach(function(quadrinho){
                let linha = document.createElement('tr');
                let conteudoLinha = `
                         <td style="align-content: center">${quadrinho.nome}</td>
                         <td><img width="10%" height="10%" src="${quadrinho.imagem}" alt="${quadrinho.nome}"></td>
                         <td style="align-content: center">
                            <button class="btn btn-danger" onClick="excluirQuadrinho(${quadrinho.id})">Excluir</button>
                        </td>`;
                linha.innerHTML = conteudoLinha;
                corpoDaTabela.appendChild(linha);
            })
        })
    });
}

function excluirQuadrinho(idQuadrinho){
    if(confirm("Deseja realmente excluir?")){
        fetch('http://localhost:8080/quadrinhos/'+idQuadrinho,{
            method:'DELETE'
        }).then(response=>{
            if(response.status === 204){
                alert('Quadrinho excluído com sucesso');
                listarHerois();
            }else{
                alert('Erro ao excluir pessoa');
            }
        })
    }
}

function gravarQuadrinho(evento){
    evento.preventDefault();
    //recuperar os valores do formulario
    let nome = document.getElementById('nome').value;
    let imagem = document.getElementById('imagem').value;
    let heroi = document.getElementById('heroi').value;

    //montar o objeto conforme o modelo do back-end
    let quadrinho = {
        nome: nome,
        imagem: imagem,
        heroi: {
            id: heroi
        },
    };
    //fazer a requisição para o back-end via post
    fetch('http://localhost:8080/quadrinhos',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quadrinho)
    }).then(function(response){
        if(response.status === 201){
            alert('Quadrinho cadastrado com sucesso');
            window.location.href = 'consultar.html';
        }else{
            alert('Erro ao cadastrar pessoa')
        }
    });
}

function popularSessoes(){
    listarQuadrinhosPorHeroi(1, "superman")
    listarQuadrinhosPorHeroi(2, "batman")
    listarQuadrinhosPorHeroi(3, "flash")
    listarQuadrinhosPorHeroi(4, "wonder")
    listarQuadrinhosPorHeroi(5, "lantern")
    listarQuadrinhosPorHeroi(6, "arrow")
    listarQuadrinhosPorHeroi(7, "cyborg")
    listarQuadrinhosPorHeroi(8, "aquaman")
}

function listarQuadrinhosPorHeroi(idHeroi, idDiv) {

    fetch('http://localhost:8080/quadrinhos/heroi/'+idHeroi).
    then(function (response){
        response.json().then(function(dados) {
            let divHeroi = document.getElementById(idDiv)
            divHeroi.innerHTML = '';
            dados.forEach(function(quadrinho) {
                divHeroi.innerHTML += `<img class="img-fluid m-2" src="${quadrinho.imagem}" alt="Cyborg" style="cursor: pointer">`;
            })
        })
    });
}
