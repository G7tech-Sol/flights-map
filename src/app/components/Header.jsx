"use client";

import { AppBar, TextField, Box, Autocomplete, Grid } from "@mui/material";

const Header = ({ source, setSource, destination, setDestination }) => {
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

  const filteredDestinations = Object.keys(countryCoordinates).filter(
    (country) => country !== source
  );

  return (
    <AppBar position="static" sx={{ padding: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={Object.keys(countryCoordinates)}
              value={source}
              onChange={(event, newValue) => setSource(newValue)}
              renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={filteredDestinations}
              value={destination}
              onChange={(event, newValue) => setDestination(newValue)}
              renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
            />
          </Grid>
        </Grid>
      </Box>
    </AppBar>
  );
};

export default Header;
