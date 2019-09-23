import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Grommet, ResponsiveContext, Button } from 'grommet'
import styled, { createGlobalStyle } from 'styled-components'
import ProductsPage from '../ProductsPage/index'
import Header from '../../components/Header/index'
import Footer from '../../components/Footer/index'

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

const App = () => (
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
)

export default App;
