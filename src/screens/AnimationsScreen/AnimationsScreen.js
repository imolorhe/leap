import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, Button, LayoutAnimation, Animated } from 'react-native';

export default class AnimationsScreen extends Component {
  state = {
    showBottom: false,
    showAnimated: false,
    value: 0
  };

  _transform = new Animated.Value(0);

  toggleBottom = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ showBottom: !this.state.showBottom });
  }

  toggleAnimated = () => {
    // this.startBenchmark();
    Animated.spring(this._transform, {
      toValue: (!this.state.showAnimated) ? 1 : 0,
      friction: 0.9,
      useNativeDriver: true
    }).start(() => {
      this.setState({ showAnimated: !this.state.showAnimated });
      // this.clearBenchmark();
    });
  };

  startBenchmark = () => {
    this.benchmarkInterval = setInterval(() => {
      for (let i = 0; i < 100; i++) {
        this.setState({ value: i });
      }
    }, 10);
  };
  clearBenchmark = () => {
    clearInterval(this.benchmarkInterval);
    this.benchmarkInterval = null;
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Text>{this.state.value}</Text>
          <Block>
            <Button title="Toggle Bottom" onPress={this.toggleBottom} />
            <View style={{ backgroundColor: 'tomato', height: 50, justifyContent: 'center', alignItems: 'center' }}>
              <Text>View me</Text>
            </View>
            {this.state.showBottom && <View style={{ backgroundColor: 'purple', height: 50 }}></View>}
            <View style={{ backgroundColor: 'pink', height: 50 }}></View>
          </Block>

          <Block style={{ alignItems: 'center' }}>
            <Button title="Toggle Animated" onPress={this.toggleAnimated} />
            <Animated.View style={[
              { backgroundColor: 'blue', height: 60, width: 60 },
              { transform: [{ scale: this._transform }] }
            ]}></Animated.View>
          </Block>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const Block = props => (
  <View style={{ flex: 1, marginVertical: 20, ...props.style }}>
    {props.children}
  </View>
);