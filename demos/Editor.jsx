// MIT: FormidableLabs/component-playground
import React from 'react';
import CodeMirror from 'codemirror';

const Editor = React.createClass({
  propTypes: {
    theme: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    codeText: React.PropTypes.string,
    onChange: React.PropTypes.func,
    style: React.PropTypes.object,
    className: React.PropTypes.string
  },
  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
      mode: 'javascript',
      lineNumbers: false,
      lineWrapping: true,
      smartIndent: false,
      matchBrackets: true,
      theme: this.props.theme,
      readOnly: this.props.readOnly
    });
    this.editor.on('change', this._handleChange);
  },

  componentDidUpdate() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  },

  componentWillReceiveProps(nextProps) {
    const codeText= nextProps.codeText;

    // TODO: figure out how to retain cursor state in a neat way
    // e.target.selectionStart, e.target.selectionEnd
    if(this.props.codeText !== codeText) {
      this.editor.setValue(codeText);
    }
  },

  _handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  },

  render() {
    var editor = <textarea ref="editor" defaultValue={this.props.codeText} />;

    return (
      <div style={this.props.style} className={this.props.className}>
        {editor}
      </div>
    );
  }
});

export default Editor;