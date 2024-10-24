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
} from "@mui/material";
import React from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import RoomIcon from "@mui/icons-material/Room";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import Image from "next/image";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { PiUserCircleThin } from "react-icons/pi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

export default function Header() {
  const fromPlaceholder = "From"; // Placeholder for the first TextField
  const toPlaceholder = "To"; // Placeholder for the second TextField

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ padding: "0px 10px" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", fontFamily: '"Inter", sans-serif' }}
      >
        <Box sx={{ flexGrow: 0 }}>
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
            pt: "8px",
            paddingRight: "35px",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder={fromPlaceholder}
            sx={{
              fontSize: "15px",
              width: "272px",
              fontFamily: '"Inter", sans-serif',
              fontWeight: "600",
              "&::placeholder": {
                color: "gray",
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
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AdjustOutlinedIcon sx={{ fontSize: "13px", lineHeight: "16px" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Image src="/VectorA.png" alt="Flag" height={25} width={25} />
                </InputAdornment>
              ),
            }}
          />

          <IconButton
            sx={{
              height: "38px",
              width: "60px",
            }}
          >
            <SwapHorizIcon
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.1)",
                mt: 1,
                p: 0.8,
                height: "20px",
                width: "25px",
                borderRadius: 1,
              }}
            />
          </IconButton>

          <TextField
            variant="outlined"
            size="small"
            placeholder={toPlaceholder}
            sx={{
              fontSize: "15px",
              fontWeight: "600",
              width: "272px",
              fontFamily: '"Inter", sans-serif',
              "&::placeholder": {
                color: "gray",
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
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RoomIcon sx={{ fontSize: "13px", lineHeight: "16px" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Image src="/VectorB.png" alt="Flag" height={25} width={25} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", mt: "4px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="text" size="small" sx={{ textTransform: "none" }}>
              <Box display="flex" alignItems="center" gap={1} marginRight={1}>
                <Image src="/Flag.png" alt="Flag" height={14} width={20} />
                <Typography
                  variant="body1"
                  sx={{
                    width: "20px",
                    height: "20px",
                    fontWeight: "600",
                    fontSize: "14px",
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  EN
                </Typography>
              </Box>
            </Button>

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Avatar sx={{ width: 50, height: 50, bgcolor: "white" }}>
                <PiUserCircleThin style={{ width: "45px", height: "45px" }} color="#cccccc" />
              </Avatar>
            </Box>

            <IconButton
              sx={{
                padding: 0,
              }}
            >
              <PiDotsThreeVerticalBold style={{ width: 35, height: 35 }} />
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
                color: "#cccccc",
                marginTop: "-5px",
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Ziyuan Liu
            </Typography>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
}
