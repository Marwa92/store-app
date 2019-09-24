import React, { Fragment, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Grommet, ResponsiveContext, Button } from 'grommet'
import styled, { createGlobalStyle } from 'styled-components'
import ProductsPage from '../ProductsPage/Loadable'
import OrdersPage from '../OrdersPage/Loadable'
import Header from '../../components/Header/index'
import Footer from '../../components/Footer/index'
import axios from '../../utils/API';

const Container = styled.body`
height: 100%;
margin: 0px;
`
const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
min-height: 80vh;
position: relative;
`
const Push = styled.div`
height: 20vh;
`
const GlobalStyle = createGlobalStyle`
  body{
    margin: 0px;
    padding: 0px;
  }
`
const defaultTheme = {
  global: {

    colors: {
      brand: '#000000',
      white: '#ffffff',
      black: '#000000',
      chinese_black: '#141414',
    },
    font: {
      family: 'Open Sans',
    },
  },
  button: {
    border: {
      radius: '7px',
    },
  },
}

const App = () =>{ 
  const [productsList, setProductsList] = useState([])
  const [ordersList, setOrdersList] = useState([])
  async function fetchProductsAPI() {
    const response = await axios('/products');
    console.log('response:',response.data);
    setProductsList(response.data)
  }

  useEffect(() =>{
    fetchProductsAPI()
  }, [])
  // async function fetchOrdersAPI() {
  //   const response = await axios('/orders');
  //   console.log('response:',response.data);
  //   setOrdersList(response.data)
  // }

  // useEffect(() =>{
  //   fetchProductsAPI().then(fetchOrdersAPI())
  // }, [])

console.log('productsList:', productsList);


  return(
  <Fragment>
   <Grommet theme={defaultTheme} full>
    <ResponsiveContext.Consumer>
    {(size) => {
      console.log('size:', size);
     return(
      <Container>
      <Wrapper>
          <Header />
          <Switch>
              <Route
                exact
                path="/"
                render={
                ProductsPageProps => (
                  <ProductsPage
                    {...ProductsPageProps}
                    productsList={productsList}
                  />
                )
              }
              />
                <Route
                path="/orders"
                render={
                OrdersPageProps => (
                  <OrdersPage
                    {...OrdersPageProps}
                    productsList={productsList}
                  />
                )
              }
              />
                </Switch>
                <Push />
              </Wrapper>
             <Footer />
          </Container>
       )
    }}
    </ResponsiveContext.Consumer>
   </Grommet>
   <GlobalStyle />
  </Fragment>
)}

export default App;
