import React from 'react';
import PropTypes from 'prop-types';

export default class App extends React.Component {
  static propTypes: {
    fetch: PropTypes.func.isRequired
  }

  componentWillMount() {
    // Call the action in componentWillMount, not componentDidMount, so it
    // is called during both server-side and client-side rendering.
    // The actual API call will only be made once, because the browser will wait
    // for the push_promise to be fulfilled, rather than making another call.
    const fetch = this.props.fetch;
    fetch('/api/things')
      .then(
        things => this.setState({ things })
      );
      // In the future, you will be able to write code like this, if needed:
      // .chain(things => fetch(`/api/things/${things[0].id}`))
      // .then(thing => {
      //   this.setState({ thing })
      // });
  }

  render() {
    return (
      <div>
        <h1>Fetch and Push</h1>
        <p>
          This page calls the api endpoint <code>/api/things</code>.
          The result is displayed below.
        </p>
        {this.props.foo ?
          <samp>{JSON.stringify(this.state.things)}</samp> :
          <progress />
        }
        <p>
          In Chrome's developer tools, you should be able to see this
          under the network tab. The value of the "Initiator" column
          will include the word "Push".
        </p>
        <p>
          For a more detailed look at what's going on, check out
          Chrome's net internals,
          at: <samp>chrome://net-internals/#http2</samp>
        </p>
      </div>
    );
  }
}
