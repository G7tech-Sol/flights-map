"use client";
import {
  AppBar,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  Autocomplete,
  Icon,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import Image from "next/image";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { PiUserCircleThin } from "react-icons/pi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { FaExchangeAlt } from "react-icons/fa";

const SearchBar = ({ source, setSource, destination, setDestination }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

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
    <AppBar position="static" color="transparent" elevation={0} sx={{ padding: "0px 10px" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", fontFamily: '"Inter", sans-serif' }}
      >
        <Box sx={{ flexGrow: 0, marginTop: "22px", marginLeft: "15px" }}>
          <h2
            sx={{
              fontFamily: '"Inter", sans-serif',
            }}
          >
            FlightConnections
          </h2>
        </Box>

        <Box
          sx={{
            paddingRight: "70px",
            paddingBottom: "8px",
            paddingTop: "12px",
            display: "flex",
          }}
        >
          <Autocomplete
            options={Object.keys(countryCoordinates)}
            value={source}
            onChange={(event, newValue) => setSource(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                placeholder="From"
                sx={{
                  fontSize: "15px",
                  width: "272px",
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: "600",
                  color: "#1c1d2e",

                  "&::placeholder": {
                    color: "red",
                    fontWeight: "700",
                    opacity: 1,
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px",
                    lineHeight: "16px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, .1)",
                    border: "none",
                    "& fieldset": {
                      border: "2px solid #EBEAED",
                    },
                    "&:hover fieldset": {
                      border: "2px solid #EBEAED",
                      boxShadow: "0.5px 1px 4px rgba(0, 0, 0, .1)",
                    },
                    "&.Mui-focused fieldset": {
                      border: "2px solid #EBEAED",
                    },
                  },
                  "& .MuiInputBase-input": {
                    height: "30px",
                    fontSize: "14px",
                    border: "none",
                  },
                  "& .MuiInputAdornment-positionEnd": {
                    borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
                    paddingLeft: "6px",
                    height: "70%",
                  },
                  "& .MuiOutlinedInput-input": {
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "500",
                    "&::placeholder": {
                      color: "#757575",
                      opacity: 1,
                      fontWeight: "500",
                    },
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <AdjustOutlinedIcon
                        sx={{
                          fontSize: "15px",
                          lineHeight: "16px",
                          fontWeight: "bold",
                          marginLeft: "8px",
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="center"
                      sx={{
                        width: "40px",
                        position: "absolute",
                        right: "5px",
                        paddingLeft: "7px",
                        borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Box
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          transition: "filter 0.3s ease",
                          filter: isHovered ? "brightness(0) saturate(100%)" : "none",
                        }}
                        onMouseEnter={() => setIsHovered2(true)}
                        onMouseLeave={() => setIsHovered2(false)}
                      >
                        <Image src="/assets/VectorA.png" alt="A" height={28} width={28} />
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Icon
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.1)",

              height: "38px",
              width: "40px",
              mt: 0.5,
              mx: 1.5,
              px: 0.5,
              py: 1.3,
              color: "#bbb",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            <FaExchangeAlt
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.1)",
                color: "#bbb",
              }}
            />
          </Icon>
          <Autocomplete
            options={filteredDestinations}
            value={destination}
            onChange={(event, newValue) => setDestination(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                placeholder="To"
                sx={{
                  fontSize: "15px",
                  width: "272px",
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: "600",
                  color: "#1c1d2e",

                  "&::placeholder": {
                    color: "red",
                    fontWeight: "700",
                    opacity: 1,
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px",
                    lineHeight: "16px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, .1)",
                    border: "none",
                    "& fieldset": {
                      border: "2px solid #EBEAED",
                    },
                    "&:hover fieldset": {
                      border: "2px solid #EBEAED",
                      boxShadow: "0.5px 1px 4px rgba(0, 0, 0, .1)",
                    },
                    "&.Mui-focused fieldset": {
                      border: "2px solid #EBEAED",
                    },
                  },
                  "& .MuiInputBase-input": {
                    height: "30px",
                    fontSize: "14px",
                    border: "none",
                  },
                  "& .MuiInputAdornment-positionEnd": {
                    borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
                    paddingLeft: "6px",
                    height: "70%",
                  },
                  "& .MuiOutlinedInput-input": {
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "500",
                    "&::placeholder": {
                      color: "#757575",
                      opacity: 1,
                      fontWeight: "500",
                    },
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <AdjustOutlinedIcon
                        sx={{
                          fontSize: "15px",
                          lineHeight: "16px",
                          fontWeight: "bold",
                          marginLeft: "8px",
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="center"
                      sx={{
                        width: "40px",
                        position: "absolute",
                        right: "5px",
                        paddingLeft: "7px",
                        borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Box
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          transition: "filter 0.3s ease",
                          filter: isHovered2 ? "brightness(0) saturate(100%)" : "none",
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <Image src="/assets/VectorB.png" alt="A" height={28} width={28} />
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", mt: "10px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="text" size="small" sx={{ textTransform: "none" }}>
              <Box display="flex" alignItems="center" gap={1} marginRight={1}>
                <Image src="/assets/Flag.png" alt="Flag" height={14} width={20} />
                <Typography
                  variant="body1"
                  sx={{
                    width: "20px",
                    height: "20px",
                    fontWeight: "600",
                    fontSize: "14px",
                    fontFamily: '"Inter", sans-serif',
                    color: "#000",
                  }}
                >
                  EN
                </Typography>
              </Box>
            </Button>

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Avatar sx={{ width: 50, height: 50, bgcolor: "white" }}>
                <PiUserCircleThin style={{ width: "45px", height: "45px" }} color="#bbb" />
              </Avatar>
            </Box>

            <IconButton
              sx={{
                padding: 0,
              }}
            >
              <PiDotsThreeVerticalBold style={{ width: 35, height: 35, color: "#000" }} />
            </IconButton>
          </Box>
          <Box>
            <Typography
              variant="body2"
              fontWeight="medium"
              sx={{
                textAlign: "center",
                ml: "32px",
                fontSize: "9px",
                color: "#757575",
                marginTop: "-4px",
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Ziyuan Liu
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "#E0E0E0", marginTop: "5px" }} />
    </AppBar>
  );
};

export default SearchBar;
