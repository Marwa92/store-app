import React, { useState, useEffect } from 'react';
import axios from '../../utils/API';
import { Box, Heading } from 'grommet'



const OrdersPage = () => {

  const [ordersList, setOrdersList] = useState([])
  async function fetchOrdersAPI() {
    const response = await axios('/orders');
    console.log('response:',response.data);
    setOrdersList(response.data)
  }

  useEffect(() => {
    fetchOrdersAPI()
  }, [])

  console.log('ordersList:', ordersList);
  
  return(
    <React.Fragment>
    <Heading margin="medium" size="small">Products You May Like</Heading>
    <Box margin={{ horizontal: 'xlarge' }}>
test
    </Box>
  </React.Fragment>

)
}

export default OrdersPage;
