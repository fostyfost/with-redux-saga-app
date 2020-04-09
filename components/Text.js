import React, { useCallback } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {addUsersAction, getUsersAction} from "../actions";

const Text = () => {
  const text = useSelector(state => state.text)
  const users = useSelector(state => JSON.stringify(state.users, null, 4))

  const dispatch = useDispatch()
  const getUsers = useCallback(() => {
      dispatch(addUsersAction(['loading...']))
      setTimeout(() => {
          dispatch(getUsersAction())
      }, 1000)
  }, [dispatch])

  return (
      <section>
        <h1>{text}</h1>
        <p>{users}</p>
        <button onClick={getUsers}>get users</button>
      </section>
  )
}

export { Text }
