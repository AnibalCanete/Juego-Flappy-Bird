
document.addEventListener("DOMContentLoaded", () => {
    const ave = document.querySelector(".ave");
    const juegoDisplay = document.querySelector(".contenedor-juego");
    const suelo = document.querySelector(".suelo-movil");

    let aveIzquierda = 220;
    let aveAbajo = 100;
    let gravedad = 3;
    let juegoTerminado = false;
    let brecha = 430;

    function iniciarJuego() {
        aveAbajo -= gravedad;
        ave.style.bottom = aveAbajo + "px";
        ave.style.left = aveIzquierda + "px";
    }

    let temporizadorJuegoID = setInterval(iniciarJuego, 20);

    function control(e) {
        if (e.keyCode === 32) {
            saltar();
        }
    }

    function saltar() {
        if (aveAbajo < 500) aveAbajo += 50;
        ave.style.bottom = aveAbajo + "px";
        console.log(aveAbajo);
    }

    document.addEventListener("keyup", control);

    function generarObstaculo() {
        let obstaculoIzquierdo = 500;
        let alturaAleatoria = Math.random() * 60;
        let obstaculoAbajo = alturaAleatoria;
        const obstaculo = document.createElement("div");
        const obstaculoArriba = document.createElement("div");
        if (!juegoTerminado) {
            obstaculo.classList.add("obstaculo");
            obstaculoArriba.classList.add("obstaculo-arriba");
        }
        juegoDisplay.appendChild(obstaculo);
        juegoDisplay.appendChild(obstaculoArriba);
        obstaculo.style.left = obstaculoIzquierdo + "px";
        obstaculoArriba.style.left = obstaculoIzquierdo + "px";
        obstaculo.style.bottom = obstaculoAbajo + "px";
        obstaculoArriba.style.bottom = obstaculoAbajo + brecha + "px";

        function moverObstaculo() {
            obstaculoIzquierdo -=2;
            obstaculo.style.left = obstaculoIzquierdo + "px";
            obstaculoArriba.style.left = obstaculoIzquierdo + "px";

            if (obstaculoIzquierdo === -60) {
                clearInterval(temporizadorID);
                juegoDisplay.removeChild(obstaculo);
                juegoDisplay.removeChild(obstaculoArriba);
            }

            if (
                obstaculoIzquierdo > 200 && obstaculoIzquierdo < 280 && aveIzquierda === 220 &&
                (aveAbajo < obstaculoAbajo + 153 || aveAbajo > obstaculoAbajo + brecha - 200) ||
                aveAbajo === 0
            ) {
                finDelJuego();
                clearInterval(temporizadorID);
            }
        }

        let temporizadorID = setInterval(moverObstaculo, 20);
        if (!juegoTerminado) setTimeout(generarObstaculo, 3000);
    }

    generarObstaculo();

    function finDelJuego() {
        clearInterval(temporizadorJuegoID);
        console.log("Fin del Juego");
        juegoTerminado = true;
        document.removeEventListener("keyup", control);
        suelo.classList.add("suelo");
        suelo.classList.remove("suelo-movil");
    }

});
