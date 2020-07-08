var StringGeneratorBox = React.createClass({
  handleGenerate: function() {
    var length = this.state.length;

    this.setState(function() {
      $.ajax({
        url: this.props.url,
        dataType: 'text',
        type: 'POST',
        data: {
          "length": length
        },
        success: function(data) {
          this.setState({
            length: length,
            string: data,
            mode: "edit"
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url,
            status, err.toString()
          );
        }.bind(this)
      });
    });
  },
  handlePredict: function() {
    var text = this.state.text;
    var label = this.state.label;
    this.setState(function() {
      $.ajax({
        url: this.props.url,
        dataType: 'text',
        type: 'POST',
        data: {
          "text": 'text',
          'label': 'lable'
        },
        success: function(data) {
          this.setState({
            text: text,
            label: label,
            dic: data,
            mode: "edit"
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url,
            status, err.toString()
          );
        }.bind(this)
      });
    });
  },
  handleEdit: function() {
    var new_string = this.state.string;
    this.setState(function() {
      $.ajax({
        url: this.props.url,
        type: 'PUT',
        data: {
          "another_string": new_string
        },
        success: function() {
          this.setState({
            length: new_string.length,
            string: new_string,
            mode: "edit"
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url,
            status, err.toString()
          );
        }.bind(this)
      });
    });
  },
  handleDelete: function() {
    this.setState(function() {
      $.ajax({
        url: this.props.url,
        type: 'DELETE',
        success: function() {
          this.setState({
            length: "8",
            string: "",
            mode: "create"
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url,
            status, err.toString()
          );
        }.bind(this)
      });
    });
  },
  handleLengthChange: function(length) {
    this.setState({
      length: length,
      string: "",
      mode: "create"
    });
  },
  handleTextChange: function(text) {
    this.setState({
      text: text,
      string: "",
      mode: "predict"
    });
  },
  handleLabelChange: function(label) {
    this.setState({
      label:label,
      string: "",
      mode: "predict"
    });
  },
  handleStringChange: function(new_string) {
    this.setState({
      length: new_string.length,
      string: new_string,
      mode: "edit"
    });
  },
    handleDicChange: function(new_dic) {
    this.setState({
      text: new_dic.text,
      label: new_dic.label,
      dic: new_dic,
      mode: "edit"
    });
  },
  getInitialState: function() {
    return {
      length: "8",
      string: "",
      mode: "create"
    };
  },
  render: function() {
    return (
      <div className="stringGenBox">
            <StringGeneratorForm onCreateString={this.handleGenerate}
                                 onPredictString={this.handlePredict()}
                                 onReplaceString={this.handleEdit}
                                 onDeleteString={this.handleDelete}
                                 onLengthChange={this.handleLengthChange}
                                 onTextChange={this.handleTextChange}
                                 onLabelChange={this.handleLabelChange}
                                 onDicChange={this.handleDicChange}
                                 onStringChange={this.handleStringChange}
                                 mode={this.state.mode}
                                 text={this.state.text}
                                 label={this.state.label}
                                 dic={this.state.dic}
                                 length={this.state.length}
                                 string={this.state.string}/>
      </div>
    );
  }
});

var StringGeneratorForm = React.createClass({
  handleCreate: function(e) {
    e.preventDefault();
    this.props.onCreateString();
  },
    handlePredict: function(e) {
    e.preventDefault();
    this.props.onPredictString();
  },
  handleReplace: function(e) {
    e.preventDefault();
    this.props.onReplaceString();
  },
  handleDelete: function(e) {
    e.preventDefault();
    this.props.onDeleteString();
  },
  handleLengthChange: function(e) {
    e.preventDefault();
    var length = React.findDOMNode(this.refs.length).value.trim();
    this.props.onLengthChange(length);
  },
  handleStringChange: function(e) {
    e.preventDefault();
    var string = React.findDOMNode(this.refs.string).value.trim();
    this.props.onStringChange(string);
  },
  render: function() {
    if (this.props.mode == "create") {
      return (
        <div>
           <input  type="text" ref="length" defaultValue="8" value={this.props.length} onChange={this.handleLengthChange} />
           <button onClick={this.handleCreate}>Give it now!</button>
        </div>
      );
    } else if (this.props.mode == "edit") {
      return (
        <div>
           <input type="text" ref="string" value={this.props.string} onChange={this.handleStringChange} />
           <button onClick={this.handleReplace}>Replace</button>
           <button onClick={this.handleDelete}>Delete it</button>
        </div>
      );
    } else if (this.props.mode == "predict") {
      return (
        <div>
           <input  type="text" ref="text" defaultValue="8" value={this.props.text} onChange={this.handleTextChange} />
           <input  type="text" ref="label" defaultValue="8" value={this.props.label} onChange={this.handleLabelChange} />
           <button onClick={this.handlePredict}>Classify!</button>
        </div>
      );
    }

    return null;
  }
});

// React.render(
//   <StringGeneratorBox url="/generator" />,
//   document.getElementById('generator')
// );
React.render(
  <StringGeneratorBox url="/predict" />,
  document.getElementById('predict')
);