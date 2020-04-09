import React from 'react'
import {saga1Action} from "../actions";
import {Text} from "../components/Text";

class Index extends React.Component {
  static async getInitialProps(props) {
    const { store } = props.ctx
    store.dispatch(saga1Action('THIS IS SAGA 1 ACTION PAYLOAD'))
    return {}
  }

  render() {
    return (
        <div>
          <Text/>
        </div>
    )
  }
}

export default Index
