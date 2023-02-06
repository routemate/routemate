import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
const axios = require('axios');
const EasyPost = require('@easypost/api');

const Form = ({ helper }) => {
  const [date, setDate] = useState(dayjs('2023-02-05T21:11:54'));
  const [item, setItem] = useState('');
  const [vendor, setVendor] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [newOrder, setNewOrder] = useState({});
  const [doa, setDoa] = useState(dayjs('2023-02-05T21:11:54'));

  const handleChange = (newDate) => {
    setDate(newDate);
  };

  // const handleChangeDoa = (newDoa) => {
  //   setDoa(newDoa);
  // };

  const apiKey = new EasyPost(
    'EZAK8d76956049b7424bb1b5250bef088610viXcDlnKAnGYqp6eyYyMkA'
  );

  tracker.save().then(console.log);
  const getTrackingInfo = async (trackingNum) => {
    try {
      const tracker = await apiKey.Tracker.retrieve(trackingNum);
      const shipment = await apiKey.Shipment.retrieve(tracker.shipment_id);

      console.log(`Order Date: ${shipment.created_at}`);
      console.log(`Item: ${shipment.reference}`);
      console.log(`Delivery Date: ${tracker.est_delivery_date}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setNewOrder({
      vendor: vendor,
      orderDate: date,
      item: item,
      trackingId: trackingId,
      eta: doa,
    });
    getTrackingInfo(trackingNum);

    setItem('');
    setVendor('');
    setTrackingId('');

    console.log(newOrder);
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
        <form action='https://www.ups.com/track' method='get'>
          <input type='text' placeholder='Hi' />
        </form>
        <Button variant='outlined' size='medium ' type='submit'>
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default Form;
/*


*/

/*

const calendarField = document.querySelector('.date-picker');

const calendar = flatpickr(calendarField, {
    enableTime: false,
    dateFormat: "Y-m-d",
})
 */
//declare const for the components in the form
// const Vendor = document.querySelector('.Vendor');
// const OrderDate = document.querySelector('.Date');
// const Item = document.querySelector('.Item');
// const TrackingId = document.querySelector('.Tracking');
// let Eta;

//make a request to the API

// axios
//   .get('put tracker api url here', {
//     params: {
//       trackingId: TrackingId,
//     },
//   })
//   .then((response) => {
//     Eta = response;
//   });

//create an obj for the new order include delivery date

// const newOrder = {
//   vendor: Vendor,
//   orderDate: OrderDate,
//   item: Item,
//   trackingId: TrackingId,
//   eta: Eta,
// };

// //invoke helper function passing in new order
// helper(newOrder);

// //post request to /orders with new object
// axios.post('/orders', {
//   newOrder,
// });

// const apiKey = '708ead82-2b28-4b2a-8a81-65196fe2fa21';
// const trackingNumber = '1Z0V069A0322023046'
// const carrier = 'amazon'
//https://api.tracktry.com/v1/trackings/{carrier_code}/{tracking_number}

// axios.get(`https://api.tracktry.com/v1/trackings/?tracking_number=${trackingNumber}&carrier_code=${carrier}`, {
//   headers: {
//    "Content-Type": 'application/json',
//    "Tracktry-Api-Key": "708ead82-2b28-4b2a-8a81-65196fe2fa21",
//   }
// })

// .then((response) => {
//     const deliveryDate = response.data.delivery_date;
//     console.log('Date is ', deliveryDate);
// })

/*
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date of Arrival"
            inputFormat="MM/DD/YYYY"
            value={doa}
            onChange={handleChangeDoa}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
    */
