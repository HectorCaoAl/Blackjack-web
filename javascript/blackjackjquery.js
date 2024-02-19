/*_________________________________AL INICIAR LA PÁGINA______________________________*/
var open = false;
var apuesta = 0;

$(document).ready(function(){
    sacardatos();
    $('.owl-carousel').owlCarousel();
    $("#jugadores").hide(100);
    $("#apuesta").hide();
    $("#jugadores").append("<p id= apuesta> Has apostado: "+apuesta+" euros<p>")

    $("#tablatop").click(function(){
        if (open == false){
            $("#jugadores").show(1000);
            $("#apuesta").show(1000);
            $("#tablatop").css("background-color", "grey");
            $("#tablatop").css("color", "rgb(139, 55, 55)");
            open = true;
        }
        else{
            $("#jugadores").hide(1000);
            $("#apuesta").hide(1000);
            $("#tablatop").css("background-color", "rgb(139, 55, 55)");
            $("#tablatop").css("color", "whitesmoke");
            open = false;
        }
    });


     /*_________________________________PONER TUS RESULTADOS______________________________*/
    $("#Plantarse").click(function(){
        apuestaNueva= parseInt($("#spinner")[0].attributes[2].nodeValue);
        apuesta = apuesta+ apuestaNueva;


        apuesta = toNum(apuesta);
        apuestaNueva= toNum(apuestaNueva);
        console.log(apuesta, apuestaNueva);
        $("#apuesta").text("Has apostado: "+apuesta+" euros");
    })



     /*_________________________________CALAVERA______________________________*/
    $('#Pedir').click(function(){
            $("#calavera").attr("src","imagenes/calavera2.jpg");
            setTimeout(() => { $("#calavera").attr("src","imagenes/calavera1.jpg");  }, 1000);
            

                    
    })
    });

/*___________________________________TRAER POR AJAX UN ARCHIVO JSON_________________________________*/
function sacardatos(datos, idDiv) {
    datos = "json/jugadores.json";
    idDiv = "jugadores";
    if (window.XMLHttpRequest) {
        XMLHttpRequestObject = new XMLHttpRequest();
    }
    console.log("entra a sacardatos");
    if (XMLHttpRequestObject) {
        console.log("entra al primer bucle");
        var lugar = document.getElementById(idDiv);
        XMLHttpRequestObject.open("GET", datos);
        XMLHttpRequestObject.onreadystatechange = function () {

            if (XMLHttpRequestObject.readyState == 4 &&
                XMLHttpRequestObject.status == 200) {

                var objetoJson=JSON.parse(XMLHttpRequestObject.responseText)
                for (var i = 0; i < objetoJson.length; i++) {
                    var nombre = objetoJson[i].nombre;
                    var cantidad = objetoJson[i].cantidad;
                    lugar.innerHTML+= "<ul class='ulListJugadores'> <li> <strong>"+nombre+ " Ha ganado </strong> </li> </ul>"+"<ul class='ulListJugadores' > <li> <strong> "+cantidad+" euros</strong> "+"</li> </ul> " ;
                    
                }
            }
        }
        XMLHttpRequestObject.send(null);
    }
}

/*___________________________________PASAR A INT, POR ALGUNA RAZÓN JQUERY NO ACEPTA parseInt()_________________________________*/
function toNum(dato) {
    var a = parseInt(dato);
    return(a);
}