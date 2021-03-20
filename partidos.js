function filtro(partido) {

    var input = document.getElementById("inputText")
    var filter = input.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")

    var PartFiltrados = []
    var ganados = []
    var perdidos = []
    var empatados = []
    var porjugar = []

    if (document.getElementById("sinResultado") != null) {
        document.getElementById("sinResultado").remove()
    }

    if (filter === "") {
        partidos(partido)
    }
    else {

        document.getElementById("reset").disabled = false

        for (i = 0; i < partido.length; i++) {

            if (partido[i].homeTeam.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(filter) > -1) {

                PartFiltrados.push(partido[i])

                if (partido[i].score.winner === "HOME_TEAM") {

                    ganados.push(partido[i])

                }

                if (partido[i].score.winner === "AWAY_TEAM") {

                    perdidos.push(partido[i])
                }

                if (partido[i].score.winner === "DRAW") {
                    empatados.push(partido[i])
                }

                if (partido[i].status === "SCHEDULED") {
                    porjugar.push(partido[i])
                }

            }

            if (partido[i].awayTeam.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(filter) > -1) {

                PartFiltrados.push(partido[i])

                if (partido[i].score.winner === "AWAY_TEAM") {

                    ganados.push(partido[i])

                }
                if (partido[i].score.winner === "HOME_TEAM") {

                    perdidos.push(partido[i])
                }
                if (partido[i].score.winner === "DRAW") {
                    empatados.push(partido[i])
                }
                if (partido[i].status === "SCHEDULED") {
                    porjugar.push(partido[i])
                }

            }
        }

        partidos(PartFiltrados)
        document.getElementById("SoloGanados").addEventListener("click", function () {
            partidos(ganados)
            document.getElementById("reset").disabled = false
        })

        if (PartFiltrados.length > 0) {

            
           
            document.getElementById("SoloEmpatados").addEventListener("click", function () {
                partidos(empatados)
                document.getElementById("reset").disabled = false
            })
            document.getElementById("SoloPerdidos").addEventListener("click", function () {
                partidos(perdidos)
                document.getElementById("reset").disabled = false
            })
            document.getElementById("PorJugar").addEventListener("click", function () {
                partidos(porjugar)
                document.getElementById("reset").disabled = false
            })

        }

        else {
            document.getElementById("Tabla").innerHTML = ""
            
            var sinResultado = document.createElement("div")
            sinResultado.innerHTML = "No se han encontrado resultados"
            sinResultado.id = "sinResultado"
            sinResultado.classList.add("sinResultado")
            document.getElementById("cuerpo").appendChild(sinResultado)
        }

    }

}

function reset() {
    document.getElementById("inputText").value = ""
    getDataPartidos()
    document.getElementById("SoloGanados").checked = false
    document.getElementById("SoloEmpatados").checked = false
    document.getElementById("SoloPerdidos").checked = false
    document.getElementById("PorJugar").checked = false
}

