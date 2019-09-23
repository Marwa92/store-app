import React from 'react'
import Loadable from 'react-loadable'

import LoadingIndicator from '../LoadingIndicator/index'

export default Loadable({
  loader: () => import('./index'),
  loading() {
    return <LoadingIndicator size={2} />
  },
})
