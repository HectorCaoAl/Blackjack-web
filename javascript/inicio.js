/*_____________↓↓DEFINICION DE VARIABLES EXTERNAS↓↓______________*/

var numberR = (Math.random()*11); //numberR toma un valor aleatorio entre 1 y 10

var numberR2 = Math.floor(numberR); // numberR2 toma el valor de numberR1 y le quita los decimales

var favicon=" ";


/*_________________________FUNCION A EJECUTAR AL INICIAR LA PÁGINA______________________________*/
window.onload = function(){
    RandomFav();

}


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

