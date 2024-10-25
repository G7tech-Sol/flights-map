'use client';
import React, { useState } from 'react';
import {
  Box, Typography, Button, Menu, RadioGroup,
  FormControlLabel, Divider, Radio, TextField, InputAdornment
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

// Styled Components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
  marginBottom: theme.spacing(1),
}));

const CustomRadio = styled(Radio)(({ theme }) => ({
  color: 'f2f2f2',
  '&.Mui-checked': {
    color: '#FFBF00',
  },
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'Blue',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'Blue',
    },
  },
}));
// custom price dropdown range 
const CustomSlider = (props) => (
  <Slider
    {...props}
    valueLabelDisplay="auto"
    min={0}
    max={1500}
    step={50}
    sx={{
      color: '#FFBF00',
      height: 8,
      '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:hover, &.Mui-focusVisible, &.Mui-active': {
          boxShadow: '0 0 0 8px rgba(255, 191, 0, 0.16)',
        },
      },
      '& .MuiSlider-rail': {
        opacity: 0.28,
      },
    }}
  />
);


// const FilterDropdown = ({ filter, options, selectedOption, onOptionChange, searchEnabled }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredOptions, setFilteredOptions] = useState(options);
//   const [isFocused, setIsFocused] = useState(false);

//   const handleOpenMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//     setSearchTerm('');
//     setFilteredOptions(options);
//     setIsFocused(true);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//     setIsFocused(false);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setFilteredOptions(options.filter(option =>
//       option.toLowerCase().includes(e.target.value.toLowerCase())
//     ));
//   };
//   const handleOptionChangeAndClose = (event) => {
//     onOptionChange(event);
//     setAnchorEl(event.currentTarget);
//     setSearchTerm('');
//     setFilteredOptions(options);
//     setIsFocused(true);
//     handleCloseMenu();
//   };

//   return (
//     <Box>
//       <Button
//         sx={{
//           fontSize: '0.85rem',
//           color: '#000',
//           textTransform: 'none',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'start',
//           justifyContent: "center",
//           border: `2px solid ${isFocused ? '#FFBF00' : 'transparent'}`,
//           borderRadius: '8px',
//           transition: 'border-color 0.3s ease-in-out',
//           fontFamily: '"Inter", sans-serif',
//           margin: "5px 3px",
//           '&:hover': {
//             bgcolor: '#f0f0f0',
//           },
//         }}
//         onClick={handleOpenMenu}
//       >
//         <Typography variant="body2" sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.80rem' }}>{filter}</Typography>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "start", color: grey[500], fontFamily: '"Inter", sans-serif' }}>
//           <Box sx={{ fontSize: '13px', color: '#999999', fontFamily: '"Inter", sans-serif' }}>
//             {selectedOption || 'All'}
//           </Box>
//           <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />
//         </Box>
//       </Button>

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleCloseMenu}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <RadioGroup
//           value={selectedOption}
//           onChange={handleOptionChangeAndClose}
//           sx={{ padding: '8px 15px', borderRadius: 2, width: "200px", fontFamily: '"Inter", sans-serif' }}
//         >
//           {searchEnabled && (
//             <Search>
//               <StyledInputBase
//                 placeholder={`Search ${filter.toLowerCase()}`}
//                 onChange={handleSearchChange}
//                 value={searchTerm}
//                 variant="outlined"
//                 size="small"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon style={{ fontSize: '20px', color: '#777', fontFamily: '"Inter", sans-serif' }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 fullWidth
//               />
//             </Search>
//           )}

//           <Box sx={{ textAlign: "start" }}>
//             <FormControlLabel
//               value="All"
//               control={<CustomRadio />}
//               label="All"
//               sx={{
//                 fontFamily: '"Inter", sans-serif',
//                 '.MuiFormControlLabel-label': { fontSize: '0.85rem' },
//                 transition: 'all 0.2s ease-in-out',
//                 '&:hover': {
//                   backgroundColor: '#f2f2f2',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   width: "100%",
//                 },
//               }}
//             />
//             <Divider />
//           </Box>

//           {filteredOptions.map((option, idx) => (
//             <FormControlLabel
//               key={idx}
//               value={option}
//               control={<CustomRadio />}
//               label={option}
//               sx={{
//                 fontFamily: '"Inter", sans-serif',
//                 '.MuiFormControlLabel-label': { fontSize: '0.85rem' },
//                 transition: 'all 0.2s ease-in-out',
//                 '&:hover': {
//                   backgroundColor: '#f2f2f2',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                 },
//               }}
//             />
//           ))}
//         </RadioGroup>
//       </Menu>
//     </Box>
//   );
// };

