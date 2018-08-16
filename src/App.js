import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import mapDispatchToProps from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelName: ''
    }
  }

  componentDidMount() {
    this.props.connect(window.location.pathname);
  }
  render() {
    const props = this.props.channels.channels;
    const channels = props.map((ch, index) => {
      return (
        <tr key={index}><td>{ch.name}</td></tr>
      );
    });

    return([
        (<div>
        <input value={this.state.channelName} onChange={(e) => this.setState({channelName: e.target.value})}/>
        <button
          disabled={!this.props.connection.connected}
          onClick={() => this.props.createChannel(this.state.channelName)}
        >+</button>
      </div>),
      (<table><tbody>{channels}</tbody></table>)
    ])
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
