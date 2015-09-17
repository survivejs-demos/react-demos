import React from 'react';

export default class Wrapper extends React.Component {
  render() {
    return (
      <AjaxGet url='data.json' childProp='json'>
        <Viewer json={{}}/>
      </AjaxGet>
    );
  }
}

class AjaxGet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.fetchData = this.fetchData.bind(this);
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
    else {
      // TODO: compare children equality
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
  updateChildren(data) {
    const props = this.props;
    const child = this.state.children;

    const newChild = React.cloneElement(
      child,
      {
        // es7 object spread (stage 1) to copy props
        ...child.props, // retain possible existing props
        [props.childProp]: data
      }
    );

    this.setState({
      data: data,
      children: newChild
    })
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
    return <div>json: {this.props.json}</div>;
  }
}
