var dataPart

function DataPartidos() {
    const url = "https://api.football-data.org/v2/competitions/2014/matches";
    fetch (url, {
        method: "GET",
        headers: {
            "X-Auth-Token": "2105e47ce0884944bd507939c0a66b68"
        }
    }).then(response => {
        if (response.ok) return response.json();

    }).then(data => {
        
        dataPart = data
        
        DataStandings()
        
    });
}

var dataClasf

function DataStandings() {
    const url = "https://api.football-data.org/v2/competitions/2014/standings";
    fetch (url, {
        method: "GET",
        headers: {
            "X-Auth-Token": "2105e47ce0884944bd507939c0a66b68"
        }
    }).then(response => {
        if (response.ok) return response.json();

    }).then(data => {
        
        dataClasf = data
        
        DataEquipos ()
    });
}

function DataEquipos () {
    const url = "https://api.football-data.org/v2/competitions/2014/teams";
    fetch (url, {
        method: "GET",
        headers: {
            "X-Auth-Token": "2105e47ce0884944bd507939c0a66b68"
        }
    })
    .then(response => {
        if (response.ok) return response.json();        
    
    }).then(data => {
        
        estadisticas (data.teams, dataClasf.standings[0].table, dataPart.matches)
    });
}

DataPartidos()

