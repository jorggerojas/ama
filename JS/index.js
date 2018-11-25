window.addEventListener('load', unset);

function unset() {
  localStorage.removeItem('Mail');
  localStorage.removeItem('nivel');
  localStorage.removeItem('timer');
}

function checkSeg(data) {
  var arr = ["<", ">", "'", "/", "*", "=", "!", "#", "{", "}", "+", "%", "&", "(", ")", "$"];
  for (var i = 0; i < arr.length; i++) {
    if(data.includes(arr[i])){
      return true;
    }else{
      return false;
    }
  }
}

function encuestaHecha(mail, pass) {
  var link = "mail="+mail+"&pass="+pass;
  data = new XMLHttpRequest();
  data.open('POST', "https://jorggerojas.000webhostapp.com/ama/selectUsuario.php");
  data.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  data.send(link);
  data.onreadystatechange = function(){
    if (data.readyState == 4 && data.status == 200){
      us = data.responseText;
      console.log(us);
      if(parseInt(us) == 1){
        window.location="inicio.html";
      }else{
        window.location="encuesta.html";
      }
    }
  }
}

function chaLogReg(id) {
  if(id != null && id != "" && id < 3 && id > 0){
    if(id == 2){
      var reg = document.getElementById('reg');
      reg.style.display="block";
    }else{
      var reg = document.getElementById('reg');
      reg.style.display="none";
    }
    if(id == 1){
      var log = document.getElementById('log');
      log.style.display="block";
    }else{
      var log = document.getElementById('log');
      log.style.display="none";
    }
  }else{
    alert("Error, intenta de nuevo");
  }
}

function intro(id){
  if(id != null && id != "" && id < 3 && id > 0){
    if(id == 1){
      var mail = document.getElementById('mail').value;
      var pass = document.getElementById('pass').value;
      if(mail != null && pass != null && mail != "" && pass != ""){
        if(!checkSeg(mail)){
          var link = "mail="+mail+"&pass="+pass;
          data = new XMLHttpRequest();
          data.open('POST', "https://jorggerojas.000webhostapp.com/ama/log.php");
          data.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          data.send(link);
          data.onreadystatechange = function(){
            if (data.readyState == 4 && data.status == 200){
              us = data.responseText;
              if(parseInt(us) == 1){
                localStorage.setItem('Mail', mail);
                encuestaHecha(mail, pass);
              }else{
                alert("Datos incorrectos, intenta de nuevo");
              }
            }
          }
        }else{
          alert("Veririca tus datos e intenta de nuevo");
        }
      }else{
          alert("Campos vacíos, verifica tus datos");
      }
    }else if(id ==2){
      var nombre = document.getElementById('nombre').value;
      var mail = document.getElementById('mailReg').value;
      var pass1 = document.getElementById('pass1').value;
      var pass2 = document.getElementById('pass2').value;
      if(nombre != null && nombre != "" && mail != null && mail != "" &&
          pass1 != null && pass1 != "" && pass2 != null && pass2 != ""){
            if(pass1 == pass2){
              if(!checkSeg(nombre) && !checkSeg(mail)){
                var link = "nombre="+nombre+"&mail="+mail+"&pass="+pass1;
                data = new XMLHttpRequest();
                data.open('POST', "https://jorggerojas.000webhostapp.com/ama/reg.php");
                data.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                data.send(link);
                data.onreadystatechange = function(){
                  if (data.readyState == 4 && data.status == 200){
                    us = data.responseText;
                    if(parseInt(us) == 1){
                      localStorage.setItem('Mail', mail);
                      window.location="encuesta.html";
                    }else{
                      alert("Error en servidor, intenta más tarde");
                    }

                  }
                }

              }else{
                alert("verifica tus datos e intenta de nuevo");
              }
            }else{
              alert("Las contraseñas no coinciden");
            }
      }else{
        alert("Campos vacíos, verifica tus datos");
      }
    }else{
      alert("Error, intenta de nuevo");
    }
  }else{
    alert("Error, verifica tus datos e intenta de nuevo");
  }
}
