import React, { useState, useEffect } from 'react';
import axios from '../../utils/API';
import { Box, Heading } from 'grommet'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import './style.css'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledDiv = styled.div`
font-weight: 700;
font-size: 16px;
height: 35px;
margin-top: 8px;
padding-left: 5px;
`

const columns = [
 {
    Header: () => (
            <StyledDiv>
              <i />
              {' '}
                  Order Id
            </StyledDiv>
          ),
    id: 'orderId',
    accessor: (order)=>order.OrderId,
    width: 150,
  }, 
  {
    Header: () => (
        <StyledDiv>
          <i />
          {' '}
              Total Price
        </StyledDiv>
      ),
    id: 'price',
    // accessor: (order)=>order.Products.map(product => product.ProductId).join(),
  }, 
  {
    Header: () => (
        <StyledDiv>
          <i />
          {' '}
              Payment Method
        </StyledDiv>
      ),
    id: 'payment',
    accessor: (order)=>order.PaymentType,
  }, 
   ]
const OrdersPage = (props) => {
  const { productsList } = props  
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
    <Heading margin="medium" size="small">Orders</Heading>
   { ordersList && ordersList.length > 0
      ? (
        <Box overflow="scroll" fill responsive>
          <ReactTable
            data={ordersList}
            columns={columns}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </Box> )
      : <div>There is no orders</div>}
    </React.Fragment>

)
}

OrdersPage.propTypes = {
    productsList: PropTypes.arrayOf(PropTypes.any).isRequired,
    }
export default OrdersPage;
