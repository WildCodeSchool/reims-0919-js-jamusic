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
        {tests.map(test => (
          <div>
            <p>{test.instrument}</p>
            <p>{test.status}</p>
            <p>{test.style}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Tags