import React from 'react';
import {connect} from 'react-redux';
import {FlatList, Button, Text, View} from 'react-native';
import {Overlay} from 'react-native-elements';

const NotificationOverlay = ({notifications, visible, setVisible}) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      height={200}
    >
      <FlatList
        data={notifications.received}
        keyExtractor={item => item.id.toString()}
        listEmptyComponent={<Text>No Current Notifications</Text>}
        extraData={notifications.received}
        renderItem={({item}) => (
          <View>
            <Text>Name sent you a friend request</Text>
            <Button title={Accept} onPress={() => console.log('accept')} />
            <Button title={Decline} onPress={() => console.log('decline')} />
          </View>
        )}
      />
    </Overlay>
  );
};

const mapState = state => ({
  notifications: state.requests
});

export default connect(mapState)(NotificationOverlay);
