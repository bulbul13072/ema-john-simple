import React from 'react';
import fakeData from '../../fakeData/index';


const Inventory = () => {
    const handleAddInventory = ()=> {
        console.log('before post', fakeData.length);
        fetch('http://localhost:3000/addProduct', {        
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fakeData) // body data type must match "Content-Type" header
      })
      .then(res => res.json())
      .then(data => {
          console.log('post successful', data);
      })
    }
    return (
        <div>
            <h1> Add inventory to sell more..</h1>
            <button onClick={handleAddInventory}>Add Inventory</button>
        </div>
    );
};

export default Inventory;