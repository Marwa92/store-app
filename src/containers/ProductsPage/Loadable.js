/**
 *
 * Asynchronously loads the component for ProductPage
 *
 */

import React from 'react'
import Loadable from 'react-loadable'

import LoadingIndicator from '../../components/LoadingIndicator/index'

export default Loadable({
  loader: () => import('./index'),
  loading() {
    return <LoadingIndicator size={7} />
  },
})
