import React, { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Switch,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import ToggleButton from './ToggleButton';
import DropDownPicker from 'react-native-dropdown-picker';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { useNavigation } from '@react-navigation/native';

// This App.js is meant for adding a new task

const styles = StyleSheet.create({
  // This container is for the SafeAreaView which houses the Scroll View
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },

  // Add Task
  addTaskHeader: {
    margin: 10,
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
    //backgroundColor: 'yellow',
  },

  addTaskMainHeaders: {
    margin: 10,
    padding: 10,
    fontSize: 18,
    alignSelf: 'center',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
    //backgroundColor: 'yellow',
  },

  bgAddTask: {
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.3,
    shadowColor: 'black',
    height: 750,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },

  headerSection: {
    //backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  block: {
    backgroundColor: '#fceade',
    height: 40,
    width: '100%',
    zIndex: 0
  },

  // Header Styles and alignment
  addTaskPrimaryHeader: {
    color: 'black',
    fontSize: 20,
    textAlignVertical: 'center',
    //backgroundColor: 'yellow',
  },

  bgSection: {
    //backgroundColor: 'yellow',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputStyle: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    padding: 20,
    fontSize: 20,
    backgroundColor: "white",
    //backgroundColor: 'yellow',
  },
  durationStyle: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 20,
    backgroundColor: 'white'
  },
});

