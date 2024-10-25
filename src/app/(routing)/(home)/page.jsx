"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import FlightsMap from "@/app/components/FlightsMap";
import SearchBar from "@/app/components/SearchBar";

const Home = () => {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  return (
    <Box>
      <SearchBar
        source={source}
        setSource={setSource}
        destination={destination}
        setDestination={setDestination}
      />

      <FlightsMap
        source={source}
        setSource={setSource}
        destination={destination}
        setDestination={setDestination}
      />
    </Box>
  );
};

export default Home;
