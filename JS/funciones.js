window.addEventListener('load', red, true);
window.addEventListener('load', level, true);

function level(){
	var link = "mail="+localStorage.getItem('Mail');
  data = new XMLHttpRequest();
  data.open('POST', "https://jorggerojas.000webhostapp.com/ama/getInfoUser.php");
  data.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  data.send(link);
  data.onreadystatechange = function(){
    if (data.readyState == 4 && data.status == 200){
      var us=JSON.parse(data.responseText);
			localStorage.setItem('nivel', us.Nivel);
			localStorage.setItem('puntos', us.Puntos);
			document.getElementById('level').innerText = "Nivel "+us.Nivel;

    }

	}
}

function red() {
	if(localStorage.getItem('Mail')== null){
		window.location="index.html";
	}
}

function mostrar() {
    document.getElementById("sidebar").style.width = "75%";
    document.getElementById("contenido").style.marginLeft = "75%";
    document.getElementById("abrir").style.display = "none";
    document.getElementById("cerrar").style.display = "inline";
}

function ocultar() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("contenido").style.marginLeft = "0";
    document.getElementById("abrir").style.display = "inline";
    document.getElementById("cerrar").style.display = "none";
}


function grafica() {
	Chart.defaults.global.legend.display = false;
	var puntos = localStorage.getItem('puntos');
	var nivel = localStorage.getItem('nivel');
	var restante = 30 - puntos;
	document.getElementById('nivel').innerHTML += nivel;
	document.getElementById('puntaje').innerHTML += puntos +" | 30 puntos para subir de nivel";


	var ctx = document.getElementById("myChart");
	var myChart = new Chart(ctx, {
	    type: 'doughnut',
	    data: {
	        labels: ["Puntos actuales", "Puntos restantes"],
	        datasets: [{
	        	hidde : true,
	            data: [puntos, restante],
	            backgroundColor: [
	                '#4ab8b8'
	            ],
	            borderColor: [
                '#4ab8b8',
                '#4ab8b8'
            ],
            borderWidth: 2
	        }]
	    },
	    options: {
	    	cutoutPercentage: 70
	    }
	});
}

function llenado() {
	var hola = "";
	var bandera;
	correo = localStorage.getItem('Mail');
	inicioAjax = new XMLHttpRequest();

	////////AQUI
	inicioAjax.open('GET', 'https://jorggerojas.000webhostapp.com/ama/getConsumo.php?correo='+correo);
	inicioAjax.send();

	inicioAjax.onreadystatechange = function(){


		if (inicioAjax.readyState == 4 && inicioAjax.status == 200) {
			datIn = JSON.parse(inicioAjax.responseText);
			bandera = datIn.consumoMax;
			localStorage.setItem('temp', inicioAjax.responseText);
			if(datIn != ""){
				if(parseInt(bandera) > parseInt(config['res'])){
					hola =
						"<div class='card' >"+
			          		"<p style='color: red; font-weight: bold; font-size:2rem;'>Alerta</p>"+
			          		"<h2>Los niveles del uso de agua rebasan el promedio recomendado por la OMS. Por favor cuida tu consumo para conservar tu racha.</h2"+
			          		"<h2>Usa nuestros cosejos para optimizar tu consumo de agua.</h2"+
			          		"<br><h1 style='font-size: 100%;'>Estado de ahorro</h1>"+
			          		"<h2 style='color:red; font-weight: bold;'>Uso Excesivo de Agua</h2>"+
			        	"</div>"+
			        	"<div class='card' >"+
			          		"<h1 style='color: red; font-weight: bold;'>Consumo: </h1>"+
			          		"<h2 style='font-size: 150%;'>"+datIn.consumoDia+" litros / minuto</h2>"+
			          		"<h2 style='font-size: 150%;'>"+bandera+" litros totales</h2>"+
			          		"<br><h1 style='font-size: 100%;'>Estado de ahorro</h1>"+
			          		"<h2 style='color:red; font-weight: bold;'>Uso Excesivo de Agua</h2>"+
			        	"</div>";
				}else{
					hola =
								"<div class='card' >"+
			          		"<h1 style='color: #007849'; font-weight: bold;'>Enhorabuena</h1>"+
			          		"<h2>Los niveles de uso de agua se mantienen en el promedio recomendado por la OMS</h2><h2 style='color:#1b3764'>¡SIGUE ASÍ!</h2>"+
			          		"<br><h1 style='font-size: 100%;'>Estado de ahorro</h1>"+
			          		"<h2 style='color:#1b3764; font-weight: bold;'>Óptimo</h2>"+
			        	"</div>"+
			        	"<div class='card' >"+
			          		"<h1 style='color: #007849'; font-weight: bold;'>Consumo:</h1>"+
			          		"<h2 style='font-size: 150%;'>"+datIn.consumoDia+" litros al día</h2>"+
			          		"<h2 style='font-size: 150%;'>"+bandera+" litros totales </h2>"+
			          		"<br><h1 style='font-size: 100%;'>Estado de ahorro</h1>"+
			          		"<h2 style='color:#1b3764; font-weight: bold;'>Óptimo</h2>"+
			        	"</div>";
				}



				document.querySelector('article').innerHTML = hola;

			}

		}
	}
}

