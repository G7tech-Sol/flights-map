"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  RadioGroup,
  FormControlLabel,
  Divider,
  Radio,
  TextField,
  InputAdornment,
  Slider,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import AllencesFilter from "./AllianceFilter";
import PriceFilter from "./priceFilter";
import DistanceFilter from "./DistanceFilter";
import DurationFilter from "./DurationFilter";
import AirCraftFilter from "./AirCraftFilter";
import AirlinesFilter from "./AirlinesFilter";
import ClassFilter from "./ClassFilter";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
  marginBottom: theme.spacing(1),
}));

const CustomRadio = styled(Radio)(({ theme }) => ({
  color: "#f2f2f2",
  "&.Mui-checked": {
    color: "#FFBF00",
  },
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "Blue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "Blue",
    },
  },
}));

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
    }}
  />
);

const FilterDropdown = ({
  filter,
  options,
  selectedOption,
  onOptionChange,
  searchEnabled,
  // children,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isFocused, setIsFocused] = useState(false);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setSearchTerm("");
    setFilteredOptions(options);
    setIsFocused(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setIsFocused(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setFilteredOptions(
      options.filter((option) => option.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };

  const handleOptionChangeAndClose = (event) => {
    onOptionChange(event);
    handleCloseMenu();
  };

  const isSelected = selectedOption !== "All";

  return (
    <Box
      sx={{
        borderRadius: "31px",
      }}
    >
      <Button
        sx={{
          fontSize: "0.85rem",
          color: "#000",
          textTransform: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: `2px solid ${isSelected || isFocused ? "#FFBF00" : "transparent"}`,
          borderRadius: "8px",
          transition: "border-color 0.3s ease-in-out",
          margin: "5px 3px",
          "&:hover": {
            bgcolor: "#f0f0f0",
          },
        }}
        onClick={handleOpenMenu}
      >
        <Typography variant="body2" sx={{ fontSize: "0.80rem", fontFamily: '"Inter", sans-serif' }}>
          {filter}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: grey[500],
          }}
        >
          <Typography sx={{ fontSize: "13px", color: "#999" }}>
            {selectedOption || "All"}
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />
        </Box>
      </Button>

      <Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            overflow: "visible",
            marginTop: "5px",
            borderRadius: "8px",
            padding: "10px 18px",
          }}
        >
          <RadioGroup
            value={selectedOption}
            onChange={handleOptionChangeAndClose}
            sx={{ padding: "0px 15px", width: "210px" }}
          >
            {searchEnabled && (
              <Search>
                <StyledInputBase
                  placeholder={`Search ${filter.toLowerCase()}`}
                  onChange={handleSearchChange}
                  value={searchTerm}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ fontSize: "20px", color: "#777" }} />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Search>
            )}

            <FormControlLabel
              value="All"
              control={<CustomRadio />}
              label="All"
              sx={{
                ".MuiFormControlLabel-label": { fontSize: "0.85rem" },
                "&:hover": {
                  backgroundColor: "#f2f2f2",
                  borderRadius: "28px",
                  cursor: "pointer",
                },
              }}
            />
            <Divider />
            {filteredOptions?.map((option, idx) => (
              <FormControlLabel
                key={idx}
                value={option}
                control={<CustomRadio />}
                label={option}
                sx={{
                  ".MuiFormControlLabel-label": { fontSize: "0.85rem" },
                  "&:hover": {
                    backgroundColor: "#f2f2f2",
                    borderRadius: "8px",
                    cursor: "pointer",
                  },
                }}
              />
            ))}
          </RadioGroup>
        </Menu>
      </Box>
    </Box>
  );
};

const Dates = () => {
  const [selectedOption, setSelectedOption] = useState("All");
  const optionsAlliances = [];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FilterDropdown
      filter="Date"
      options={optionsAlliances}
      selectedOption={selectedOption}
      onOptionChange={handleOptionChange}
    />
  );
};

const Prices = () => {
  const [priceRange, setPriceRange] = useState([0, 1500]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <FilterDropdown filter="Price">
      <CustomSlider value={priceRange} onChange={handlePriceChange} />
      <Typography mt={1}>
        Range: ${priceRange[0]} - ${priceRange[1]}
      </Typography>
    </FilterDropdown>
  );
};

const AlliancesFilter = () => {
  const [selectedOption, setSelectedOption] = useState("All");
  const optionsAlliances = ["Data", "Oneworld", "SkyTeam", "Star Alliance"];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FilterDropdown
      filter="Alliances"
      options={optionsAlliances}
      selectedOption={selectedOption}
      onOptionChange={handleOptionChange}
      sx={{
        borderRadius: "20px",
      }}
    />
  );
};

// Airlines Filter Component
// const AirlinesFilter = () => {
//   const [selectedOption, setSelectedOption] = useState('All');
//   const optionsAirlines = ['Airline A', 'Airline B', 'Airline C', 'Airline D'];

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <FilterDropdown
//       filter="Airlines"
//       options={optionsAirlines}
//       selectedOption={selectedOption}
//       onOptionChange={handleOptionChange}
//       searchEnabled
//     />
//   );
// };

const ClassesFilter = () => {
  const [selectedOption, setSelectedOption] = useState("All");
  const optionsClasses = ["Economy", "Premium Economy", "Business Class", "First Class"];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FilterDropdown
      filter="Class"
      options={optionsClasses}
      selectedOption={selectedOption}
      onOptionChange={handleOptionChange}
    />
  );
};

const AircraftFilter = () => {
  const [selectedOption, setSelectedOption] = useState("All");
  const optionsAircraft = ["Aircraft A", "Aircraft B", "Aircraft C"];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FilterDropdown
      filter="Aircraft"
      options={optionsAircraft}
      selectedOption={selectedOption}
      onOptionChange={handleOptionChange}
      searchEnabled
    />
  );
};

const RideFilter = () => {
  return (
    <Box
      sx={{
        marginLeft: "20px",
      }}
    >
      <Box
        bgcolor="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={0.7}
        margin="auto"
        fontSize={2}
      >
        <Dates />
        <PriceFilter />
        <AllencesFilter />
        <AirlinesFilter />
        <ClassFilter />
        <AirCraftFilter />
        <DistanceFilter />
        <DurationFilter />
      </Box>
    </Box>
  );
};

export default RideFilter;
