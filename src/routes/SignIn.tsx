import React, { useState } from 'react'
import { client, gql } from '../client'
const SignIn = () => {
  const [Name_Email, SetName_Email] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget

    switch (name) {
      case 'Name_Email':
        SetName_Email(value)
        break
      case 'password':
        setPassword(value)
        break
      default:
        break
    }
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Name_Email && password) {
      const emailRule =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

      const { data } = await client.query({
        query: gql`
          query {
            signIn(${
              emailRule.test(Name_Email) ? `email: "${Name_Email}" ` : `name: "${Name_Email}"`
            }, password: "${password}") {
              ok
              token
              error
            }
          }
        `
      })
      console.log(data)
      setError('')
    } else {
      setError('필수항목은 작성해야지!!')
    }
  }

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="Name_Email">
            <span>name/email</span>
            <input type="text" name="Name_Email" onChange={onChange} />
          </label>
          <label htmlFor="password">
            <span>password</span>
            <input type="password" name="password" onChange={onChange} />
          </label>
          <input type="submit" />
        </form>
      </div>
      <div>{error}</div>
    </>
  )
}

export default SignIn
