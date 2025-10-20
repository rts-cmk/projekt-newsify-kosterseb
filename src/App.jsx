import React from 'react'
import { useRouter } from './hooks/useRouter.jsx'

const renderRoute = (route) => {
  switch (route) {
    case 'home':
      return <div>Home Component</div>
    case 'popular':
      return <div>Popular Component</div>
    case 'archive':
      return <div>Archive Component</div>
    case 'settings':
      return <div>Settings Component</div>
    default:
      return <div>Not Found</div>
  }
}

function App() {

  return (
    <>
      <div>test</div>
    </>
  )
}

export default App
