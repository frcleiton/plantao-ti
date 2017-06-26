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
    btnExcluir = document.createElement('button');
    btnExcluir.className = 'delete'; 
    btnExcluir.className = 'delete'; 
    btnExcluir.addEventListener('click', function() {
			removeContact(this);
	});

    tdnome.innerHTML    = contato.nome;
    tdsms.innerHTML     = contato.sms;
    tdemail.innerHTML   = contato.email;

    tr.appendChild(tdnome);
    tr.appendChild(tdsms);
    tr.appendChild(tdemail);
    tr.appendChild(btnExcluir);
    tbody.appendChild(tr);
}

function removeContact(item) {
    email = item.previousSibling.innerHTML;
    if (confirm("Gostaria de remover? "+email)) {
        for (var i=0; i<lista.length; i++){
            if (email == lista[i].email) {
                lista.splice(i,1);
            }
        }
        //Regrava a lista no Storage
        var jsonText = JSON.stringify(lista);
        localStorage.setItem('lista-plantao', jsonText);
        //Remove da pagina
        ltbody = item.parentNode.parentNode;
        ltbody.removeChild(item.parentNode);
    }
}



