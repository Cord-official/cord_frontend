import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import SignUp from '../routes/SignUp'
import SignIn from '../routes/SignIn'
const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
      </BrowserRouter>
    </>
  )
}

export default AppRouter
