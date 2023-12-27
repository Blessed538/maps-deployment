// import React, { useState, useEffect, useRef } from "react";
import {
  GET_STATE_NAME,
  GET_STATE_TOTAL_SCORES,
  GET_CURRENT_INDICATOR,
} from "../../../../reducers/reports";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

var mapStyle = [
  {
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#040620" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#bfd4ff" }],
  },
];

let map;
let censusMin = Number.MAX_VALUE,
  censusMax = -Number.MAX_VALUE;

const GoogleMap2 = () => {
  const dispatch = useDispatch();

  const initMap = () => {
    const google = window.google;

    // load the map
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 9.037, lng: 7.365 },
      zoom: 5.7,
      styles: mapStyle,
    });

    // set up the style rules and events for google.maps.Data
    map.data.setStyle(styleFeature);
    map.data.addListener("mouseover", mouseInToRegion);
    map.data.addListener("mouseout", mouseOutOfRegion);
    // wire up the button
    const selectBox = document.getElementById("census-variable");

    google.maps.event.addDomListener(selectBox, "change", () => {
      clearCensusData();
      loadCensusData(selectBox.options[selectBox.selectedIndex].value);
      dispatch({
        type: GET_CURRENT_INDICATOR,
        payload: selectBox.options[selectBox.selectedIndex].label,
      });
    });
    // state polygons only need to be loaded once, do them now
    loadMapShapes();
  };

  window.initMap = initMap;
  const mouseInToRegion = (e) => {
    // set the hover state so the setStyle function can change the border
    e.feature.setProperty("name_1", "hover");

    const percent =
      ((e.feature.getProperty("census_variable") - censusMin) /
        (censusMax - censusMin)) *
      100;

    // update the label
    document.getElementById("data-label").textContent =
      e.feature.getProperty("NAME_1");
    dispatch({
      type: GET_STATE_NAME,
      payload: (document.getElementById("data-label").textContent =
        e.feature.getProperty("NAME_1")),
    });
    document.getElementById("data-value").textContent = e.feature
      .getProperty("census_variable")
      .toLocaleString();

    dispatch({
      type: GET_STATE_TOTAL_SCORES,
      payload: (document.getElementById("data-value").textContent = e.feature
        .getProperty("census_variable")
        .toLocaleString()),
    });

    document.getElementById("data-box").style.display = "block";
    document.getElementById("data-caret").style.display = "block";
    document.getElementById("data-caret").style.paddingLeft = percent + "%";
  };

  const mouseOutOfRegion = (e) => {
    // reset the hover state, returning the border to normal
    e.feature.setProperty("name_1", "normal");
  };

  const loadMapShapes = () => {
    const google = window.google;

    map.data.loadGeoJson(
      // "https://storage.googleapis.com/mapsdevsite/json/states.js",
      "https://map-be-abe893efe93b.herokuapp.com/state/json/nigeria.geojson",
      { idPropertyName: "ISO" }
    );

    // wait for the request to complete by listening for the first feature to be
    // added
    google.maps.event.addListenerOnce(map.data, "addfeature", () => {
      google.maps.event.trigger(
        document.getElementById("census-variable"),
        "change"
      );
    });
  };

  const loadCensusData = (variable) => {
    const xhr = new XMLHttpRequest();

    //  xhr.open("GET", variable + ".json");
    xhr.open("GET", variable);
    xhr.onload = function () {
      const censusData = JSON.parse(xhr.responseText);

      censusData.shift(); // the first row contains column names
      censusData.forEach((row) => {
        const censusVariable = parseFloat(row[0]);

        const stateId = row[1];

        // keep track of min and max values
        if (censusVariable < censusMin) {
          censusMin = censusVariable;
        }

        if (censusVariable > censusMax) {
          censusMax = censusVariable;
        }

        const state = map.data.getFeatureById(stateId);

        // update the existing row with the new data
        if (state) {
          state.setProperty("census_variable", censusVariable);
        }
      });
      // update and display the legend
      document.getElementById("census-min").textContent =
        censusMin.toLocaleString();
      document.getElementById("census-max").textContent =
        censusMax.toLocaleString();
    };

    xhr.send();
  };

  /** Removes census data from each shape on the map and resets the UI. */
  const clearCensusData = () => {
    censusMin = Number.MAX_VALUE;
    censusMax = -Number.MAX_VALUE;
    map.data.forEach((row) => {
      row.setProperty("census_variable", undefined);
      row.setProperty("maxWeight", undefined);
    });
    document.getElementById("data-box").style.display = "none";
    document.getElementById("data-caret").style.display = "none";
  };

  const styleFeature = (feature) => {
    const low = [5, 69, 54]; // color of smallest datum
    const high = [151, 83, 34]; // color of largest datum

    // delta represents where the value sits between the min and max
    const delta =
      (feature.getProperty("census_variable") - censusMin) /
      (censusMax - censusMin);

    const color = [];

    for (let i = 0; i < 3; i++) {
      // calculate an integer color based on the delta
      color.push((high[i] - low[i]) * delta + low[i]);
    }

    // determine whether to show this shape or not
    let showRow = true;

    if (
      feature.getProperty("census_variable") == null ||
      isNaN(feature.getProperty("census_variable"))
    ) {
      showRow = false;
    }

    let outlineWeight = 0.5,
      zIndex = 1;

    if (feature.getProperty("state") === "hover") {
      outlineWeight = zIndex = 2;
    }

    return {
      strokeWeight: outlineWeight,
      strokeColor: "#fff",
      zIndex: zIndex,
      fillColor: "hsl(" + color[0] + "," + color[1] + "%," + color[2] + "%)",
      fillOpacity: 0.75,
      visible: showRow,
    };
  };

  React.useEffect(() => {
    if (window && window.google) {
      initMap();
    }
  }, []);

  return (
    <div>
      <div className="dropdown-container">
        <div id="controls" className="nicebox">
          <div>
            <select id="census-variable">
              <option
                id="1"
                value="https://map-be-abe893efe93b.herokuapp.com/state/json/stateBudgetAllocation"
              >
                State budget allocation to ICT development
              </option>
              <option
                id="2"
                value="https://map-be-abe893efe93b.herokuapp.com/state/json/govSystems"
              >
                Governance systems
              </option>
              <option
                id="3"
                value="https://map-be-abe893efe93b.herokuapp.com/state/json/internetAvailSpeed"
              >
                Internet availability and speed
              </option>
              <option
                id="4"
                value="https://map-be-abe893efe93b.herokuapp.com/state/json/levelIctReforms"
              >
                Level of ICT reforms/advancement in the following sectors
              </option>
              <option
                id="5"
                value="https://map-be-abe893efe93b.herokuapp.com/state/json/deploymentCompSystems"
              >
                Deployment of computer systems in state secretariat
              </option>
              <option
                id="6"
                value="https://map-be-abe893efe93b.herokuapp.com/state/json/startUpEcosystem"
              >
                Startup Ecosystem
              </option>
              <option
                id="7"
                value="https://map-be-abe893efe93b.herokuapp.com/state/json/statusStateWebsite"
              >
                Status of State Official Website
              </option>
              <option
                id="8"
                value="https://map-be-abe893efe93b.herokuapp.com/state/json/staffIctProficiency"
              >
                Staff ICT proficiency
              </option>
              <option
                id="9"
                value="https://map-be-abe893efe93b.herokuapp.com/state/json/totalScore"
              >
                Total Score
              </option>
            </select>
          </div>
          <div id="legend">
            <div id="census-min">min</div>
            <div className="color-key">
              <span id="data-caret">&#x25c6;</span>
            </div>
            <div id="census-max">max</div>
          </div>
        </div>
        <div id="data-box" className="stateDetails">
          <label
            className="fw-semi-bold"
            id="data-label"
            htmlFor="data-value"
          ></label>
          <span id="data-value"></span>
        </div>
      </div>

      <div id="map_container">
        <div id="map"></div>
      </div>
    </div>
  );
};

export default GoogleMap2;