function partidos(partido) {

    var tablita = document.getElementById("Tabla");
    tablita.innerHTML = ""

    for (i = 0; i < partido.length; i++) {

        /* Insertar una fila en la tabla con cada loop */
        var nuevaFila = tablita.insertRow(i);
        nuevaFila.id = "Fila" + i

        /* Insertar jornada del partido*/

        var jornada = nuevaFila.insertCell(0);
        jornada.innerHTML = "J - " + `${partido[i].matchday}`
        jornada.classList.add("jornada", "align-middle")

        /* Condicional según si el partido ha finalizado */
        if (partido[i].status !== "SCHEDULED") {

            /*Partido finalizado*/
            /* Añadir nombre equipo local y su logo (delante) */
            var local = nuevaFila.insertCell(1);
            local.innerHTML = `${partido[i].homeTeam.name}`
            var logo = document.createElement("img")
            logo.src = "https://crests.football-data.org/" + `${partido[i].homeTeam.id}` + ".svg"
            logo.style.width = "30px"
            local.classList.add("align-middle")
            local.prepend(logo)

            /*Goles Local*/
            var golesLocal = nuevaFila.insertCell(2);

            /* Condicional para añadir (p) dentro de un div a los partidos acabados en penaltis */
            if (partido[i].score.duration == "PENALTY_SHOOTOUT" && partido[i].score.winner == "HOME_TEAM") {
                var finalPenaltis = document.createElement("div")
                finalPenaltis.classList.add("penaltis")
                finalPenaltis.innerHTML = "(p)"
                golesLocal.classList.add("GolPentalti", "align-middle")
                golesLocal.innerHTML = `${partido[i].score.fullTime.homeTeam}`;
                golesLocal.appendChild(finalPenaltis)
            } else {
                golesLocal.innerHTML = `${partido[i].score.fullTime.homeTeam}`
                golesLocal.classList.add("align-middle")
            }

            /* Linea entre goles tamaño 2 columnas */
            var linea = nuevaFila.insertCell(3);
            linea.innerHTML = "-"
            linea.classList.add("align-middle")
            linea.colSpan = "2"

            /* Condicional para añadir (p) dentro de un div a los partidos acabados en penaltis */
            var golesVisitante = nuevaFila.insertCell(4);
            if (partido[i].score.duration == "PENALTY_SHOOTOUT" && partido[i].score.winner == "AWAY_TEAM") {
                var finalPenaltis = document.createElement("div")
                finalPenaltis.classList.add("penaltis", "align-middle")
                finalPenaltis.innerHTML = "(p)"
                golesVisitante.classList.add("GolPentalti")
                golesVisitante.innerHTML = `${partido[i].score.fullTime.awayTeam}`;
                golesVisitante.appendChild(finalPenaltis)
            } else {
                golesVisitante.innerHTML = `${partido[i].score.fullTime.awayTeam}`
                golesVisitante.classList.add("align-middle")
            }

            /* Nombre equipo visitante y su logo (delante) */
            var visitante = nuevaFila.insertCell(5);
            visitante.innerHTML = `${partido[i].awayTeam.name}`
            visitante.classList.add("align-middle")
            var logo = document.createElement("img")
            logo.src = "https://crests.football-data.org/" + `${partido[i].awayTeam.id}` + ".svg"
            logo.style.width = "30px"
            visitante.prepend(logo)

            /* Añadir clase "ganador" a los elementos según quien haya ganado */
            if (partido[i].score.winner == "HOME_TEAM") {
                local.classList.add("ganador")
                golesLocal.classList.add("ganador")
            } else if (partido[i].score.winner == "AWAY_TEAM") {
                golesVisitante.classList.add("ganador")
                visitante.classList.add("ganador")
            } else {
                local.classList.add("ganador")
                golesLocal.classList.add("ganador")
                golesVisitante.classList.add("ganador")
                visitante.classList.add("ganador")
            }

        } else {

            /* Añadir nombre equipo local */
            var local = nuevaFila.insertCell(1);
            local.innerHTML = `${partido[i].homeTeam.name}`
            local.classList.add("align-middle")
            var logo = document.createElement("img")
            logo.src = "https://crests.football-data.org/" + `${partido[i].homeTeam.id}` + ".svg"
            logo.style.width = "30px"
            local.classList.add("align-middle")
            local.prepend(logo)

            /* Si el partido no ha finalizado, juntar 4 columnas e indicar "No disputado" */
            var noFinalizado = nuevaFila.insertCell(2)
            noFinalizado.colSpan = "4"
            noFinalizado.innerHTML = "Por disputar"

            /* Llamar a la función fecha para mostrar cuando se celebra el encuentro */
            var fecha = document.createElement("div")
            fecha.innerHTML = fechaPartido(partido)
            noFinalizado.appendChild(fecha)

            /* Añadir clase a "No disputado" y "Fecha" */
            noFinalizado.classList.add("noFinalizado")
            noFinalizado.classList.add("align-middle")
            fecha.classList.add("fecha")

            /* Nombre equipo visitante pero con diferente posición de la celda que se crea */
            var visitante = nuevaFila.insertCell(3);
            visitante.innerHTML = `${partido[i].awayTeam.name}`;
            visitante.classList.add("align-middle")
            var logo = document.createElement("img")
            logo.src = "https://crests.football-data.org/" + `${partido[i].awayTeam.id}` + ".svg"
            logo.style.width = "30px"
            visitante.prepend(logo)
        }
    }
}

function fechaPartido(partido) {

    var date = new Date(partido[i].utcDate)
    var dd = date.getDate()
    var mm = date.getMonth() + 1
    var yyyy = date.getFullYear()
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }

    var dia = dd + '/' + mm + '/' + yyyy
    return (dia)
}



