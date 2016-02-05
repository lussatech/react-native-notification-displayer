### Installation
    npm i react-native-notification-displayer

### Generate Files
Before generate library files to your react-native-project, make sure that `lussatech-cli` is installed globally in your machine, otherwise use this command to install it:

    npm i lussatech-cli -g

If `lussatech-cli` have been installed, change directory to your react-native-project and run this command:

    lussatech generate react-native-notification-displayer

then the library files will be added automatically inside your react-native-project, e.g.

    react-native-project
    |_ ...
    |_ lib
      |_ react-native-notification-displayer
        |_ ...
        |_ index.js
        |_ ...

### Usage
```javascript
...
import Notification, {  // sample app
/* available components */
  Navbar,               // sample navigation bar
  Notification,               // sample client view
/* available constants  */  
  Server,               // sample api end-point
  Host,                 // sample host for api end-point
} from './lib/react-native-notification-displayer';

class Name extends Component {
  render() {
    return (
      <APIClient />     // sample calling component
    );
  }
}
...
```

###### Manage API end-point
To manage api end-point, update `Server.js` based on your api end-point, e.g.

```javascript
# lib/react-native-notification-displayer/Server.js

...
export const host = 'http://example.com'; // host for api url
export default {
  notification: {
    find: function () {
      let url = `${host}/notification`,   // api url for browse notification
          opt = {                         // optional second argument
            method: 'get'                 //  to customize the HTTP request
          };

      return fetch(url, opt);
    },
    ...
  },
  ...
};
...
```

then call api end-point inside your react-native-project, e.g.

```javascript
# lib/react-native-notification-displayer/Notification.js

  ...
  componentDidMount() {
    api.notification.find()             // call api url for browse notification
      .then((response) => {
        ...
      })
      .catch((error) => {
        ...
      })
      .done(() => {
        ...
      });
  }
  ...
```

###### Customize navigation bar
To customize navigation bar, update `Navbar.js` based on your need, e.g.

```javascript
# lib/react-native-notification-displayer/Navbar.js

...
export default class extends Component {
  /* to validate props value */
  static propTypes = {
    onRefresh: PropTypes.func,
    ...
  };
  ...

  /* when a menu is selected */
  onActionSelected(position) {
    switch (position) {
       case 0: this.onSearch(); break;
       case 1: this.onRefresh(); break;
       ...
      default: ToastAndroid.show(`${actions[position].title} selected.`, ToastAndroid.SHORT);
    }
  }
  ...

  /* when selected menu is `Refresh` */
  onRefresh() {
    /* calling onRefresh props action if available */
    this.props.onRefresh && this.props.onRefresh();
  }
  ...
}

/* list of menu */
const actions = [
  {title: 'Search', icon: icons.search, show: 'always'},
  {title: 'Refresh', icon: icons.refresh, show: 'ifRoom'},
  {title: 'Notification'},
  ...
];
...
```

then include the navigation bar inside your react-native-project, e.g.

```javascript
# lib/react-native-notification-displayer/index.js

  ...
  render() {
    return (
      <ScrollView>
        <Navbar title={`Notification`} onRefresh={() => this.forceUpdate()} />
        <View style={styles.container}>
          ...
        </View>
      </ScrollView>
    );
  }
  ...
```

###### Customize views
To customize views, update `Notification.js` based on your need, e.g.

```javascript
# lib/react-native-notification-displayer/Notification.js

  ...
  render() {
    if (!this.state.load) return this.renderLoading();
    if (this.state.nope) return this.renderEmpty();

    return this.renderScene();
  }

  renderScene() {
    return (
      <ListView
        style={styles.listView}
        dataSource={this.state.data}
        renderRow={this.renderRow.bind(this)}
        automaticallyAdjustContentInsets={false}
      />
    );
  }

  renderRow(data) {
    return (
      <TouchableHighlight
        underlayColor={'#D9D9D9'}
        onPress={() => this.props.navigator.push({name: 'view', data: data})}>
        <View style={styles.container}>
          <Image
            style={styles.thumbnail}
            source={{uri: `${host}/images/doctors/${data.picture}`}}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.date}>{(new Date(data.createdAt)).toISOString().slice(0, 10)}</Text>
            <Text style={styles.name}>{data.name} {data.title}</Text>
            <Text style={styles.clinic}>{data.clinic.name}</Text>
            <Text style={styles.desc}>{data.desc}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  ...
```
