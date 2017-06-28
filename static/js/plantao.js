start();

lista = [];
lista = getFromLocalStorage();

function start() {
    var form = document.querySelector('form');
    var buttonCriar = document.getElementById('criar');
    buttonCriar.onclick = function() {
        adicionar(form);
    };
    var buttonRelatorio = document.getElementById('relatorio');
    buttonRelatorio.onclick = function() {
        relatorio();
    };
}

function adicionar(form) {
    var plantonista = {
        nome: form.nome.value,
        setor: form.setor.value,
        email: form.email.value,
        sms: form.sms.value
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
    tdsetor = document.createElement('td');
    tdemail = document.createElement('td');
    tdsms   = document.createElement('td');
    btnExcluir = document.createElement('button');
    btnExcluir.className = 'delete'; 
    btnExcluir.addEventListener('click', function() {
			removeContact(this);
	});

    tdnome.innerHTML    = contato.nome;
    tdsetor.innerHTML   = contato.setor;
    tdemail.innerHTML   = contato.email;
    tdsms.innerHTML     = contato.sms;

    tr.appendChild(tdnome);
    tr.appendChild(tdsetor);
    tr.appendChild(tdemail);
    tr.appendChild(tdsms);
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

function relatorio() {

      var servidores = 0;
      var sistemas = 0;
      var helpdesk = 0;
      var telecom = 0;
      var outros = 0;

      for (var plant in lista) {
          if (lista[plant].setor == "Servidores") {
              servidores += 1;
          } else if (lista[plant].setor == "Sistemas"){
              sistemas += 1;
          } else if (lista[plant].setor == "Help Desk"){
              helpdesk += 1;
          } else if (lista[plant].setor == "Telecom") {
              telecom += 1;
          } else {
              outros += 1;
          }
      }  
    
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Setor', 'Plantonistas'],
          ['Servidores', servidores],
          ['Sistemas', sistemas],
          ['Help Desk', helpdesk],
          ['Telecom', telecom],
          ['Outros', outros]
        ]);

        var options = {
          title: 'Escala para plantão'
        };

        var chart = new google.visualization.PieChart(document.getElementById('grafico'));

        chart.draw(data, options);
      }
}



