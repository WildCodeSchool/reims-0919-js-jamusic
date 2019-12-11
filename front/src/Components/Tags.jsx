import React from 'react'

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.tags.map(tag => (
          <div key={tag.id}>
            <p>{tag.status}</p>
            <p>{tag.style}</p>
            <p>{tag.instrument}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Tags