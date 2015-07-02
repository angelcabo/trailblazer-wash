/** @jsx React.DOM */
var React = require('react');
var ImageButton = require('./image-button');
var Popover = require('./popover');

module.exports = React.createClass({

  render: function () {
    var content = "Your map is now public and viewable at:";
    var makePrivateText = "Make Private";
    var shareText = this.props.visible ? 'Shared' : 'Share';
    var shareTitle = this.props.visible ? "Change map privacy" : "Allow others to view";

    return  <div>
              <Popover display={this.props.popover} id="share-popover">
                <div className="share-message" >
                  {content}
                </div>
                <div className="share-url" >
                  <a href={this.props.mapURL}>{this.props.mapURL}</a>
                </div>
                <button
                  onClick={this.makePrivate}
                  className="btn btn-make-private"
                  type="button" >
                  {makePrivateText}
                </button>
              </Popover>
              <button
                className="btn btn-share"
                type="button"
                title={shareTitle}
                onClick={this.share} >
                {shareText}
              </button>
            </div>;
  },

  makePrivate: function () {
    if (this.props.visible) {
      this.props.actions.makeAssignmentHidden(this.props.localAssignmentId);
    };
    this.props.togglePopover();
  },

  share: function () {
    if (!this.props.visible) {
      this.props.actions.makeAssignmentVisible(this.props.localAssignmentId);
    };
    this.props.togglePopover();
  },

  togglePopover: function () {
    var bool = !this.state.popoverDisplay;
    this.setState({popoverDisplay: bool});
    return false;
  }
})