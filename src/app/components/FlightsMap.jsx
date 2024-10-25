"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { point } from "@turf/helpers";
import greatCircle from "@turf/great-circle";
import { Autocomplete, TextField, Grid, Box } from "@mui/material";

const countryCoordinates = {
  Germany: [10.4515, 51.1657],
  Spain: [-3.7038, 40.4168],
  Pakistan: [69.3451, 30.3753],
  China: [104.1954, 35.8617],
  "Saudi Arabia": [45.0792, 23.8859],
  "South Africa": [22.9375, -30.5595],
  USA: [-95.7129, 37.0902],
  UK: [-0.1278, 51.5074],
  Norway: [8.4689, 60.472],
  Finland: [24.9354, 61.9241],
  Australia: [133.7751, -25.2744],
  India: [78.9629, 20.5937],
  Japan: [138.2529, 36.2048],
  Canada: [-106.3468, 56.1304],
  Brazil: [-51.9253, -14.235],
  Argentina: [-63.6167, -38.4161],
  Russia: [105.3188, 61.524],
  Mexico: [-102.5528, 23.6345],
  Indonesia: [113.9213, -0.7893],
  Italy: [12.5674, 41.8719],
  Egypt: [30.8025, 26.8206],
};

const FlightsMap = () => {
  const mapContainer = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [filteredDestinations, setFilteredDestinations] = useState(Object.keys(countryCoordinates));
  const [error, setError] = useState(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [30, 20],
      zoom: 2,
    });

    map.on("load", () => {
      setMapInstance(map);

      const allCountryPoints = Object.keys(countryCoordinates).map((country) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: countryCoordinates[country] },
        properties: { name: country },
      }));

      const countryPointsGeoJson = { type: "FeatureCollection", features: allCountryPoints };

      map.addSource("country-points", { type: "geojson", data: countryPointsGeoJson });

      map.addLayer({
        id: "country-circles",
        type: "circle",
        source: "country-points",
        paint: { "circle-radius": 6, "circle-color": "blue" },
      });

      let sourceSetLocally = false;

      map.on("click", "country-circles", (e) => {
        const countryName = e.features[0].properties.name;

        if (!sourceSetLocally) {
          handleSourceChange(e, countryName);
          sourceSetLocally = true;
        } else {
          handleDestinationChange(e, countryName);
        }
      });

      map.on("mouseenter", "country-circles", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "country-circles", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (source && destination) {
      handleSubmit();
    }
  }, [source, destination]);

  const createCurvedLine = (start, end) => {
    const startPoint = point(start);
    const endPoint = point(end);
    const curvedLine = greatCircle(startPoint, endPoint, { npoints: 100 });
    return curvedLine.geometry.coordinates;
  };

  const handleSourceChange = (event, newValue) => {
    setSource(newValue);
    setDestination(null);
    setError(null);

    if (newValue) {
      const validDestinations = Object.keys(countryCoordinates).filter(
        (country) => country !== newValue
      );
      setFilteredDestinations(validDestinations);
    } else {
      setFilteredDestinations(Object.keys(countryCoordinates));
    }
  };

  const handleDestinationChange = (event, newValue) => {
    setDestination(newValue);
    setError(null);
  };

  const handleSubmit = () => {
    const currentSource = source;
    const currentDestination = destination;

    console.log("Source:", currentSource);
    console.log("Dest:", currentDestination);

    if (!currentSource || !currentDestination) {
      setError("Please select both a source and a destination.");
      return;
    }

    const startCoords = countryCoordinates[currentSource];
    const endCoords = countryCoordinates[currentDestination];
    const routeCoordinates = createCurvedLine(startCoords, endCoords);

    const isValidRoute =
      routeCoordinates.length > 5 &&
      routeCoordinates.every((coord) => !isNaN(coord[0]) && !isNaN(coord[1]));

    if (isValidRoute) {
      const flightRoute = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: routeCoordinates,
        },
      };

      if (mapInstance.getLayer("dynamic-flight-route-layer")) {
        mapInstance.removeLayer("dynamic-flight-route-layer");
        mapInstance.removeSource("dynamic-flight-route");
      }

      mapInstance.addSource("dynamic-flight-route", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [flightRoute],
        },
      });

      mapInstance.addLayer({
        id: "dynamic-flight-route-layer",
        type: "line",
        source: "dynamic-flight-route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "red",
          "line-width": 2,
        },
      });

      const bounds = routeCoordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
      }, new maplibregl.LngLatBounds().extend(routeCoordinates[0]));

      mapInstance.fitBounds(bounds, { padding: 80 });
      setError(null);
    } else {
      if (mapInstance.getLayer("dynamic-flight-route-layer")) {
        mapInstance.removeLayer("dynamic-flight-route-layer");
        mapInstance.removeSource("dynamic-flight-route");
      }
      setError("No valid route found between the selected source and destination.");
    }
  };

  return (
    <Box sx={{ height: "calc(100vh - 73px)", display: "flex", paddingX: 2 }}>
      <Grid container sx={{ height: "100%", flex: 1 }}>
        <Grid item xs={12} md={3} sx={{ paddingRight: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                options={Object.keys(countryCoordinates)}
                value={source}
                onChange={handleSourceChange}
                renderInput={(params) => <TextField {...params} label="Select Source" />}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                options={filteredDestinations}
                value={destination}
                onChange={handleDestinationChange}
                renderInput={(params) => <TextField {...params} label="Select Destination" />}
              />
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Box color="red">{error}</Box>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={9} sx={{ position: "relative" }}>
          <Box
            ref={mapContainer}
            sx={{
              borderRadius: "10px",
              height: "100%",
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlightsMap;
