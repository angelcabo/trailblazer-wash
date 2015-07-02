/** @jsx React.DOM */
var React       = require('react')
 ,  navigate    = require('react-mini-router').navigate;


module.exports = React.createClass({
  getInitialState: function () {
    return {
      show: true
    }
  },

  render: function () {
    var klass = this.state.show ? 'show' : 'destroy';

                //TODO change path
    return  <div className={klass} >
              <li key={this.props.item.id} onClick={this.onClick}>

                {this.props.item.title}

                <a onClick={this.onClickDestroy}>
                  <img src="/assets/icons/delete-icon.svg" />
                </a>
              </li>
            </div>;
  },

  componentDidMount: function () {
    this.getDOMNode().addEventListener('webkitTransitionEnd', this.destroy)
  },

  onClick: function () {
    var id = this.props.item.localId;
    navigate('/assignments/' + id);
  },

  onClickDestroy: function (evt) {
    evt.stopPropagation();

    var confirmation = window.confirm("Are you sure you want to delete " + this.props.item.title + "?");

    if (confirmation) {
      if (this.isMounted()) this.setState({show: false});
      this.props.actions.destroyAssignment(this.props.item.localId);
    }
  }
});