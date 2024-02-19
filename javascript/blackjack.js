/*_________________________CAMBIAR FAVICON ALEATORIO CUANDO CARGA LA PÁGINA______________________________*/
function RandomFav(){
    //Toma un numero del 1 al 10, si es de 1 a 5 pondrá el favicon negro, de 5 a 10 el rojo, y si sale 0 el verde.
    
            if(numberR2>0 && numberR2<=5){
                favicon="imagenes/FaviconNegro.ico";
            }
    
                
            if(numberR2>5 && numberR2<=10){
                favicon="imagenes/FaviconRojo.ico";
            }
    
            if(numberR2==0){
                favicon="imagenes/FaviconVerde.ico";  
            }
    
        document.getElementById("fav").setAttribute("href",favicon); //Pone el favicon por el valor obtenido
     
    }

var numberR = (Math.random()*11); //numberR toma un valor aleatorio entre 1 y 10

var numberR2 = Math.floor(numberR); // numberR2 toma el valor de numberR1 y le quita los decimales

var favicon=" ";






/*_________________________VARIABLES GLOBALES______________________________*/
var dealerTotal = 0;
var tuTotal = 0;

var dealerACount = 0;
var yourACount = 0; 

var hidden;
var deck;

var canHit = true; //Permite al jugador pedir cartas mientras el valor de las que tiene no supere 21
var final =1;








/*_________________________FUNCION A EJECUTAR AL INICIAR LA PÁGINA______________________________*/
window.onload = function() {


    CrearBaraja();
    Barajar();
    startGame();
}





/*_________________________MONTAR LA BARAJA______________________________*/

function CrearBaraja() {

/*var hijosD = document.getElementById("dealerCartas").childElementCount;
var hijosT = document.getElementById("tusCartas").childElementCount;
console.log(" dealerCartas tiene", hijosD, "hijos. ","tusCartas tiene",hijosT);*/


    var valor = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    var tipo = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < tipo.length; i++) {
        for (let j = 0; j < valor.length; j++) {
            deck.push(valor[j] + "-" + tipo[i]); 
                                //↑↑Añade el tipo de carta a cada número, que corresponde con el nombre puesto en el css.
                                //↑↑Clubs/Diamond/Hearts/Swords
        }
    }
    console.log("Array de cartas: ",deck); //Esto es solo para comprobar que crea bien la baraja
}






/*_________________________BARAJAR LAS CARTAS_________________________________*/

function Barajar() {
    for (var i = 0; i < deck.length; i++) {
        var j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
            //↑↑Toma un valor aleatorio entre 1 y 52, pero como el Math.random trae decimales usa Math.floor para redondear.

        var temp = deck[i]; 
        deck[i] = deck[j];
        deck[j] = temp;
        //↑↑ Si temp=1 y deck[j]=12 (por ejemplo), cambiaría la carta de la posición 1 a la 12 y la carta de la 12 a la posición 1.
    }
    console.log("Esta es la baraja final: ",deck); //esto es solo para comprobar que baraja bien las cartas
}



/*_________________________FUNCIONAMIENTO DEL JUEGO_________________________________*/
function startGame() {
    //_____________________valor de la carta girada ↓-↓
    hidden = deck.pop();
    dealerTotal += getValue(hidden);
    dealerACount += checkAce(hidden);
    //____________________________________________  ↑-↑
    
    console.log("carta girada", hidden );
    console.log(dealerTotal, "valor de la carta");

    //____________Crea cartas para el dealer hasta que tengan un valor por encima de 17 ↓-↓
    while (dealerTotal < 17) {
        //<img src="imagenes/cards/4-C.png">
        var cardImg = document.createElement("img"); //crea un img caja
        var carta = deck.pop();
        cardImg.src = "imagenes/cards/" + carta + ".png";
        dealerTotal += getValue(carta);
        dealerACount += checkAce(carta);
        document.getElementById("dealerCartas").append(cardImg); //pone la imagen en el span a modo de un hijo usando DOM
    }
    console.log(dealerTotal, "total dealer");
    //________________________________________________________________________________ ↑-↑


    //_____________al iniciar se da al jugador dos cartas, de la misma manera que las crea para el dealer↓↓
    for (var i = 0; i < 2; i++) {
        var cardImg = document.createElement("img"); //crea una caja de "imagen"
        var carta = deck.pop();
        cardImg.src = "imagenes/cards/" + carta + ".png"; //escoje una imagen
        tuTotal += getValue(carta);
        yourACount += checkAce(carta);
        document.getElementById("tusCartas").append(cardImg); //introduce la imagen en "tuscartas"
    }

    console.log(tuTotal, "total jugador");



/*var hijosD = document.getElementById("dealerCartas").childElementCount;
var hijosT = document.getElementById("tusCartas").childElementCount;
console.log(" dealerCartas tiene", hijosD, "hijos. ","tusCartas tiene",hijosT);*/

    //________________________________________________________________________________ ↑-↑

    document.getElementById("Pedir").addEventListener("click", pedir);//escucha cuando clicas en "Pedir"
    document.getElementById("Plantarse").addEventListener("click", plantarse); //escucha cuando clicas en "Plantarse"
    document.getElementById("otra").addEventListener("click", otra); //escucha cuando clicas en "New Game"
}






