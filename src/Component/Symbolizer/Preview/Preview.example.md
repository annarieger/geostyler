This demonstrates the use of `Preview`.

```jsx
const React = require('react');
const { Preview } = require('../../../index');
require('antd/dist/antd.css');

class PreviewExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'Circle',
        color: '#ff0000',
        strokeColor: '000000',
        strokeWidth: 3,
        radius: 10
      }]
    };
  }

  render() {
    const {
      symbolizers
    } = this.state;

    return (
      <Preview
        symbolizers={symbolizers}
        hideEditButton={true}
      />
    );
  }
}

<PreviewExample />
```
