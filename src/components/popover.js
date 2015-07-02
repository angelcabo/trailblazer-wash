/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
  
  render: function () {
    var arrowStyle = this.props.arrowStyle;
    var display = this.props.display ? 'block' : 'none';
    var inlineStyle = {
      display: display
    }

    return  <div 
              id={this.props.id}
              className="popover top" 
              style={inlineStyle} >
              <div className="arrow" style={arrowStyle} />
              <div className="popover-content">
                {this.props.children}
              </div>
            </div>;
  }
})