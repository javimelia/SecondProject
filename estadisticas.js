function posicionLiga (equipos, clasificacion) {
    
    for (j=0; j < clasificacion.length; j++) {
        if (equipos[i].id == clasificacion[j].team.id) {
            var Posicion = `${clasificacion[j].position}`
        }
    }

    return(Posicion)
}


function forma(clasificacion, j) {

    for (let k=0 ; k <= 8; k+=2) {

        UltPart1 = document.createElement("div")

        if (clasificacion[j].form[k] === "W") {
            UltPart1.innerHTML = "G"
            UltPart1.classList.add("formaGanado")
        }
        else if (clasificacion[j].form[k] === "D") {
            UltPart1.innerHTML = "E"
            UltPart1.classList.add("formaEmpatado")
        }
        else {
            UltPart1.innerHTML = "P"
            UltPart1.classList.add("formaPerdido")
        }
        
        UltPart.appendChild(UltPart1)
    }
}


function calculoPartidos1 (clasificacion, j) {

    CalcPerGanados = (`${clasificacion[j].won}` / `${clasificacion[j].playedGames}`) * 100
    pGanados = document.createElement("div")
    pGanados.innerHTML = CalcPerGanados.toFixed(0) + "%"
    porcentajes.appendChild(pGanados)

    CalcPerEmpatados = (`${clasificacion[j].draw}` / `${clasificacion[j].playedGames}`) * 100
    pEmpatados = document.createElement("div")
    pEmpatados.innerHTML = CalcPerEmpatados.toFixed(0)+"%"
    porcentajes.appendChild(pEmpatados)

    CalcPerPerdidos = (`${clasificacion[j].lost}` / `${clasificacion[j].playedGames}`) * 100
    pPerdidos = document.createElement("div")
    pPerdidos.innerHTML = CalcPerPerdidos.toFixed(0)+"%"
    porcentajes.appendChild(pPerdidos)
}


function connect_equiposClasificacion (equipos, clasificacion) {
    for (let j=0; j < clasificacion.length; j++) {
        if ( equipos[i].id == clasificacion[j].team.id) {

            posicionLiga (equipos, clasificacion)
            forma(clasificacion, j)
            calculoPartidos1 (clasificacion, j)

        }
    }
}


function connect_equiposPartido (equipos, partido) {
    
    var CalcGolesLocal = 0
    var temp2 = 0
    var temp3 = 0


    for (let l=0; l < partido.length; l++) {
        if (equipos[i].id == partido[l].homeTeam.id && partido[l].status == "FINISHED") {

            var temp = partido[l].score.fullTime.homeTeam
            CalcGolesLocal += temp
            temp2 += 1
            
        
            if (partido[l].score.winner == "HOME_TEAM" ) {
                temp3 += 1
            }
        
            ResultPartidosGanados = (temp3 / temp2) * 100
            PartidosGanadosLocal.innerHTML = "Como local: " + ResultPartidosGanados.toFixed(2) + "%"
        
            ResultGolesPartidoLocal = CalcGolesLocal / temp2
            GolesMarcadosLocal.innerHTML = "Como local: " + ResultGolesPartidoLocal.toFixed(2) + " goles"

        }
    }
}


function estadisticas (equipos, clasificacion, partido) {

    var standings = document.getElementById("caja")

    for (i=0; i < equipos.length; i++) {

        equipo = document.createElement("div")
        equipo.classList.add("recuadro")
        standings.appendChild(equipo)

        a = document.createElement("a")
        var arr2 = [equipos[i].name].map(str => str.replace(/\s/g, ''));
        a.id = arr2
        equipo.prepend(a)
        
        logo = document.createElement("img")
        logo.src = `${equipos[i].crestUrl}`
        logo.style.width = "120px"
        equipo.appendChild(logo)

        info = document.createElement("div")
        info.classList.add("info")
        equipo.appendChild(info)

        encabezado = document.createElement("div")
        encabezado.classList.add("encabezado")
        info.appendChild(encabezado)

        nombre = document.createElement("div")
        nombre.innerHTML = `${equipos[i].name}`
        nombre.classList.add("nombre")
        encabezado.appendChild(nombre)

        apodo = document.createElement("div")
        apodo.innerHTML = "Apodo: " + `${equipos[i].shortName}`
        apodo.classList.add("apodo")
        nombre.appendChild(apodo)

        datos = document.createElement("div")
        info.appendChild(datos)

        otrosDatos = document.createElement("div")
        otrosDatos.classList.add("otrosDatos")
        encabezado.appendChild(otrosDatos)

        posLiga = document.createElement("div")
        
        posLiga.innerHTML = "Pos: " + posicionLiga(equipos, clasificacion)
        posLiga.classList.add("otrosDatosContent")
        otrosDatos.appendChild(posLiga)

        estadio = document.createElement("div")
        estadioValue = `${equipos[i].venue}`
        estadioValueFinal = estadioValue.replace("Estadio de ", "").replace("Estadio ", "")
        estadio.innerHTML = "Estadio: " + estadioValueFinal.charAt(0).toUpperCase() + estadioValueFinal.slice(1)
        estadio.classList.add("otrosDatosContent")
        otrosDatos.appendChild(estadio)

        UltPart = document.createElement("div")
        UltPart.classList.add("forma")
        encabezado.appendChild(UltPart)

        TitulosPartidos = document.createElement("div")
        TitulosPartidos.classList.add("TitulosPartidos")
        datos.appendChild(TitulosPartidos)

        PartidosGanados = document.createElement("div")
        PartidosGanados.innerHTML = "Ganados"
        TitulosPartidos.appendChild(PartidosGanados)

        PartidosEmpatados = document.createElement("div")
        PartidosEmpatados.innerHTML = "Empatados"
        TitulosPartidos.appendChild(PartidosEmpatados)

        PartidosPerdidos = document.createElement("div")
        PartidosPerdidos.innerHTML = "Perdidos"
        TitulosPartidos.appendChild(PartidosPerdidos)

        porcentajes = document.createElement("div")
        porcentajes.classList.add("porcentajes")
        datos.appendChild(porcentajes)

        connect_equiposClasificacion (equipos, clasificacion)

        PorcentajesLocalVisitante = document.createElement("div")
        datos.appendChild(PorcentajesLocalVisitante)

        PartidosGanadosLocal = document.createElement("div")
        PorcentajesLocalVisitante.appendChild(PartidosGanadosLocal)

        GolesMarcados = document.createElement("div")
        GolesMarcados.classList.add("goles")
        datos.appendChild(GolesMarcados)

        GolesMarcadosLocal = document.createElement("div")
        GolesMarcados.appendChild(GolesMarcadosLocal)

        connect_equiposPartido (equipos, partido)

        
        
    }

    var scroll = location.hash
    var res = scroll.replace("#","")
    var element = document.getElementById(res)
    var elementPosition = element.getBoundingClientRect().top
    var offsetPosition = elementPosition - 100
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
   });
}