// Date Filter

const FilterDropdown = ({
  filter,
  options,
  selectedOption,
  onOptionChange,
  searchEnabled,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isFocused, setIsFocused] = useState(false);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setSearchTerm('');
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
      options.filter((option) =>
        option.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleOptionChangeAndClose = (event) => {
    onOptionChange(event);
    handleCloseMenu();
  };

  const isSelected = selectedOption !== 'All';

  return (
    <Box>
      <Button
        sx={{
          fontSize: '0.85rem',
          color: '#000',
          textTransform: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          // border: `2px solid ${isFocused ? '#FFBF00' : 'transparent'}`,
          border: `2px solid ${isSelected || isFocused ? '#FFBF00' : 'transparent'
            }`,
          borderRadius: '8px',
          transition: 'border-color 0.3s ease-in-out',
          margin: '5px 3px',
          '&:hover': {
            bgcolor: '#f0f0f0',
          },
        }}
        onClick={handleOpenMenu}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: '0.80rem', fontFamily: '"Inter", sans-serif' }}
        >
          {filter}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: grey[500],
          }}
        >
          <Typography sx={{ fontSize: '13px', color: '#999' }}>
            {selectedOption || 'All'}
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: '16px' }} />
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <RadioGroup
          value={selectedOption}
          onChange={handleOptionChangeAndClose}
          sx={{ padding: '8px 15px', width: '200px' }}
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
                      <SearchIcon sx={{ fontSize: '20px', color: '#777' }} />
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
              '.MuiFormControlLabel-label': { fontSize: '0.85rem' },
              '&:hover': {
                backgroundColor: '#f2f2f2',
                borderRadius: '8px',
                cursor: 'pointer',
              },
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
                '.MuiFormControlLabel-label': { fontSize: '0.85rem' },
                '&:hover': {
                  backgroundColor: '#f2f2f2',
                  borderRadius: '8px',
                  cursor: 'pointer',
                },
              }}
            />
          ))}
        </RadioGroup>
      </Menu>
    </Box>
  );
};



const Dates = () => {
  const [selectedOption, setSelectedOption] = useState('All');
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

// price filter
const Prices = () => {
  const [selectedOption, setSelectedOption] = useState('All');
  const optionsAlliances = [];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FilterDropdown
      filter="Prices"
      options={optionsAlliances}
      selectedOption={selectedOption}
      onOptionChange={handleOptionChange}
    />
  );
};

// Alliances Filter Component
const AlliancesFilter = () => {
  const [selectedOption, setSelectedOption] = useState('All');
  const optionsAlliances = ['Data', 'Oneworld', 'SkyTeam', 'Star Alliance'];

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

// Airlines Filter Component
const AirlinesFilter = () => {
  const [selectedOption, setSelectedOption] = useState('All');
  const optionsAirlines = ['Airline A', 'Airline B', 'Airline C', 'Airline D'];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FilterDropdown
      filter="Airlines"
      options={optionsAirlines}
      selectedOption={selectedOption}
      onOptionChange={handleOptionChange}
      searchEnabled
    />
  );
};

// Classes Filter Component
const ClassesFilter = () => {
  const [selectedOption, setSelectedOption] = useState('All');
  const optionsClasses = ['Economy', 'Premium Economy', 'Business Class', 'First Class'];

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


// Aircraft Filter Component
const AircraftFilter = () => {
  const [selectedOption, setSelectedOption] = useState('All');
  const optionsAircraft = ['Aircraft A', 'Aircraft B', 'Aircraft C'];

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

const Distance = () => {
  const [selectedOption, setSelectedOption] = useState('All');
  const optionsAlliances = [];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FilterDropdown
      filter="Distance"
      options={optionsAlliances}
      selectedOption={selectedOption}
      onOptionChange={handleOptionChange}
    />
  );
};

const Duration = () => {
  const [selectedOption, setSelectedOption] = useState('All');
  const optionsAlliances = [];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FilterDropdown
      filter="Duration"
      options={optionsAlliances}
      selectedOption={selectedOption}
      onOptionChange={handleOptionChange}
    />
  );
};

// RideFilter Main Component
const RideFilter = () => {
  return (
    <Box sx={{
      marginLeft: '20px',
    }}>
      <Divider />
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
        <Prices />
        <AlliancesFilter />
        <AirlinesFilter />
        <ClassesFilter />
        <AircraftFilter />
        <Distance />
        <Duration />
      </Box>
    </Box>
  );
};

export default RideFilter;
