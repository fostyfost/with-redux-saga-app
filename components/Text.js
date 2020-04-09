import React from 'react'
import {useSelector} from "react-redux";

const Text = () => {
  const text = useSelector(state => state.text)

  console.log('text', text);

  return <h1>{text}</h1>
}

export { Text }
