## Requirements:

    lussatech-cli

-----
## Content:
* [Step 1: Get the code](#step1)
* [Step 2: Generate files](#step2)
* [Step 3: Customize files](#step3)
* [Step 4: View an example](#step4)
* [Step 5: Start server](#step5)
* [Step 6: Run on device](#step6)

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
    |_ ...
    |_ lib
      |_ react-native-notification-displayer
        |_ Example.js
        |_ ...
        |_ View.js
        |_ ...
        |_ Style.js

-----
<a name="step4"></a>
### Step 4: View an example

    #index.android.js

    ...
    import Example from './lib/react-native-notification-displayer/Example';
    ...

    class Name extends React.Component {
      ...
      render() {
        return (
          ...
          <Example />
          ...
        );
      }
      ...
    }

-----
<a name="step5"></a>
### Step 5: Start server

    react-native start

-----
<a name="step6"></a>
### Step 6: Run on device

    react-native run-android
