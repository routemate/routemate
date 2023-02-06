import React, { useState } from 'react';

const Item = ({ item, orderDate, vendor, trackingId, eta }) => {
  // let order = orderDate.$d.toString();
  console.log('eta', eta);
  return (
    <>
      <div>{item}</div>
      <div>{orderDate}</div>
      <div>{vendor}</div>
      <div>{trackingId}</div>
      <div>{eta}</div>
    </>
  );
};

export default Item;
