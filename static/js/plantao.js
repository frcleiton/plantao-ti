start();

lista = [];
lista = getFromLocalStorage();

function start() {
    var form = document.querySelector('form');
    var buttonCriar = document.getElementById('criar');
    buttonCriar.onclick = function() {
        adicionar(form);
    };
}

function adicionar(form) {
    var plantonista = {
        nome: form.nome.value,
        sms: form.sms.value,
        email: form.email.value
    }
    lista.push(plantonista);
    console.log(lista);
    var jsonText = JSON.stringify(lista);
    localStorage.setItem('lista-plantao', jsonText);
    addContactToHTML(plantonista);
    form.reset();
}

function getFromLocalStorage() {
    var jsonText = localStorage.getItem('lista-plantao');
    if (jsonText) {
        lista = JSON.parse(jsonText);
        lista.forEach(function(element) {
            addContactToHTML(element);
        }, this);
        return lista
    }
    return [];
}

function addContactToHTML(contato) {
    tbody = document.getElementById('itenslista');
    tr = document.createElement('tr');
    tdnome  = document.createElement('td');
    tdsms   = document.createElement('td');
    tdemail = document.createElement('td');

    tdnome.innerHTML    = contato.nome;
    tdsms.innerHTML     = contato.sms;
    tdemail.innerHTML   = contato.email;

    tr.appendChild(tdnome);
    tr.appendChild(tdsms);
    tr.appendChild(tdemail);
    tbody.appendChild(tr);
}


