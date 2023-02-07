import React, { useState } from 'react';

const Item = ({ item, orderDate, vendor, trackingId, eta, status }) => {
  // let order = orderDate.$d.toString();
  console.log('eta', eta);

  return (
    <>
      <div className='container'>
        <div className='item'>{item}</div>
        <div className='orderDate'>{orderDate}</div>
        <div className='vendor'>{vendor}</div>
        <div className='trackingId'>{trackingId}</div>
        <div className='status'>{status}</div>
        <div className='eta'>{eta}</div>
      </div>
    </>
  );
};

export default Item;
