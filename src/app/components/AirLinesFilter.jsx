"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Menu,
  Checkbox,
  FormControlLabel,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
  marginBottom: theme.spacing(1),
}));

const CustomCheckbox = styled(Checkbox)(() => ({
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
  selectedOptions,
  onOptionChange,
  searchEnabled = true,
  onReset,
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

  const handleOptionChange = (event) => {
    const value = event.target.value;
    onOptionChange(value);
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
          border: `2px solid ${selectedOptions.length > 0 ? "#FFBF00" : "transparent"}`,
          borderRadius: "8px",
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
            {selectedOptions.length > 0 ? `Selected` : "All"}
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
            borderRadius: "8px",
          },
        }}
        MenuListProps={{
          disablePadding: true,
        }}
      >
        <Box sx={{ padding: "15px 12px", width: "280px" }}>
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

          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  margin: "0px 10px",
                  paddingTop: "9px",
                  paddingBottom: "0px",
                }}
              >
                All Airlines
              </Typography>
              {selectedOptions.length > 0 && (
                <Button
                  onClick={onReset}
                  sx={{ fontSize: "0.9rem", color: "#FFBF00", textTransform: "none" }}
                >
                  Reset
                </Button>
              )}
            </Box>
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  control={
                    <CustomCheckbox
                      checked
                      value={option}
                      onChange={handleOptionChange}
                      sx={{ marginX: "10px" }}
                    />
                  }
                  label={option}
                  sx={{
                    ".MuiFormControlLabel-label": { fontSize: "0.85rem", margin: "0px 0px" },
                    "&:hover": {
                      backgroundColor: "#f2f2f2",
                      borderRadius: "8px",
                      cursor: "pointer",
                    },
                  }}
                />
              ))
            ) : (
              <Typography sx={{ fontSize: "0.75rem", color: grey[500] }}>
                {/* No Airlines selected */}
              </Typography>
            )}

            <Divider sx={{ margin: "8px 0" }} />

            {filteredOptions.map((option, idx) => (
              <FormControlLabel
                key={idx}
                control={
                  <CustomCheckbox
                    checked={selectedOptions.includes(option)}
                    value={option}
                    onChange={handleOptionChange}
                  />
                }
                label={option}
                sx={{
                  margin: "0px 1px",
                  color: "#1c1d2e",
                  ".MuiFormControlLabel-label": { fontSize: "0.85rem" },
                  "&:hover": { backgroundColor: "#f2f2f2", borderRadius: "8px", cursor: "pointer" },
                }}
              />
            ))}
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

const AirlinesFilter = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const optionsAlliances = [
    "Aerospatiale/Alenia ATR 42-300",
    "Aerospatiale/Alenia ATR 72",
    "Agusta / AgustaWestland A-109",
    "Airbus A220",
    "Airbus A320-100",
  ];

  const handleOptionChange = (value) => {
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value]
    );
  };

  const handleReset = () => setSelectedOptions([]);

  return (
    <FilterDropdown
      filter="Airlines"
      options={optionsAlliances}
      selectedOptions={selectedOptions}
      onOptionChange={handleOptionChange}
      onReset={handleReset}
    />
  );
};

export default AirlinesFilter;
