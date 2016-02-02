## Requirements:

    lussatech-cli

-----
## Content:
* [Step 1: Get the code](#step1)
* [Step 2: Generate files](#step2)
* [Step 3: Customize files](#step3)

-----
<a name="step1"></a>
### Step 1: Get the code

    npm install react-native-notification-displayer

-----
<a name="step2"></a>
### Step 2: Generate files

    lussatech generate react-native-notification-displayer

-----
<a name="step3"></a>
### Step 3: Customize files

    react-native-project
    ...
    |_ lib
      |_ react-native-notification-displayer
        |_ Example
        |_ ...
        |_ Notification.js
        |_ ...
        |_ Server.js
    ...

#### Setting up your API end-point at `Server.js`, e.g.
```javascript
# lib/react-native-notification-displayer/Server.js

export const host = 'http://example.com';
export default {
  notification: {
    browse: function () {
      let url = host + '/notification',    // API URI for browse notifications
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
    view: function (id) {                  // API URI for view notification based on id
      let url = host + '/notification/' + id,
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
    ...
  },
  ...
};
```

#### Call your API URI for browse and view notification at `Notification.js`, e.g.
```javascript
# lib/react-native-notification-displayer/Notification.js

...
import api, {host} from './Server';

class Display extends Component {
  ...
  componentDidMount() {
    api.notification.view(id)              // call API URI for view notification based on id
      .then((response) => {
        ...
      })
      .catch((error) => {
        ...
      })
      .done();
  }
  ...
}

class Browse extends Component {
  ...
  componentDidMount() {
    api.notification.browse()              // call API URI for browse notifications
      .then((response) => {
        ...
      })
      .catch((error) => {
        ...
      })
      .done();
  }
  ...
  renderRow(data) {                       // display response row data
    return (
      <TouchableHighlight
        onPress={() => this.props.navigator.push({name: 'view', data: data})}> // goto view notification when touched, passing data as parameter
        <View style={styles.container}>
          ...
          <Image style={styles.thumbnail} source={{uri: host + '/images/' + data.picture}} />
          <View style={styles.rightContainer}>
            <Text style={styles.name}>{data.name}</Text>    // display value of data
          </View>
          ...
        </View>
      </TouchableHighlight>
    );
  }
  ...
}
...
```

#### Import `Notification.js` to your _react-native-project_, e.g.
```javascript
# index.android.js

...
import Notification from './lib/react-native-notification-displayer/Notification';

class Name extends Component {
  render() {
    return <Notification />;
  }
}
...
```

#### Or import `Example` to your _react-native-project_ to see an example, e.g.
```javascript
# index.android.js

...
import Example from './lib/react-native-notification-displayer/Example';

class Name extends Component {
  render() {
    return <Example />;
  }
}
...
```