const App = ({navigation}) => {
  const [taskname, setTaskname] = useState(false);
  const [duration, setDuration] = useState('');
  const [tasktype, setTasktype] = useState('Main');
  const [color, setColor] = useState('blue');
  const [startdate, setStartdate] = useState(new Date(global.days[0]));
  const [sub, setSub] = useState('');
  const [chooseMain, setChoosemain] = useState('none');
  const [strstartdate, setStrStartdate] = useState(
    startdate.getFullYear() +
      '-' +
      (startdate.getMonth() + 1) +
      '-' +
      startdate.getDate()
  );
  const [enddate, setEnddate] = useState(
    new Date(global.days[global.days.length - 1])
  );
  const [strenddate, setStrEnddate] = useState(
    enddate.getFullYear() +
      '-' +
      (enddate.getMonth() + 1) +
      '-' +
      enddate.getDate()
  );
  console.log(startdate);
  console.log(strstartdate);
  console.log(enddate);
  console.log(strenddate);
  const [notif, setNotif] = useState(false);
  const [maintasks, setMaintasks] = useState(global.main["main"]);
  const [mainDates, setMainDates] = useState(global.main["date"]);
  var randomChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < 10; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  const [id, setId] = useState(result);
  const [selected, setSelected] = useState(0);

  const addSubTasks = () => {
    console.log("add sub tasks called")
    console.log(selected)
    var maintaksnames = global.tasks[mainDates[selected]];
    for (var j = 0; j < maintaksnames.length; j++) {
    console.log(maintaksnames[j].name)
    console.log(maintasks[selected].label)
      if (maintaksnames[j].name == maintasks[selected].label) {
        console.log(global.tasks)
        global.tasks[mainDates[selected]][j]['subtask'].push({
          name: taskname,
          description: 'st1',
          duration: duration,
        });
    console.log("added")
        console.log(global.tasks)
    console.log("adding in calendar")
        console.log(global.calendar)
        global.calendar[mainDates[selected]].push({
          id: id,
          name: taskname,
          colour: color,
        });
    console.log("added in calendar")
        console.log(global.calendar)
      }
    }
  };

  const addMainTask = () => {
    console.log("add main tasks called")
    var daysArray = [];
    

    for (
      var arr = [],
        newdt = new Date(startdate),
        enddt = new Date(enddate);
      newdt <= enddt;
      newdt.setDate(newdt.getDate() + 1)
    ) {
      daysArray.push(new Date(newdt).getFullYear() + '-' + (new Date(newdt).getMonth() + 1) + '-' + new Date(newdt).getDate() );
    }
    console.log(daysArray);
    console.log("adding in calendar")
    console.log(global.calendar)
    for (var e = 0; e < daysArray.length; e++) {
    console.log(global.calendar[daysArray[e]])
    if (global.calendar[daysArray[e]] == undefined){
      global.calendar[daysArray[e]]=[]
    }
      global.calendar[daysArray[e]].push({
        id: id,
        name: taskname,
        colour: color,
      });
    
      
    }
    console.log(global.calendar)
    console.log("added in calendar")
    console.log("adding in tasks")
    console.log(global.tasks)
    if (global.tasks[strstartdate] == undefined){
      global.tasks[strstartdate]=[]
    }
    global.tasks[strstartdate].push({
      name: taskname,
      category: 'events',
      enddate: strenddate,
      duration: duration,
      notif: notif,
      subtask: [],
    });
    console.log(global.tasks)
    console.log("added in tasks")
    console.log("adding in main")
    
    global.main["main"].push({
      "label": taskname,
      "value": global.main["main"].length-1
    });
    global.main["date"].push(strstartdate);
    console.log(global.tasks)
    console.log("added in main")
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setNotif((notif) => !notif);
  };

  const [changestartdate, setChangeStartDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [changeenddate, setChangeEndDate] = useState(new Date());
  const [eshow, seteShow] = useState(false);

  const onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || changestartdate;
    setShow(Platform.OS === 'ios');
    setChangeStartDate(currentDate);
    setStartdate(currentDate);
    console.log(currentDate);
    var date = new Date(currentDate).getDate();
    var month = new Date(currentDate).getMonth() + 1;
    var year = new Date(currentDate).getFullYear();
    setStrStartdate(
      currentDate.getFullYear() +
        '-' +
        (currentDate.getMonth() + 1) +
        '-' +
        currentDate.getDate()
    );
  };

  const onEndChange = (event, selectedDate) => {
    const currenteDate = selectedDate || changestartdate;
    seteShow(Platform.OS === 'ios');
    setChangeEndDate(currenteDate);
    setEnddate(currenteDate);
    console.log(currenteDate);
    var date = new Date(currenteDate).getDate();
    var month = new Date(currenteDate).getMonth() + 1;
    var year = new Date(currenteDate).getFullYear();
    setStrEnddate(
      currenteDate.getFullYear() +
        '-' +
        (currenteDate.getMonth() + 1) +
        '-' +
        currenteDate.getDate()
    );
  };

  const showDatepicker = () => {
    setShow(true);
  };
  const showEDatepicker = () => {
    seteShow(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Add Task Pop-up */}
      <View style={styles.bgAddTask}>
        <View style={styles.headerSection}>
          <TouchableOpacity>
            <Text style={styles.addTaskMainHeaders}>Cancel</Text>
          </TouchableOpacity>

          <Text style={styles.addTaskHeader}>Add Task</Text>

          <TouchableOpacity onPress={()=>{
            if (sub == "none"){
              addSubTasks();
              navigation.navigate('TaskStack');
            } else {
              addMainTask();
              navigation.navigate('TaskStack');
            }
          }}>
            <Text style={styles.addTaskMainHeaders}>Done</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{backgroundColor: "#fceade"}}>
        

          {/* Task Color Section */}
          <View>
            <View style={{ zIndex: 9, marginBottom: 30, marginTop: 30 }}>
              <DropDownPicker
                items={[
                  { label: 'Blue', value: 'blue' },
                  { label: 'Pink', value: 'pink' },
                  { label: 'Orange', value: 'orange' },
                  { label: 'Black', value: 'black' },
                ]}
                defaultIndex={0}
                containerStyle={{ height: 40 }}
                onChangeItem={(item) => setColor(item.value)}
              />
            </View>


          {/* Task Name Section */}
          <View style={{ marginBottom: 50 }}>
            <TextInput
              id="Task_Name"
              style={styles.inputStyle}
              autoCorrect={false}
              placeholder="Task Name"
              onChangeText={setTaskname}
            />
          </View>


            {/* Task Category Section */}
            <View style={{ height: 0, zIndex: 9, marginBottom: 80 }}>
              <DropDownPicker
                items={[
                  { label: 'Main', value: 'Main' },
                  { label: 'Sub', value: 'Sub' },
                ]}
                defaultIndex={0}
                containerStyle={{ height: 40 }}
                onChangeItem={(item) => {
                  if (item.value == 'Sub') {
                    console.log('Sub Task chosen');
                    setSub('none');
                  } else {
                    console.log('Main Task chosen');
                    setSub('');
                  }
                  setTasktype(item.value);
                }}
              />
            </View>

            {/* Main Selection Section */}
            <View style={{ display: {sub}.sub=="none"?"":"none"}}>
              <View style={{ height: 45, zIndex:9, marginBottom: 30}}>
                <DropDownPicker
                  items={ maintasks }
                  defaultIndex={0}
                  containerStyle={{ height: 40 }}
                  onChangeItem={(item) => {
                    setSelected(item.value)
                    console.log(item.value)
                  }}
                />
              </View>
            </View>


            {/* Date Selection Section */}
            <View style={{ display: { sub }.sub }}>
              <View
                style={[
                  styles.bgSection,
                  { borderBottomWidth: 1, borderBottomColor: 'grey', backgroundColor: "white" },
                ]}>
                <TouchableOpacity onPress={showDatepicker}>
                  <Text style={styles.addTaskPrimaryHeader}>Start Date: </Text>
                  <Text style={[styles.addTaskPrimaryHeader, { left: 75 }]}>
                    {strstartdate}
                  </Text>
                </TouchableOpacity>

                <Image source={require('../images/calendar.png')}></Image>
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startdate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onStartChange}
                />
              )}
              <View style={[styles.bgSection, {backgroundColor: "white", marginBottom: 20}]}>
                <TouchableOpacity onPress={showEDatepicker}>
                  <Text style={styles.addTaskPrimaryHeader}>End Date:</Text>
                  <Text style={[styles.addTaskPrimaryHeader, { left: 75 }]}>
                    {strenddate}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../images/calendar.png')}></Image>
                </TouchableOpacity>
              </View>
              {eshow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={enddate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onEndChange}
                />
              )}
            </View>
          </View>
         

          <View style={[styles.bgSection, {backgroundColor: "white",
    zIndex: -1, marginBottom: 20}]}>
            <Text style={styles.addTaskPrimaryHeader}>Task Duration</Text>
            <View>
              <TextInput
                id="dwerwgfserazvg"
                style={styles.durationStyle}
                autoCorrect={false}
                placeholder="Duration"
                onChangeText={setDuration}
              />
            </View>
          </View>


          <View style={[styles.bgSection, {backgroundColor: "white",
    zIndex: -1}]}>
            <Text style={styles.addTaskPrimaryHeader}>Notifications</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#f5dd4b' }}
              thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;
