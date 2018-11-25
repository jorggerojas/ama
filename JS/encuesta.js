function btnSigEn(id) {
  var card = document.getElementById('card');
  var cues = document.getElementById('cuestionario');
  if(id == 1){
    if(card.style.display="block"){
      card.style.display="none";
      cues.style.display="block";

    }else{
      card.style.display="block";
      cues.style.display="none";
    }
  }else{
    if(card.style.display="none"){
      card.style.display="block";
      cues.style.display="none";

    }else{
      card.style.display="none";
      cues.style.display="block";
    }
  }
}

function getValues() {
  var p1 = document.getElementById('p1').value;
  var p2 = document.getElementById('p2').value;
  var p3 = document.getElementById('p3').value;
  var p4 = document.getElementById('p4').value;
  var p5 = document.getElementById('p5').value;
  var p6 = document.getElementById('p6').value;
  var p7 = document.getElementById('p7').value;
  var p8 = document.getElementById('p8').value;
  var p9 = document.getElementById('p9').value;
  var p10 = document.getElementById('p10').value;
  var res = 0;
  if(p1 != 'n' &&  p2 != 'n' &&  p3 != 'n' &&  p4 != 'n' &&
    p5 != 'n' &&  p6 != 'n' &&  p7 != 'n' &&  p8 != 'n' &&
    p9 != 'n' &&  p10 != 'n' && localStorage.getItem('Mail') != null){
      var mail = localStorage.getItem('Mail');
      var temp = parseInt(p1)+parseInt(p2)+parseInt(p3)+parseInt(p4)+
      parseInt(p5)+parseInt(p6)+parseInt(p7)+parseInt(p8)+
      parseInt(p9)+parseInt(p10);
      if(temp > 0 && temp < 16){
        res = temp + 130;
      }else if (temp > 15 && temp < 26) {
        res = temp + 200;
      }else if(temp > 25 && temp<= 36){
        res = temp + 350;
      }

      var link = "res="+res+"&mail="+mail+"&pun="+temp;

      data = new XMLHttpRequest();
      data.open('POST', "https://jorggerojas.000webhostapp.com/ama/quiz.php");
      data.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      data.send(link);
      data.onreadystatechange = function(){
        if (data.readyState == 4 && data.status == 200){
          us = data.responseText;
          //console.log(us);
          if(parseInt(us) == 1){
            entrada(1, res);
          }else if(parseInt(us) == 2){
            alert("Error al enviar respuestas, intenta más tarde");
          }else if(parseInt(us) == 3){
            alert("Lo sentimos, ya contestaste la encuesta");
          }else if (parseInt(us) == 4) {
            alert("Error al enviar respuestas, intenta más tarde");
          }else{
            alert("El servidor ha rechazado tus datos, intenta de nuevo");
          }
        }
      }

    }else{
      alert("Responde todas las respuestas");
    }
}

function entrada(id, res){
  if (id == 1) {
    localStorage.setItem('limite', res)
    window.location="inicio.html";
  }else {
    alert("Error al enviar respuestas, intenta más tarde");
  }
}