function verificar() {
	var nivelPrincipal = parseInt(localStorage.getItem('nivel'));
	var nivelP1 = document.getElementById('nivelP1').value;
	var nivelP2 = document.getElementById('nivelP2').value;
	var nivelP3 = document.getElementById('nivelP3').value;
	var nivel1 = document.getElementById('nivel1');
	var nivel3 = document.getElementById('nivel3');
	var nivel2 = document.getElementById('nivel2');
	if(nivelPrincipal >= nivelP2){
		nivel2.classList.remove('nivelB');
		nivel2.classList.add('nivel');
	}else{
		nivel2.classList.remove('nivel');
		nivel2.classList.add('nivelB');
	}
	if(nivelPrincipal >= nivelP1){
		nivel1.classList.remove('nivelB');
		nivel1.classList.add('nivel');
	}else{
		nivel1.classList.remove('nivel');
		nivel1.classList.add('nivelB');
	}
	if(nivelPrincipal >= nivelP3){
		nivel3.classList.remove('nivelB');
		nivel3.classList.add('nivel');
	}else{
		nivel3.classList.remove('nivel');
		nivel3.classList.add('nivelB');
	}
}

function actualizar() {
	lag = JSON.parse(localStorage.getItem('temp'));
	timer=parseInt(lag.promedioConsumo);
	inicioAjax = new XMLHttpRequest();
	inicioAjax.open('GET', 'https://jorggerojas.000webhostapp.com/ama/valor.php');
	inicioAjax.send();
	inicioAjax.onreadystatechange = function(){
			console.log(inicioAjax.status);
		if (inicioAjax.readyState == 4 && inicioAjax.status == 200) {
				inicio = JSON.parse(inicioAjax.responseText);
				bandera = parseInt(inicio.consumoMax);
			if(inicio != ""){
				if(parseInt(bandera) > parseInt(timer)){
					llenado();
				}else{
					llenado();
				}
			}
			setTimeout(function(){
				console.log("actualizando");
				actualizar();
			},4000);

		}
	}

}
function compara() {
	var dato;
	var correo = localStorage.getItem('Mail');
	var link = 'correo='+correo;
	inicioAjax = new XMLHttpRequest();
	inicioAjax.open('POST', 'https://jorggerojas.000webhostapp.com/ama/valor.php');
	inicioAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	inicioAjax.send(link);
	inicioAjax.onreadystatechange = function(){
		if (inicioAjax.readyState == 4 && inicioAjax.status == 200) {
			d = JSON.parse(inicioAjax.responseText);
			dato = parseInt(d.consumoDia);
			console.log(d);
		var ctx = document.getElementById("caca");
		ctx.height=400;

		Chart.defaults.global.defaultFontColor = "#ffffff";
		Chart.defaults.global.defaultFontSize = 10;

		var dataFirst = {
		    label: "Promedio de consumo de agua sin AMA (por persona)",
		    data: [150, 180, 175, 160, 158, 185, 201],
		    lineTension: 0.1,
		    fill: false,
		    borderColor: '#efa355',
		    backgroundColor: 'transparent',
		    pointBorderColor: '#efa355',
		    pointBackgroundColor: '#efa355',
		    pointRadius: 5,
		    pointHoverRadius: 15,
		    pointHitRadius: 30,
		    pointBorderWidth: 2,
		    pointStyle: 'rectRounded',
		    borderDash: [2, 2]
		  };

		var dataSecond = {
		    label: "Tu consumo de agua en Litros",
		    data: [0,0,0,0,0,dato],
		    lineTension: 0.1,
		    fill: false,
		    borderColor: '#4ab8b8',
		    backgroundColor: 'transparent',
		    pointBorderColor: '#4ab8b8',
		    pointBackgroundColor: '#4ab8b8',
		    pointRadius: 5,
		    pointHoverRadius: 15,
		    pointHitRadius: 30,
		    pointStyle: 'rectRounded',
		    borderDash: [2, 2]
		  };

		var dataThird = {
		    label: "Consumo saludable según la OMS",
		    data: [110,111,120,115,115,110,120],
		    lineTension: 0.1,
		    fill: false,
		    borderColor: '#00b849',
		    backgroundColor: 'transparent',
		    pointBorderColor: '#00b849',
		    pointBackgroundColor: '#00b849',
		    pointRadius: 5,
		    pointHoverRadius: 15,
		    pointHitRadius: 30,
		    pointBorderWidth: 2,
		    pointStyle: 'rectRounded',
		    borderDash: [2, 2]
		  };

		var data = {
		  labels: ["Enero", "Marzo", "Mayo", "Julio", "Septiembre", "Noviembre", "Diciembre"],
		  datasets: [dataFirst, dataSecond, dataThird]
		};


		var chartOptions = {

			title: {
						fontColor: 'aliceblue',
		        display: true,
		        text: 'Gasto de agua general (litros/Mes)',
		        fontSize: 18,
		        fontFamily: 'Roboto'
		    },
		 	legend: {
		    display: true,
		    position: 'bottom',
				padding: 10
		  }
		};

		var lineChart = new Chart(ctx, {
		  type: 'line',
		  data: data,
		  options: chartOptions,

		});
	}
}

}
