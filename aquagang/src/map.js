let costa = [
    {lat: -43.416667, lng:  11},
    {lat:  43.416667, lng:  11},
    {lat: -43.416667, lng: -11} 
    ];

let poly;

function myMap() {
    
    poly = new google.maps.Polygon({
        path:costa,
        strokeColor:"#000000",
        strokeOpacity:1,
        strokeWeight:2,
        fillColor:"#aadaff",
        fillOpacity:2
    });

    setTimeout(updateMap, 2000);

    let map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

    poly.setMap(map);
}

function updateMap(){
    addPoint({lat: 43, lng:  11.416667});
    //costa[1].lat += 0.01;
    poly.setPath(costa);
}

//Aggiunge un punto all'array costa in modo tale che sia messo tra i 2 punti piu vicini (Prototipo)
function addPoint(newPoint){
    let costaQ = []
    for(let i=0; i<costa.length; i++){
        let dist = costa[i].lat^2 + costa[i].lng^2; 
        costaQ.push(dist);
    }
    
    let distSum = [];
    for(let i=0; i<costaQ.length; i++){
        distSum.push(costaQ[i] + costaQ[(i+1)%costaQ.length]);
    }

    //Scegli l'indice di inserimento
    let index = Math.min(distSum);
    costa.splice(index, 0, newPoint);
}