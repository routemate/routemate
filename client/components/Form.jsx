import React, { useState } from 'react';
const axios = require('axios');


const Form = ({helper}) => {
  const handleClick = (event) => {
    //declare const for the components in the form
    const Vendor = document.querySelector('.Vendor');
    const OrderDate = document.querySelector('.Date');
    const Item = document.querySelector('.Item');
    const TrackingId = document.querySelector('.Tracking');
    let Eta;

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

    const newOrder = {
      vendor: Vendor,
      orderDate: OrderDate,
      item: Item,
      trackingId: TrackingId,
      eta: Eta,
    };

    //invoke helper function passing in new order
    helper(newOrder);

    //post request to /orders with new object
    axios.post('/orders', {
      newOrder,
    });
  };

  return (
    <>
      <div className="form">
        <input name="item" type="text" placeholder="Item" />
        <input name="orderDate" type="text" placeholder="Date" />
        <input name="vendor" type="text" placeholder="Vendor" />
        <input name="trackingId" type="text" placeholder="Tracking" />
        <input name="eta" type="text" placeholder="ETA" />
      </div>
      <button onClick={handleClick}> Submit </button>
    </>
  );
};

/*


*/

/*

const calendarField = document.querySelector('.date-picker');

const calendar = flatpickr(calendarField, {
    enableTime: false,
    dateFormat: "Y-m-d",
})
 */

export default Form;
