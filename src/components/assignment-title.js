/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    //TODO remove state from this class and place in higher level 'popup' parent component.
    return {
      editable: false,
      title: this.props.assignment.title
    };
  },

  componentDidMount: function () {
    chrome.runtime.onMessage.addListener( function (message) {
      switch (message.action) {
        case this.props.constants.__change__:
          if (message.storeName === "AssignmentStore" &&
              message.payload.assignment &&
              message.payload.assignment.localId === this.props.assignment.localId) {
            this.props.assignment = message.payload.assignment;
            this.setState({ title: this.props.assignment.title });
            this.forceUpdate();
          }
      }
    }.bind(this));
  },

  render: function () {
    var editable = this.state.editable;


    if (editable) {
      return <input
              className="map-title"
              type="text"
              autoFocus
              value={this.state.title}
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onKeyPress={this.onKeyPress} />;
    } else {
      return <a href="#" onClick={this.onIconClick} className="map-title">
                <span>{this.state.title}</span>
                <img
                  onClick={this.onIconClick}
                  src="/assets/icons/editable-icon.svg" />
              </a>;
    };
  },

  onFocus: function(evt) {
    evt.target.select();
  },

  onKeyPress: function(evt) {
    if (evt.key === 'Enter') this.onBlur();
    if (evt.key === 'Escape') {
      this.setState({title: this.props.assignment.title});
      this.setState({editable: false});
      this.onBlur();
    }
  },

  onIconClick: function (evt) {
    evt.preventDefault();
    this.setState({editable: true});
  },

  onChange: function (evt) {
    this.setState({title: evt.target.value});
  },

  onBlur: function (evt) {
    this.setState({editable: false});
    if (this.state.title !== this.props.assignment.title) {
      this.props.actions.updateAssignmentTitle(this.props.assignment.localId, this.state.title);
    };
  }
});