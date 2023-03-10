//import fetch from "node-fetch";     //needs to be included to test with Ponicode

export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}



export async function getObservationFromApiById(id: string){
    let data = `{"RegId": ${id}}`
    let response = await fetch('https://api.regobs.no/v5/Search', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let json = await response.json();
  return json[0]["RegId"];
  
  }

  export async function getObservationFromApiByLanguageAndType(type: string, language: string){
    let geoHazardId = getGeoHazardIdFromName(type);
    let langKey = getLangKeyFromName(language);
    let data = `{"SelectedGeoHazards": [${geoHazardId}], "LangKey": ${langKey}}`
      let response = await fetch('https://api.regobs.no/v5/Search', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let json = await response.json();
    return json[0]["GeoHazardName"];
    
    }

    export async function getObservationsFromApiByTypeAmountAndLanguage(type: string, num: number, language: string){
      let geoHazardId = getGeoHazardIdFromName(type);
      let langKey = getLangKeyFromName(language);
      let data = `{"NumberOfRecords": ${num}, "SelectedGeoHazards": [${geoHazardId}], "LangKey": ${langKey}}`
        let response = await fetch('https://api.regobs.no/v5/Search', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let json = await response.json();
      return json[1]["GeoHazardName"];
      
      }

export function getGeoHazardIdFromName(hazardName: string) {
  switch (hazardName){
    case "Snow": {
      return 10
    }
    case "Dirt": {
      return 20
    }
    case "Water": {
      return 60
    }
    case "Ice": {
      return 70
    }

  } }

  export function getLangKeyFromName(language: string){
    switch (language){
      case "en": {
        return 2
      }
      case "nb": {
        return 1
      }
      case "de": {
        return 3
      }
      case "sl": {
        return 4
      }
      case "it": {
        return 6
      }
      case "sv": {
        return 5
      }
      case "nn": {
        return 7
      }
      case "fr": {
        return 8
      }
      case "da": {
        return 9
      }
    }
  }


