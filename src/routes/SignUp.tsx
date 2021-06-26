import React, { useState } from 'react'
import { client, gql } from '../client'

const SignUp = () => {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [nickName, setNickName] = useState('')
  const [password, setPassword] = useState('')
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget

    switch (name) {
      case 'email':
        setEmail(value)
        break
      case 'name':
        setName(value)
        break
      case 'nickName':
        setNickName(value)
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

    if (email && name && nickName && password) {
      const { data } = await client.mutate({
        mutation: gql`
      mutation{
        signUp(email: "${email}", name: "${name}", nickName: "${nickName}", password: "${password}") {
          ok
          error
        }
      }
     `
      })
      const { ok, error } = data.signUp
      if (ok) setError(error)
      else setError('')
    } else {
      setError('필수항목을 다 써야지')
    }
  }
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <label>
            <span>email</span>
            <input type="text" name="email" onChange={onChange} />
          </label>
          <label>
            <span>name</span>
            <input type="text" name="name" onChange={onChange} />
          </label>
          <label>
            <span>nickname</span>
            <input type="text" name="nickName" onChange={onChange} />
          </label>
          <label>
            <span>password</span>
            <input type="password" name="password" onChange={onChange} />
          </label>
          <input type="submit" />
        </form>
        <div>{error}</div>
      </div>
    </>
  )
}

export default SignUp
