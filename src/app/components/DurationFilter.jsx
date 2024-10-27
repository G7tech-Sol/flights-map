"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Menu, Slider } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { grey } from "@mui/material/colors";
import { TrainSharp } from "@mui/icons-material";

const CustomSlider = (props) => (
  <Slider
    {...props}
    valueLabelDisplay="auto"
    min={0}
    max={1500}
    step={50}
    sx={{
      color: "#FFBF00",
      height: 8,
      "& .MuiSlider-thumb": {
        height: 24,
        width: 24,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        "&:hover, &.Mui-focusVisible, &.Mui-active": {
          boxShadow: "0 0 0 8px rgba(255, 191, 0, 0.16)",
        },
      },
      "& .MuiSlider-rail": {
        opacity: 0.28,
      },
      "& .MuiSlider-track": {
        height: 8,
        borderRadius: 4,
      },
    }}
  />
);

const FilterDropdown = ({ filter, selectedOption, children, buttonLabel }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setIsFocused(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setIsFocused(false);
  };

  return (
    <Box>
      <Button
        sx={{
          fontSize: "0.85rem",
          color: "#000",
          textTransform: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          border: `2px solid ${selectedOption !== "All" && isFocused ? "#FFBF00" : "transparent"}`,
          borderRadius: "8px",
          margin: "5px 3px",
          transition: "border-color 0.3s ease-in-out",
          "&:hover": {
            bgcolor: "#f0f0f0",
          },
        }}
        onClick={handleOpenMenu}
      >
        <Typography variant="body2" sx={{ fontSize: "0.80rem" }}>
          {filter}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", color: grey[500] }}>
          <Typography sx={{ fontSize: "13px", color: "#999" }}>
            {buttonLabel || selectedOption || "All"}
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          sx: {
            overflow: "visible",
            boxShadow: "0 6px 21px rgba(0, 0, 0, 0.3)",
            marginTop: "5px",
            marginLeft: "5rem",
            borderRadius: "8px",
            padding: "10px 10px",
          },
        }}
      >
        {children}
      </Menu>
    </Box>
  );
};

const Duration = () => {
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [allRange, setAllRange] = useState(false);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setAllRange(true);
  };

  const handleReset = () => {
    setPriceRange([0, 1500]);
    setAllRange(false);
  };

  const handleApply = () => {
    console.log(`Applied Range: $${priceRange[0]} - $${priceRange[1]}`);
  };

  return (
    <FilterDropdown
      filter="Duration"
      buttonLabel={allRange === true ? `$${priceRange[0]} - $${priceRange[1]}` : `All`}
    >
      <Box
        sx={{
          width: "260px",
        }}
      >
        <Box
          sx={{
            padding: "0px 22px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Typography mt={1} sx={{ fontSize: "14px", color: "#1c1d2e" }}>
              Range <br />
              <span style={{ color: "#757575" }}>
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </Typography>

            {allRange && (
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{
                  borderRadius: "5px",
                  textTransform: "none",
                  cursor: "pointer",
                  border: "none",
                  bgcolor: "#FFBF00",
                  color: "#fff",
                  padding: "0px 20px",
                  height: "28px",
                  alignItems: "center",
                }}
              >
                Reset
              </Button>
            )}
          </Box>
          <CustomSlider value={priceRange} mt={1} onChange={handlePriceChange} />
        </Box>
      </Box>
    </FilterDropdown>
  );
};

const DurationFilter = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Duration />
    </Box>
  );
};

export default DurationFilter;
