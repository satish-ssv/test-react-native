import * as React from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Constants } from 'expo';
import { Header } from 'react-native-elements';


// This is our placeholder component for the tabs
// This will be rendered when a tab isn't loaded yet
// You could also customize it to render different content depending on the route
const LazyPlaceholder = ({ route }) => (
  <View style={styles.scene}>
    <Text>Loading {route.title}…</Text>
  </View>
);

export default class TabViewExample extends React.Component {
  constructor() {
    super();

    this.getRemoteData('user');
  }

  state = {
    data: [],
    index: 0,
    routes: [
      { key: 'user', title: 'User' },
      { key: 'editor', title: 'Editor' },
      { key: 'admin', title: 'Admin' },
    ],
    update: false
  };

  UserRoute = () => {
    console.log('function call');
    console.log(this.state.data);
    return (
          <View style={[styles.scene, { backgroundColor: '#ccc' }]}>
            <FlatList
              data={this.state.data}
              extraData={this.state.update}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
            />
          </View>)
    };

  EditorRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ccc' }]} />
  );

  AdminRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ccc' }]} />
  );

  _handleIndexChange = index => {
    this.setState({ index })
    this.getRemoteData(this.state.routes[index].key);
  };

  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;

  getRemoteData = (type) => {
    const url = "http://18.219.244.85/api/users?role=" + type;

    fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log('in state');
      console.log(this.state);
       this.setState({update: !this.state.update});
       this.setState({data: res.data.data});
    })
    .catch(error => {
      console.log("get data error:" + error);
    });
  }

  renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'user':
        return (
          <View style={[styles.scene, { backgroundColor: '#ccc' }]}>
            <FlatList
              data={this.state.data}
              extraData={this.state.update}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
            />   
          </View>);
      case 'editor':
        return (
          <View style={[styles.scene, { backgroundColor: '#ccc' }]}>
            <FlatList
              data={this.state.data}
              extraData={this.state.update}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
            />   
          </View>);

      case 'admin':
        return (
          <View style={[styles.scene, { backgroundColor: '#ccc' }]}>
            <FlatList
              data={this.state.data}
              extraData={this.state.update}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
            />   
          </View>);
      default:
        return null;
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <TabView
        lazy
        navigationState={this.state}
        renderScene={this.renderScene}
        renderLazyPlaceholder={this._renderLazyPlaceholder}
        onIndexChange={this._handleIndexChange}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
      />
      <View style={{ color: '#fff', backgroundColor: '#2089dc', textAlign: 'center', height: '50px' }}><Text>footer</Text></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
