import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ProductsPage from '../ProductsPage/index'



const App = () => (
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
)

export default App;
