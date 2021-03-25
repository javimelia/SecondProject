function filtro (partido) {

    // Recoger valor del input rexto y estandarizarlo: poner en minúsculas y sin acentos

    var input = document.getElementById("inputText")
    var filter = input.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")

    // Crear arrays nuevos para los filtros de texto y de resultado

    var PartFiltrados = []
    var ganados = []
    var perdidos = []
    var empatados = []
    var porjugar = []

    // Llamar a la función que elimina el texto "No se han encontrado coincidencias" cuando no hay partidos que mostrar

    QuitarSinResultado ()

    // Se muestra la tabla entera si no hay nada escrito en el input o se lleva a cabo el filtrado

    if (filter === "") {
        partidos(partido)
        
    }
    else {

        // Habilitar botón para quitar filtros actuales

        document.getElementById("reset").disabled = false

        for (i = 0; i < partido.length; i++) {

            // Comprobar si hay alguna coincidencia entre el valor del input y la data, una vez estandarizada. 
            // Primero se coteja con el nombre del equipo local y luego el visitante

            if (partido[i].homeTeam.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(filter) > -1) {

                // Si existe una coincidencia se añade el partido al array PartFiltrados

                PartFiltrados.push(partido[i])

                // Según el resultado del partido para el equipo local, se añade el partido al array correspondiente
                // Al existir al menos un partido que cumple esta condición, se habilita el filtro

                if (partido[i].score.winner === "HOME_TEAM") {

                    ganados.push(partido[i])
                    document.getElementById("SoloGanados").disabled = false
                }

                if (partido[i].score.winner === "AWAY_TEAM") {

                    perdidos.push(partido[i])
                    document.getElementById("SoloPerdidos").disabled = false
                }

                if (partido[i].score.winner === "DRAW") {
                    empatados.push(partido[i])
                    document.getElementById("SoloEmpatados").disabled = false
                }

                if (partido[i].status === "SCHEDULED") {
                    porjugar.push(partido[i])
                    document.getElementById("PorJugar").disabled = false
                }

            }

            // Mismo procedimiento para buscar coincidencias con el nombre del equipo visitante y llenar los arrays

            if (partido[i].awayTeam.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(filter) > -1) {

                PartFiltrados.push(partido[i])

                if (partido[i].score.winner === "AWAY_TEAM") {

                    ganados.push(partido[i])
                    document.getElementById("SoloGanados").disabled = false
                }
                if (partido[i].score.winner === "HOME_TEAM") {

                    perdidos.push(partido[i])
                    document.getElementById("SoloPerdidos").disabled = false
                }
                if (partido[i].score.winner === "DRAW") {
                    empatados.push(partido[i])
                    document.getElementById("SoloEmpatados").disabled = false
                }
                if (partido[i].status === "SCHEDULED") {
                    porjugar.push(partido[i])
                    document.getElementById("PorJugar").disabled = false
                }

            }
        }
    
        // Se muestra el array con los partidos filtrados una vez se acabó de comprobar todos los partidos

        partidos(PartFiltrados)

        // Si no se ha llegado a encontrar ninguna coincidencia, se llama a la función que muestra que no hay resultados

        if (PartFiltrados.length == "0") {
            sinResultado ()
        }
    }


    // Se asigna una función a cada input radio para que al ser clicados muestren sus correspondientes arrays

    document.getElementById("SoloGanados").addEventListener("click", function () {
        QuitarSinResultado ()
        if (ganados.length == "0") {
            sinResultado ()
        }
        else {
            partidos(ganados)
            document.getElementById("reset").disabled = false
        }
    })
     
    document.getElementById("SoloEmpatados").addEventListener("click", function () {
        QuitarSinResultado ()
        if (empatados.length == "0") {
            sinResultado ()
        }
        else {
            partidos(empatados)
            document.getElementById("reset").disabled = false
        }
    })
    document.getElementById("SoloPerdidos").addEventListener("click", function () {
        QuitarSinResultado ()
        if (perdidos.length == "0") {
            sinResultado ()
        }
        else {
            partidos(perdidos)
            document.getElementById("reset").disabled = false
        }
    })
    document.getElementById("PorJugar").addEventListener("click", function () {
        QuitarSinResultado ()
        if (porjugar.length == "0") {
            sinResultado ()
        }
        else {
            partidos(porjugar)
            document.getElementById("reset").disabled = false
        }
    })
}

function QuitarSinResultado () {
    if (document.getElementById("sinResultado") != null) {
        document.getElementById("sinResultado").remove()
    }
}

function sinResultado () {
    document.getElementById("Tabla").innerHTML = ""
    var sinResultado = document.createElement("div")
    sinResultado.innerHTML = "No se han encontrado resultados"
    sinResultado.id = "sinResultado"
    sinResultado.classList.add("sinResultado")
    document.getElementById("cuerpo").appendChild(sinResultado)
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



