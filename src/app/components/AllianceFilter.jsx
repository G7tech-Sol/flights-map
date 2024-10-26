// AlliancesFilter.js
"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Menu,
  RadioGroup,
  FormControlLabel,
  Divider,
  Radio,
  TextField,
  InputAdornment,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

// Styled Components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
  marginBottom: theme.spacing(1),
}));

const CustomRadio = styled(Radio)(() => ({
  "&.Mui-checked": { color: "#FFBF00" },
}));

const StyledInputBase = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": { borderColor: "Blue" },
    "&.Mui-focused fieldset": { borderColor: "Blue" },
  },
}));

const FilterDropdown = ({
  filter,
  options,
  selectedOption,
  onOptionChange,
  searchEnabled = true,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setSearchTerm("");
    setFilteredOptions(options);
  };

  const handleCloseMenu = () => setAnchorEl(null);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredOptions(options.filter((option) => option.toLowerCase().includes(term)));
  };

  const handleOptionChangeAndClose = (event) => {
    onOptionChange(event);
    handleCloseMenu();
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
          border: `2px solid ${selectedOption !== "All" ? "#FFBF00" : "transparent"}`,
          borderRadius: "8px",
          margin: "5px 3px",
          transition: "border-color 0.3s ease-in-out",
          "&:hover": { bgcolor: "#f0f0f0" },
        }}
        onClick={handleOpenMenu}
      >
        <Typography variant="body2" sx={{ fontSize: "0.80rem", fontFamily: '"Inter", sans-serif' }}>
          {filter}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", color: grey[500] }}>
          <Typography sx={{ fontSize: "13px", color: "#999" }}>
            {selectedOption || "All"}
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
            borderRadius: "8px", // Adjust border radius here
            overflow: "hidden", // Prevents clipping of border-radius
          },
        }}
        MenuListProps={{
          disablePadding: true, // Removes padding around <ul>
        }}
      >
        <RadioGroup
          value={selectedOption}
          onChange={handleOptionChangeAndClose}
          sx={{ padding: "8px 18px", width: "220px" }}
        >
          <FormControlLabel
            value="All"
            control={<CustomRadio />}
            label="All"
            sx={{
              ".MuiFormControlLabel-label": { fontSize: "13px", color: "#000" },
              "&:hover": { backgroundColor: "#f2f2f2", borderRadius: "8px", cursor: "pointer" },
            }}
          />
          <Divider />
          {filteredOptions.map((option, idx) => (
            <FormControlLabel
              key={idx}
              value={option}
              control={<CustomRadio />}
              label={option}
              sx={{
                ".MuiFormControlLabel-label": {
                  fontSize: "13px",
                  textAlign: "center",
                  marginLeft: "0px",
                  color: "#1c1d2e",
                },
                "&:hover": { backgroundColor: "#f2f2f2", borderRadius: "8px", cursor: "pointer" },
              }}
            />
          ))}
        </RadioGroup>
      </Menu>
    </Box>
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
    />
  );
};

const AllencesFilter = () => (
  <Box sx={{ marginLeft: "0px" }}>
    <Box
      bgcolor="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={0.7}
      margin="auto"
      fontSize={2}
    />
    <AlliancesFilter />
  </Box>
);

export default AllencesFilter;
