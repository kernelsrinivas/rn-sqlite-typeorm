/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react';
//import './polyfill';
import {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createConnection, getRepository} from 'typeorm';

import {Category} from './entities/category';

interface AppProps {}

interface AppState {
  progress: string;
  loadedCategory: Category | null;
  savedCategory: boolean;
}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      savedCategory: false,
      progress: 'Post is being saved',
      loadedCategory: null,
    };
    this.runDemo();
  }

  connect() {
    return createConnection({
      type: 'react-native',
      database: 'test',
      location: 'default',
      logging: ['error', 'query', 'schema'],
      synchronize: true,
      entities: [Category],
    });
  }

  async runDemo() {
    await this.connect();

    const category1 = new Category();
    category1.name = 'TypeScript';

    const category2 = new Category();
    category2.name = 'Programming';

    const categoryRepository = getRepository(Category);
    await categoryRepository.save(category1);
    await categoryRepository.save(category2);

    console.log('Post has been saved');
    this.setState({
      progress: 'Post has been saved',
    });

    const loadedPost = await categoryRepository.findOne(1);
    if (loadedPost) {
      console.log('Post has been loaded: ', loadedPost);
      this.setState({
        loadedCategory: loadedPost,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to the React Native Example for TypeORM!
        </Text>
        <Text style={styles.small}>{this.state.progress}</Text>
        <Text style={styles.small}>
          {JSON.stringify(this.state.loadedCategory)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  small: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
