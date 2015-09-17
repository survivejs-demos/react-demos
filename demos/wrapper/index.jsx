import React from 'react';

export default class Wrapper extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.changeProp = this.changeProp.bind(this);

    this.state = {
      prop: 'json'
    };
  }
  render() {
    const prop = this.state.prop;

    return (
      <div>
        <AjaxGet url='data.json' childProp={prop}>
          <Viewer json={{}} other={{}} />
        </AjaxGet>
        <button onClick={this.changeProp}>Change prop</button>
      </div>
    );
  }
  changeProp() {
    const prop = this.state.prop;

    this.setState({
      prop: prop === 'json' ? 'other' : 'json'
    });
  }
}

class AjaxGet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.fetchData = this.fetchData.bind(this);
    this.updateChildProp = this.updateChildProp.bind(this);
    this.updateChildren = this.updateChildren.bind(this);

    // no data initially
    this.state = {
      data: {},
      children: props.children
    };

    this.fetchData(this.props.url);
  }
  componentWillReceiveProps(nextProps) {
    const props = this.props;

    if(props.url !== nextProps.url) {
      this.fetchData();
    }
    else if(props.childProp !== nextProps.childProp) {
      this.updateChildProp(this.state.data, nextProps);
    }
    else {
      this.updateChildren(this.state.data);
    }
  }
  fetchData(url) {
    fetch(url).then((res) => {
      return res.json();
    }).then(this.updateChildren).catch((err) => {
      console.error(err);
    });
  }
  updateChildProp(data, nextProps) {
    const props = this.props;
    const child = this.state.children;
    const childProps = child.props;

    // note that doing this will lose possible initial value
    // it would be possible to retain that with some extra state
    delete childProps[props.childProp];

    const newChild = React.cloneElement(
      child,
      {
        ...childProps,
        [nextProps.childProp]: data
      }
    );

    this.setState({
      data: data,
      children: newChild
    });
  }
  updateChildren(data) {
    const props = this.props;
    const child = this.state.children;

    const newChild = React.cloneElement(
      child,
      {
        ...child.props, // retain possible existing props
        [props.childProp]: data
      }
    );

    this.setState({
      data: data,
      children: newChild
    });
  }
  render() {
    return <div>{this.state.children}</div>
  }
}

AjaxGet.propTypes = {
  url: React.PropTypes.string.isRequired,
  childProp: React.PropTypes.string.isRequired
};

class Viewer extends React.Component {
  render() {
    return (
      <div>
        <div>{'json: ' + JSON.stringify(this.props.json)}</div>
        <div>{'other: ' + JSON.stringify(this.props.other)}</div>
      </div>
    );
  }
}
