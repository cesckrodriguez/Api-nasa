console.log("Retroalimentaciones");

const llave = "zzIU0XFi5sOzgqpxHIjDMt6s0zCO0rR8bjgsl6gF";
const urlApi = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${llave}`

import fetch from "node-fetch";
//Hacemos la peticion a la api
const respuestaPeticionFetch = await fetch(urlApi);
//console.log(respuestaPeticionFetch);

//convertimos la respuesta a un formato json
const respuestaPeticionAJson = await respuestaPeticionFetch.json();
//console.log(respuestaPeticionAJson);

//pedimos informacion de los objetos retornados con una funcion object.keys forEach
const meteoritos = respuestaPeticionAJson.near_earth_objects

Object.keys(meteoritos).forEach((elemento, indice, arreglo)=>{
    //console.log(meteoritos[elemento][0]["id"]);//con esto estamos accediendo al apartado meteorito->+dia+posicion+id... meteoritos[elemento] es una lista de los meteoritos del dia
    //guardamos esa lista en una variable para despues recorrerla y mostrar si los meteoritos son potencialmente peligrosos
    let listaMeteoritos = meteoritos[elemento];
    for(let i=0; i<listaMeteoritos.length; i++){
        var metros = listaMeteoritos[i].estimated_diameter;
        console.log(metros);
        if(listaMeteoritos[i].is_potentially_hazardous_asteroid== true){
            console.log(`El meteorito ${listaMeteoritos[i].name} es Potencialmente peligroso y sus dimensiones en metros son: minimo- ${listaMeteoritos[i].estimated_diameter["meters"]["estimated_diameter_min"]}, maximo- ${listaMeteoritos[i].estimated_diameter["meters"]["estimated_diameter_max"]}`);
        }else{
            console.log(`El meteorito ${listaMeteoritos[i].name} no es potencialmente PELIGROSO y sus dimensiones en metros son: minimo- ${listaMeteoritos[i].estimated_diameter["meters"]["estimated_diameter_min"]}, maximo- ${listaMeteoritos[i].estimated_diameter["meters"]["estimated_diameter_max"]}`)
        }
    }
})

