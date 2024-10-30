"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { point } from "@turf/helpers";
import greatCircle from "@turf/great-circle";
import { Box, Grid, Typography } from "@mui/material";

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

const FlightsMap = ({ source, setSource, destination, setDestination }) => {
  const mapContainer = useRef(null);
  const popupRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [error, setError] = useState(null);
  const [hasSubmittedRoute, setHasSubmittedRoute] = useState(false);
  let sourceSetLocally = useRef(false);

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
        paint: {
          "circle-radius": 6,
          "circle-color": "#007CFF",
          "circle-stroke-color": "#000000",
          "circle-stroke-width": 1,
        },
      });

      map.addSource("source-point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [0, 0] },
            },
          ],
        },
      });

      map.addLayer({
        id: "source-point-layer",
        type: "circle",
        source: "source-point",
        paint: {
          "circle-radius": 8,
          "circle-color": "#007CFF",
        },
      });

      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 15,
      });

      map.on("mouseenter", "country-circles", (e) => {
        const countryName = e.features[0].properties.name;

        popup
          .setLngLat(e.lngLat)
          .setHTML(`<div class="custom-popup"><strong>${countryName}</strong></div>`)
          .addTo(map);

        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "country-circles", () => {
        popup.remove();
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "country-circles", (e) => {
        const countryName = e.features[0].properties.name;
        if (!sourceSetLocally.current) {
          handleSourceChange(countryName);
          sourceSetLocally.current = true;
        } else {
          handleDestinationChange(countryName);
        }
      });
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (source && !destination) {
      calculateAllRoutes(source);
    } else if (source && destination) {
      highlightSelectedRoute();
    }
  }, [source, destination]);

  useEffect(() => {
    const updateSourcePoint = () => {
      const coords = countryCoordinates[source];
      if (coords) {
        mapInstance.getSource("source-point").setData({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: coords },
            },
          ],
        });

        if (popupRef.current) {
          popupRef.current.remove();
        }

        const popup = new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 15,
        });

        popup.setLngLat(coords).setHTML(`<div><strong>${source}</strong></div>`).addTo(mapInstance);

        popupRef.current = popup;
      }
    };

    let animationFrameId;

    const animateSourcePoint = () => {
      if (!source) return;

      const radius = Math.abs(Math.sin(Date.now() / 500)) * 8 + 8;
      mapInstance.setPaintProperty("source-point-layer", "circle-radius", radius);
      animationFrameId = requestAnimationFrame(animateSourcePoint);
    };

    if (mapInstance && source) {
      updateSourcePoint();
      animateSourcePoint();
    } else if (mapInstance && !source) {
      mapInstance.setPaintProperty("source-point-layer", "circle-radius", 0);
      if (popupRef.current) popupRef.current.remove();
      cancelAnimationFrame(animationFrameId);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [mapInstance, source]);

  const calculateAllRoutes = (sourceCountry) => {
    const sourceCoords = countryCoordinates[sourceCountry];
    const routes = Object.keys(countryCoordinates)
      .map((destCountry) => {
        if (destCountry !== sourceCountry) {
          const destCoords = countryCoordinates[destCountry];
          return {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: createCurvedLine(sourceCoords, destCoords),
            },
          };
        }
        return null;
      })
      .filter(Boolean);

    renderRoutesOnMap(routes);
  };

  const renderRoutesOnMap = (routes) => {
    if (mapInstance.getLayer("all-routes-layer")) {
      mapInstance.removeLayer("all-routes-layer");
      mapInstance.removeSource("all-routes-source");
    }

    mapInstance.addSource("all-routes-source", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: routes,
      },
    });

    mapInstance.addLayer({
      id: "all-routes-layer",
      type: "line",
      source: "all-routes-source",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "grey",
        "line-width": 1,
      },
    });
  };

  const createCurvedLine = (start, end) => {
    const startPoint = point(start);
    const endPoint = point(end);
    const curvedLine = greatCircle(startPoint, endPoint, { npoints: 100 });
    return curvedLine.geometry.coordinates;
  };

  const handleSourceChange = (newValue) => {
    setSource(newValue);
    setDestination(null);
    setError(null);
    setHasSubmittedRoute(false);

    console.log("Hi", mapInstance);
    if (mapInstance) {
      if (mapInstance.getLayer("dynamic-flight-route-layer")) {
        mapInstance.removeLayer("dynamic-flight-route-layer");
        mapInstance.removeSource("dynamic-flight-route");
      }
      if (mapInstance.getLayer("highlighted-route-layer")) {
        mapInstance.removeLayer("highlighted-route-layer");
        mapInstance.removeSource("highlighted-route-source");
      }
      if (mapInstance.getLayer("all-routes-layer")) {
        mapInstance.removeLayer("all-routes-layer");
        mapInstance.removeSource("all-routes-source");
      }
    }
  };

  const handleDestinationChange = (newValue) => {
    setDestination(newValue);
    setError(null);
  };

  useEffect(() => {
    if (source !== null && destination !== null && source === destination) {
      if (mapInstance) {
        if (mapInstance.getLayer("dynamic-flight-route-layer")) {
          mapInstance.removeLayer("dynamic-flight-route-layer");
          mapInstance.removeSource("dynamic-flight-route");
        }
        if (mapInstance.getLayer("highlighted-route-layer")) {
          mapInstance.removeLayer("highlighted-route-layer");
          mapInstance.removeSource("highlighted-route-source");
        }
        if (mapInstance.getLayer("all-routes-layer")) {
          mapInstance.removeLayer("all-routes-layer");
          mapInstance.removeSource("all-routes-source");
        }
      }

      setSource(null);
      setDestination(null);
      sourceSetLocally.current = false;
      setError(null);
    }
  }, [source, destination, mapInstance]);

  const highlightSelectedRoute = async () => {
    if (mapInstance.getLayer("airplane-layer")) {
      mapInstance.removeLayer("airplane-layer");
      mapInstance.removeSource("airplane-point");
      mapInstance.removeImage("airplane-icon");
    }

    const currentSource = source;
    const currentDestination = destination;

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
          "line-color": "green",
          "line-width": 2,
        },
      });

      const image = await mapInstance.loadImage("/assets/airplane.png");
      mapInstance.addImage("airplane-icon", image.data);

      const midpoint = routeCoordinates[Math.floor(routeCoordinates.length / 2)];
      const airplaneFeature = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: midpoint,
        },
      };

      mapInstance.addSource("airplane-point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [airplaneFeature],
        },
      });

      mapInstance.addLayer({
        id: "airplane-layer",
        type: "symbol",
        source: "airplane-point",
        layout: {
          "icon-image": "airplane-icon",
          "icon-size": 0.5,
          "icon-anchor": "center",
          "icon-allow-overlap": true,
        },
      });

      const bounds = routeCoordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
      }, new maplibregl.LngLatBounds().extend(routeCoordinates[0]));

      mapInstance.fitBounds(bounds, { padding: 80 });
      setError(null);
      setHasSubmittedRoute(true);
    } else {
      if (mapInstance) {
        if (mapInstance.getLayer("dynamic-flight-route-layer")) {
          mapInstance.removeLayer("dynamic-flight-route-layer");
          mapInstance.removeSource("dynamic-flight-route");
        }
        if (mapInstance.getLayer("highlighted-route-layer")) {
          mapInstance.removeLayer("highlighted-route-layer");
          mapInstance.removeSource("highlighted-route-source");
        }
        if (mapInstance.getLayer("all-routes-layer")) {
          mapInstance.removeLayer("all-routes-layer");
          mapInstance.removeSource("all-routes-source");
        }
      }
      setSource(null);
      setDestination(null);
      setError(
        "Unfortunately, we couldn't find a flight route for your selected destination. Please ensure both locations are served by our airline and try again."
      );
      sourceSetLocally.current = false;
    }
  };

  const handleNewPointSelection = () => {
    if (hasSubmittedRoute) {
      setSource(null);
      setDestination(null);
      setHasSubmittedRoute(false);
    }
  };

  return (
    <Box sx={{ height: "calc(100vh - 139px)", display: "flex", paddingX: 2, paddingY: 0 }}>
      <Grid container spacing={2} sx={{ height: "100%", flex: 1 }}>
        <Grid item xs={12} md={3}>
          <Grid container spacing={2} sx={{ padding: "16px 0px 0px 16px" }}>
            <Typography variant="h6" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }}>
              Instructions:
            </Typography>
            <Typography sx={{ fontFamily: '"Inter", sans-serif' }}>
              Click on the circles on the map to select a source and a destination country.
            </Typography>

            {error && (
              <Grid xs={12}>
                <Box
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#ffdddd",
                    color: "#d8000c",
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #d8000c",
                    borderRadius: "10px",
                  }}
                >
                  <span
                    style={{
                      marginRight: 16,
                      fontSize: 20,
                      lineHeight: 1,
                    }}
                  >
                    ⚠️
                  </span>
                  <span style={{ fontWeight: "bold", fontFamily: '"Inter", sans-serif' }}>
                    {error}
                  </span>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={9}>
          <Box
            ref={mapContainer}
            sx={{
              borderRadius: "10px",
              height: "100%",
              width: "100%",
            }}
            // onClick={handleNewPointSelection}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlightsMap;
