import React, { useState } from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'
const SignUp = () => {
  const client = new ApolloClient({
    link: createHttpLink({ uri: 'http://localhost:4000/graphql' }),
    cache: new InMemoryCache()
  })
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
    if (!email && name && nickName && password) {
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
      console.log(data)
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
            <input type="text" name="name" />
          </label>
          <label>
            <span>nickname</span>
            <input type="text" name="nickName" />
          </label>
          <label>
            <span>password</span>
            <input type="password" name="password" />
          </label>
          <input type="submit" />
        </form>
        <div>{error}</div>
      </div>
    </>
  )
}

export default SignUp