//______________________TOMAR CARTAS_____________________________//
function pedir() {
    if (!canHit) { 
        return;
    }
    //crea cartas cada vez que damos click en pedir ↓-↓
    var cardImg = document.createElement("img");
    var carta = deck.pop();
    cardImg.src = "imagenes/cards/" + carta + ".png";
    tuTotal += getValue(carta);
    yourACount += checkAce(carta);
    document.getElementById("tusCartas").append(cardImg);
    console.log(tuTotal, "total jugador");

    if (reduceAce(tuTotal, yourACount) > 21) { //si el valor luego de considerar las A es mayor de 21 no te deja seguir pidiendo cartas
        canHit = false;
    }


/*var hijosD = document.getElementById("dealerCartas").childElementCount;
var hijosT = document.getElementById("tusCartas").childElementCount;
console.log(" dealerCartas tiene", hijosD, "hijos. ", "tusCartas tiene",hijosT);*/



}






//______________________PLANTARSE (FINALIZA EL JUEGO)____________________________//
function plantarse() {
    dealerTotal = reduceAce(dealerTotal, dealerACount);
    tuTotal = reduceAce(tuTotal, yourACount);


    canHit = false;
    document.getElementById("hidden").src = "imagenes/cards/" + hidden + ".png"; //cambia BACK.png por la carta cuyo valor corresponde.

    var mensage = "";
    if (tuTotal > 21) {
        mensage = "Perdiste!";
        final = 0;
    }
    else if (dealerTotal > 21) {
        mensage = "Ganaste!";
        final = 0;
    }
    //Ambos por debajo de 21
    else if (tuTotal == dealerTotal) {
        mensage = "Empate!";
        final = 0;
    }
    else if (tuTotal > dealerTotal) {
        mensage = "Ganaste!";
        final = 0;
    }
    else if (tuTotal < dealerTotal) {
        mensage = "Perdiste!";
        final = 0;
    }

    document.getElementById("dealerTotal").innerText = dealerTotal;
    document.getElementById("tuTotal").innerText = tuTotal;
    document.getElementById("resultado").innerText = mensage;
}






//______________________OBTENER EL VALOR DE LAS CARTAS________________________________//
function getValue(carta) {
    var data = carta.split("-"); // "4-C" -> ["4", "C"]
    var value = data[0];

    if (isNaN(value)) { // Comprueba si el primer caracter del nombre de la carta es un número o no
        if (value == "A") { //si no es número solo puede ser "A" (11), o "J,K,Q" (10)
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}





//________________________COMPROBAR "A"________________________________//
function checkAce(carta) {
    if (carta[0] == "A") { 
        return 1;
    }
    return 0;
}




//________________________TOMAR "A" COMO 1 O 11 SEGÚN EL MOMENTO_____________________________//
function reduceAce(tuTotal, yourACount) {
    while (tuTotal > 21 && yourACount > 0) { //si tienes algún A y el valor total de las cartas es mayor de 21
                                //cambia el valor de A de 11 a 1
        tuTotal -= 10;
        yourACount -= 1;
    }

    return tuTotal;
}




//______________________LIMPIAR LAS VARIABLES NECESARIAS Y IMÁGENES_________________________//
function limpiar(){
    var dealer = document.getElementById("dealerCartas"); 
    var jugador = document.getElementById("tusCartas");

            //Elimina las imágenes (borra la herencia). ↓-↓
while (dealer.hasChildNodes()) {
    dealer.removeChild(dealer.firstChild);
}
                    
while (jugador.hasChildNodes()) {
    jugador.removeChild(jugador.firstChild);
}

                    //Limpia marcadores. ↓-↓
    dealerTotal = 0; 
    tuTotal = 0;

    dealerACount = 0;
    yourACount = 0;

                    //Limpia el texto . ↓-↓
    document.getElementById("dealerTotal").innerText = "";
    document.getElementById("tuTotal").innerText = "";
    document.getElementById("resultado").innerText = "";

    canHit=true;

    /*var hijosD = document.getElementById("dealerCartas").childElementCount;
    var hijosT = document.getElementById("tusCartas").childElementCount;
    console.log(" dealerCartas tiene", hijosD, "hijos. ", "tusCartas tiene",hijosT);*/


    var cardImg = new Image();
    cardImg.setAttribute("id","hidden");
    cardImg.src = "imagenes/cards/BACK.png"; 
    document.getElementById("dealerCartas").append(cardImg); 


    //Vuelve a crear una caja imagen y le da la ruta de la imagen BACK.png
}




//______________________VUELVE A EJECUTAR TODO TRAS LIMPIAR_________________________//
function otra(){
    if(final == 0){

        limpiar();
        CrearBaraja();
        Barajar();
        //console.log("Valores tras repeticion", dealerACount," - ",dealerTotal," - ",yourACount," - ",tuTotal," - ",canHit," - ",hidden);
        startGame();
        
    }

}


