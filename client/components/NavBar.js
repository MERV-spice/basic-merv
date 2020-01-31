import React from 'react'
import { StyleSheet } from 'react-native'
import { ButtonGroup } from 'react-native-elements';

const NavBar = ({fn, selected, buttons}) => {
    const selectedIndex = buttons.indexOf(selected);
    
    return (
	<ButtonGroup
	onPress={fn}
	selectedIndex={selectedIndex}
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

export default NavBar;
