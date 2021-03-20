getDataStandings ();

function getDataStandings() {
    const url = "https://api.football-data.org/v2/competitions/2014/standings";
    fetch (url, {
        method: "GET",
        headers: {
            "X-Auth-Token": "2105e47ce0884944bd507939c0a66b68"
        }
    }).then(response => {
        if (response.ok) return response.json();

    }).then(data => {
        
        clasf(data.standings[0].table)
    });
}