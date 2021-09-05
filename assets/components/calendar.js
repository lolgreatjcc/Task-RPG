import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import { Constants } from 'expo';
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

import Calendar from 'react-native-calendario';

const THEME = {
  activeDayColor: {},
  monthTitleTextStyle: {
    color: '#6d95da',
    fontWeight: '300',
    fontSize: 16,
  },
  emptyMonthContainerStyle: {},
  emptyMonthTextStyle: {
    fontWeight: '200',
  },
  weekColumnsContainerStyle: {},
  weekColumnStyle: {
    paddingVertical: 5,
  },
  weekColumnTextStyle: {
    color: '#b6c1cd',
    fontSize: 13,
  },
  nonTouchableDayContainerStyle: {},
  nonTouchableDayTextStyle: {},
  startDateContainerStyle: {},
  endDateContainerStyle: {},
  dayContainerStyle: {
    height: windowHeight*0.08
  },
  dayTextStyle: {
    color: '#2d4150',
    fontWeight: '200',
    fontSize: 15,
  },
  activeDayContainerStyle: {
    backgroundColor: '#33D1D475',
  },
  activeDayTextStyle: {
    color: 'white',
  },
  nonTouchableLastMonthDayTextStyle: {},
};

export default class App extends React.PureComponent<{}, {}> {
  state = {
    date: ""
  };

  renderDayContent = (item: DayType) => {
    const { isActive, date } = item;
    const date_now =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const DATEDATA = global.calendar[date_now];
    const Task = ({ name, color }) => {
      console.log({color}.color)
      return(
      <View style={{borderLeftColor:{color}.color, borderLeftWidth: 5}}>
        <Text style={{color: {color}.color, fontSize: 12}}> {name}</Text>
      </View>
    );}
    const renderItem = ({ item }) => <Task name={item.name} color={item.colour} />;
    if (DATEDATA != undefined) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={[
              { color: isActive ? 'green' : 'grey' },
              THEME.dayTextStyle,
              isActive ? THEME.activeDayTextStyle : {},
            ]}>
            {date.getDate()}
          </Text>
          <FlatList
            data={DATEDATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            listKey={(item, index) => 'D' + index.toString()}
          />
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={[
              { color: isActive ? 'green' : 'grey' },
              THEME.dayTextStyle,
              isActive ? THEME.activeDayTextStyle : {},
            ]}>
            {date.getDate()}
          </Text>
        </View>
      );
    }
  };

  render() {
   
    var date = new Date().getDate()+"";
    var month = (new Date().getMonth() + 1)+"";
    if (month.length==1){
      month = "0"+month
    }
    if (date.length==1){
      date = "0"+date
    }
    var year = new Date().getFullYear();
    this.setState({ date: year + '-' + month + '-' + date });


    const renderTasks = (range) => {
      var daysArray = [];
      if (range.endDate != null) {
        for (
          var arr = [], newdt = new Date(range.startDate),enddt = new Date(range.endDate);
          newdt <= enddt;
          newdt.setDate(newdt.getDate() + 1)
        ) {
          daysArray.push(new Date(newdt));
        }
        console.log(daysArray);
      } else {
        var mnewdt = new Date(range.startDate), mdt = new Date(mnewdt.setDate(mnewdt.getDate() + 1))
        daysArray = [mnewdt];
      }
      console.log(daysArray)
      global.days = daysArray;
    };
    return (
      <View>
        <SafeAreaView>
          <ScrollView style={{ height: windowHeight * 0.7, backgroundColor: "#F9F9F9" }}>
            <Calendar
              onChange={(range) => renderTasks(range)}
              monthHeight={500}
              startingMonth={this.state.date}
              startDate={this.state.date}
              endDate={this.state.date}
              numberOfMonths={13}
              initialListSize={4}
              theme={THEME}
              renderDayContent={this.renderDayContent}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
