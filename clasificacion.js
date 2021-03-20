 function clasf (clasificacion) {

    var tabla2 = document.getElementById("Clasificacion");

    for (i=0 ; i < clasificacion.length ; i++) {
        
        var fila = tabla2.insertRow(i)
        
        var posicion = fila.insertCell(0)
        posicion.innerHTML = `${clasificacion[i].position}`   

        var equipo = fila.insertCell(1)
        var NombreEquipo = document.createElement("div")
        NombreEquipo.innerHTML = `${clasificacion[i].team.name}`
        var logo = document.createElement("img")
        logo.src = `${clasificacion[i].team.crestUrl}`
        logo.style.width = "30px"
        logo.classList.add("logo")
        equipo.classList.add("align-middle", "equipo")
        NombreEquipo.prepend(logo)
        equipo.prepend(NombreEquipo)

        var botones = document.createElement("div")
        equipo.appendChild(botones)

        var chart = document.createElement("img")
        chart.src = "resources/icons-arrow-chart.png"
        chart.style.width = "20px"
        var a = document.createElement("a")
        const arr = [clasificacion[i].team.name].map(str => str.replace(/\s/g, ''));
        console.log(arr)
        a.href = "estadisticas.html" + "#" + arr
        a.classList.add("botones")
        a.appendChild(chart)
        botones.appendChild(a)

        var marcador = document.createElement("img")
        marcador.src = "resources/marcador.png"
        marcador.style.width = "20px"
        var a2 = document.createElement("a")
        a2.href = "partidos.html"
        a2.classList.add("botones")
        a2.appendChild(marcador)
        botones.appendChild(a2)

        var PJ = fila.insertCell(2)
        PJ.innerHTML = `${clasificacion[i].playedGames}`

        var PG = fila.insertCell(3)
        PG.innerHTML = `${clasificacion[i].won}`

        var PE = fila.insertCell(4)
        PE.innerHTML = `${clasificacion[i].draw}`

        var PP = fila.insertCell(5)
        PP.innerHTML = `${clasificacion[i].lost}`

        var GolesFavor = fila.insertCell(6)
        GolesFavor.innerHTML = `${clasificacion[i].goalsFor}`
    
        var GolesContra = fila.insertCell(7)
        GolesContra.innerHTML = `${clasificacion[i].goalsAgainst}`

        var GolesDif = fila.insertCell(8)
        GolesDif.innerHTML = `${clasificacion[i].goalDifference}`

        var Puntos = fila.insertCell(9)
        Puntos.innerHTML = `${clasificacion[i].points}`
    }
}

