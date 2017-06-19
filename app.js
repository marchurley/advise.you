//JQuery Prepare document
$(document).ready(function() {
  //arrays are in random order
  advice = shuffle(advice);
  image = shuffle(image);
  //arrays serve the first entry
  advice = serve(advice);
  image = serve(image);
  //show advice
  $("#advice").html(advice);
  //show background image
  $('.bg').css("background-image", "url(" + image + ")");
  //xmlhttp request to server - example google
  /*var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://hhomepage.com/adviceyou/connect.php", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      console.log(resp);
    }
  };
  xhr.send();*/



  //xmlhttp request to server -example ws3
  /*
  var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("txtHint").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET", "gethint.php?q=" + str, true);
        xmlhttp.send();*/




});

var advice = ["Testadvice1", "Testadvice2", "Testadvice3"];
var image = ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg"];



//////////////////////////////////////////


//Durstenfeld shuffle for random order
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
/////////////////////////////////////////

//Serve in order
function serve(array) {
  for (var i = 0; i < array.length; i++) {
    return array[i];
  }
}
//////////////////////////////////////////
