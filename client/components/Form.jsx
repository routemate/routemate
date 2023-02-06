import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
const axios = require('axios');

const Form = ({ helper }) => {
  const [date, setDate] = useState(dayjs('2023-02-05T21:11:54'));
  const [item, setItem] = useState('');
  const [vendor, setVendor] = useState('');
  const [trackingId, setTrackingId] = useState('');
  let estimatedArrival;

  const handleChange = (newDate) => {
    setDate(newDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const posting = () => {
      const postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Tracking-Api-Key': '' },
        body: { tracking_number: trackingId, courier_code: vendor },
      };

      const response = fetch(
        'https://api.trackingmore.com/v4/trackings/create',
        postOptions
      )
        .then((response) => response.json())
        .catch((err) => console.error(err));
    };

    const fetching = () => {
      posting();

      const getOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Tracking-Api-Key': 'ov6wq5gm-wrbn-1xao-wvsm-jote0jqx6acj',
        },
      };

      function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return `${formattedDate}`;
      }

      fetch(
        `https://api.trackingmore.com/v4/trackings/get?tracking_numbers=${trackingId}&courier_code=${vendor}`,
        getOptions
      )
        .then((response) => response.json())
        .then((response) => {
          estimatedArrival =
            response.data[0].origin_info.trackinfo[0].checkpoint_date;
          const status = response.data[0].delivery_status;

          const newOrder = {
            vendor,
            orderDate: formatDate(date.$d.toString()),
            item,
            trackingId,
            status,
            eta: formatDate(estimatedArrival),
          };

          setItem('');
          setVendor('');
          setTrackingId('');

          helper(newOrder);
        })
        .catch((err) => console.error(err));
    };

    fetching();

    fetch('/orders');
  };

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1 },
        '& button': { m: 1 },
      }}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}>
      autoComplete="off" onSubmit={handleSubmit}
      className = 'box' >
      <div>
        <TextField
          size='small'
          label='Item'
          variant='outlined'
          value={item}
          onChange={(event) => setItem(event.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label='Date'
            inputFormat='MM/DD/YYYY'
            value={date}
            onChange={handleChange}
            renderInput={(params) => <TextField size='small' {...params} />}
          />
        </LocalizationProvider>
        <TextField
          size='small'
          label='Vendor'
          variant='outlined'
          value={vendor}
          onChange={(event) => setVendor(event.target.value)}
        />
        <TextField
          size='small'
          label='Tracking ID'
          variant='outlined'
          value={trackingId}
          onChange={(event) => setTrackingId(event.target.value)}
        />
        <Button variant='outlined' size='medium ' type='submit'>
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default Form;
