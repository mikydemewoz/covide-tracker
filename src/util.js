import React,{useState, useEffect} from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";


export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a,b) => (a.cases>b.cases ? -1 : 1));
    
}

// draw the circles

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000,
    },
  };

export const showDataOnMap = (data, casesType = "cases") => {
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat,country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
              }
        >
            <Popup>
                <h1>I am a popup</h1>
            </Popup>
        </Circle>
    ));
} 