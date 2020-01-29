import React from 'react'
import {StyleSheet, Text, Navigator, TouchableHighlight} from 'react-native'
import { Avatar, ButtonGroup } from 'react-native-elements';

export default function NavBar() {
    const [index, setIndex] = React.useState(0);
    const buttons = [1, 2, 3, 4];
    
    return (
	<ButtonGroup
	onPress={setIndex}
	selectedIndex={index}
	buttons={buttons}
	containerStyle={{height: 50, backgroundColor: 'black'}}
	/>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
})
