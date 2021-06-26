import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import SignUp from '../routes/SignUp'
const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/signup">
          <SignUp />
        </Route>
      </BrowserRouter>
    </>
  )
}

export default AppRouter
