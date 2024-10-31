"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Modal, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";

const CustomRadio = styled(Radio)(() => ({
  "&.Mui-checked": { color: "#FFBF00" },
}));

const TripTypeButtons = ({ tripType, setTripType }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      mb: 2,
      bgcolor: "#f0f0f0",
      borderRadius: "8px",
      padding: "0px 0px",
      marginLeft: "18%",
      width: "225px",
    }}
  >
    <Button
      variant={tripType === "One way" ? "contained" : "outlined"}
      onClick={() => setTripType("One way")}
      sx={{
        borderRadius: "5px 5px",
        padding: "2px 25px",
        boxShadow: "none",
        textTransform: "none",
        width: "170px",
        fontSize: "14px",
        border: "none",
        fontWeight: "1200px",
        lineHeight: "30px",
        textAlign: "center",
        bgcolor: tripType === "One way" ? "#FFBF00" : "transparent",
        color: tripType === "One way" ? "#fff" : "#757575",
        "&:hover": {
          bgcolor: tripType === "One way" ? "#FFBF00" : "#f0f0f0",
        },
      }}
    >
      One way
    </Button>
    <Button
      variant={tripType === "Round trip" ? "contained" : "outlined"}
      onClick={() => setTripType("Round trip")}
      sx={{
        borderRadius: "5px",
        textTransform: "none",
        border: "none",
        fontSize: "12px",
        boxShadow: "none",
        border: "none",
        fontWeight: "1200px",
        lineHeight: "30px",
        textAlign: "center",
        width: "170px",
        padding: "2px 25px",
        bgcolor: tripType === "Round trip" ? "#FFBF00" : "transparent",
        color: tripType === "Round trip" ? "#fff" : "#757575",
        "&:hover": {
          bgcolor: tripType === "Round trip" ? "#FFBF00" : "#f0f0f0",
        },
      }}
    >
      Round trip
    </Button>
  </Box>
);

const Dates = () => {
  const [tripType, setTripType] = useState("One way");
  const [selectedDateOption, setSelectedDateOption] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleApply = () => {
    console.log(`Selected Date Option: ${selectedDateOption}`);
    handleCloseModal();
  };

  return (
    <Box>
      <Button
        onClick={handleOpenModal}
        sx={{
          fontSize: "0.85rem",
          color: "#000",
          textTransform: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          borderRadius: "8px",
          border: "2px solid transparent",
          transition: "border-color 0.3s ease-in-out",
          "&:hover": {
            bgcolor: "#f0f0f0",
          },
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "0.80rem" }}>
          Dates
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", color: grey[500] }}>
          <Typography sx={{ fontSize: "13px", color: "#999" }}>
            {selectedDateOption === "All" ? selectedDateOption : "All"}
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />
        </Box>
      </Button>

      {/* Modal Pop-up */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 380,
            height: 540,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: "5px 10px",
            borderRadius: "8px",
          }}
        >
          <CloseIcon
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          />
          <Typography
            id="modal-title"
            // variant="h6"
            sx={{
              textAlign: "center",
              m: "8px 0px",
              fontSize: "18px",
              fontWeight: "1200",
            }}
          >
            Dates
          </Typography>

          <TripTypeButtons tripType={tripType} setTripType={setTripType} />

          <RadioGroup
            value={selectedDateOption}
            onChange={(e) => setSelectedDateOption(e.target.value)}
            sx={{
              border: "1px solid #0000001f",
              borderRadius: "10px",
              padding: "10px 10px",
              marginTop: "10px 10px",
              fontSize: "14px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #0000001f",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                value="Any time"
                control={<CustomRadio />}
                label="Any time"
                sx={{
                  m: 0,
                  p: 0,
                  "& .MuiTypography-root": {
                    fontSize: "13px",
                  },
                }}
              />
              <KeyboardArrowRightIcon sx={{ color: "#999", marginRight: "8px" }} />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                value="Exact dates"
                control={<CustomRadio />}
                label="Exact dates"
                sx={{
                  m: 0,
                  "& .MuiTypography-root": {
                    fontSize: "13px",
                  },
                }}
              />
              <KeyboardArrowRightIcon sx={{ color: "#999", marginRight: "8px" }} />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                value="Flexible dates"
                control={<CustomRadio />}
                label="Flexible dates"
                sx={{
                  m: 0,
                  "& .MuiTypography-root": {
                    fontSize: "13px",
                  },
                }}
              />
              <KeyboardArrowRightIcon sx={{ color: "#999", marginRight: "8px" }} />
            </Box>
          </RadioGroup>
        </Box>
      </Modal>
    </Box>
  );
};

const DateFilter = () => (
  <Box display="flex" justifyContent="center">
    <Dates />
  </Box>
);

export default DateFilter;
