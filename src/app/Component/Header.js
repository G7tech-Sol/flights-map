'use client'
import { AppBar, InputAdornment, IconButton, TextField, Button, Box, Typography, Avatar, border, Icon } from '@mui/material';
import React, { useState } from 'react';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import RoomIcon from '@mui/icons-material/Room';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import Image from 'next/image';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { PiUserCircleThin } from "react-icons/pi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
// import { VscArrowSwap } from "react-icons/vsc";
// import { MdOutlineSwapHoriz } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";


export default function Header() {
  const fromPlaceholder = "From"; // Placeholder for the first TextField
  const toPlaceholder = "To"; // Placeholder for the second TextField
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ padding: '0px 10px' }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', fontFamily: '"Inter", sans-serif', }}>
        <Box sx={{ flexGrow: 0, marginTop: '25px', marginLeft: "15px" }}>
          <h2 sx={{
            fontFamily: '"Inter", sans-serif',
          }}>FlightConnections</h2>

        </Box>

        <Box sx={{
          paddingRight: "70px",
          paddingBottom: '8px',
          paddingTop: '12px',
        }}>


          <TextField
            variant="outlined"
            size="small"
            placeholder={fromPlaceholder}
            sx={{
              fontSize: '15px',
              width: '272px',
              fontFamily: '"Inter", sans-serif',
              fontWeight: "600",
              color: '#1c1d2e',

              '&::placeholder': {
                color: 'gray',
                fontWeight: '700',
                opacity: 1,
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '6px',
                lineHeight: '16px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, .1)',
                border: 'none',
                "& fieldset": {
                  border: "2px solid #EBEAED",
                },
                "&:hover fieldset": {
                  border: "2px solid #EBEAED",
                  boxShadow: '0.5px 1px 4px rgba(0, 0, 0, .1)',
                },
                "&.Mui-focused fieldset": {
                  border: "2px solid #EBEAED",
                },
              },
              '& .MuiInputBase-input': {
                height: '30px',
                fontSize: '14px',
                border: 'none'
              },
              '& .MuiInputAdornment-positionEnd': {
                borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
                paddingLeft: '6px',
                height: '70%',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AdjustOutlinedIcon sx={{ fontSize: '15px', lineHeight: '16px', fontWeight: 'bold', }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      transition: "filter 0.3s ease",
                      filter: isHovered ? "brightness(0) saturate(100%)" : "none",

                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <Image src="/VectorA.png" alt="Flag" height={28} width={28} />
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          <Icon sx={{
            border: '1px solid rgba(0, 0, 0, 0.1)',

            height: "38px",
            width: "40px",
            my: 0.7,
            mx: 1.5,
            px: 0.5,
            py: 1.3,
            color: "#bbb",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: '15px'
          }}>
            <FaExchangeAlt sx={{
              border: '1px solid rgba(0, 0, 0, 0.1)',
              color: "#bbb",

            }} />

          </Icon>

          <TextField
            variant="outlined"
            size="small"

            placeholder={toPlaceholder}
            sx={{
              fontSize: '15px',
              fontWeight: "600",
              width: '272px',
              fontFamily: '"Inter", sans-serif',
              color: '#1c1d2e',
              cursor: 'pointer',
              '&::placeholder': {
                color: 'gray',
                fontWeight: '700',
                opacity: 1,
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '6px',
                lineHeight: '16px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, .1)',
                border: 'none',
                "& fieldset": {
                  border: "2px solid #EBEAED",
                },
                "&:hover fieldset": {
                  border: "2px solid #EBEAED",
                  boxShadow: '0.5px 1px 4px rgba(0, 0, 0, .1)',

                },
                "&.Mui-focused fieldset": {
                  border: "2px solid #EBEAED",
                },
              },
              '& .MuiInputBase-input': {
                height: '30px',
                fontSize: '14px',
                border: 'none'
              },
              '& .MuiInputAdornment-positionEnd': {
                borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
                paddingLeft: '6px',
                height: '70%',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RoomIcon sx={{ fontSize: '13px', lineHeight: "16px", fontWeight: 'bold', }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    transition: "filter 0.3s ease",
                    filter: isHovered2 ? "brightness(0) saturate(100%)" : "none",

                  }}
                    onMouseEnter={() => setIsHovered2(true)}
                    onMouseLeave={() => setIsHovered2(false)}
                  >
                    <Image src="/VectorB.png" alt="Flag" height={28} width={28} />
                  </Box>
                </InputAdornment>
              ),
            }}
          />

        </Box>

        <Box sx={{ display: 'flex', flexDirection: "column", mt: "10px" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
              <Box display="flex" alignItems="center" gap={1} marginRight={1}>
                <Image src="/Flag.png" alt="Flag" height={14} width={20} />
                <Typography variant="body1" sx={{
                  width: "20px",
                  height: "20px",
                  fontWeight: "600",
                  fontSize: "14px",
                  fontFamily: '"Inter", sans-serif',
                  color: "#000",
                }} >
                  EN
                </Typography>
              </Box>
            </Button>

            <Box display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar sx={{ width: 50, height: 50, bgcolor: 'white' }}>
                <PiUserCircleThin style={{ width: '45px', height: '45px' }} color="#bbb" />
              </Avatar>


            </Box>

            <IconButton sx={{
              padding: 0,
            }}>
              <PiDotsThreeVerticalBold style={{ width: 35, height: 35, color: '#000' }} />
            </IconButton>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="medium" sx={{
              textAlign: "center",
              ml: "32px",
              fontSize: "9px",
              // fontWeight: "600",
              color: "#757575",
              marginTop: "-4px",
              fontFamily: '"Inter", sans-serif',
            }}>
              Ziyuan Liu
            </Typography>
          </Box>
        </Box>
      </Box >
    </AppBar >
  );
}


