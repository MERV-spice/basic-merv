import React from 'react';
import {Button, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible: false
    };
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm(date) {
    console.log('date: ', date);
    this.setState({isDatePickerVisible: false});
  }
  render() {
    return (
      <View>
        <Button
          title="Show Date Picker"
          onPress={() => this.setState({isDatePickerVisible: true})}
        />
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="datetime"
          onConfirm={this.handleConfirm}
          onCancel={() => this.setState({isDatePickerVisible: false})}
        />
      </View>
    );
  }
}
export default DateTimePicker;
