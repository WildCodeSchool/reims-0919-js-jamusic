import React from 'react'

const tests = [
  {
    instrument: 'guitare',
    status: 'pro',
    style: "60's rock"
  },
  {
    instrument: 'pan flute',
    status: 'amateur',
    style: "alternative" 
  }
]

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.tags.map(tag => (
          <div>
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