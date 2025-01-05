import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import { useState } from 'react';

export default function CalendarScreen() {
  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "whitesmoke",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const report=[
    Array.from(Array(30)).map(()=>Math.floor(Math.random() * 51)),  // current month first
    Array.from(Array(30)).map(()=>Math.floor(Math.random() * 51)),
    Array.from(Array(30)).map(()=>Math.floor(Math.random() * 51)),
  ]

  const labels = {
    week:['Mon','Tues','Wed','Thurs','Fri','Sat','Sun'],
    month:Array.from(Array(30)).map((e,i)=>(i+1).toString()),
    year:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  }

  const [graphDatasets,setGraphDatasets] = useState(report[0])
  const [graphLabels,setGraphLabels] = useState(labels.month)

  const data = {
    labels: graphLabels,
    datasets: [
      {
        data: graphDatasets,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 5 // optional
      }
    ],
    legend: ["score"] // optional
  };

  const changeGraphData = (date:any) => {
    const currMonth = new Date().getMonth()+1
    const currYear = new Date().getFullYear()
    const index = (currYear-date[0].year)*12 + currMonth-date[0].month

    setGraphLabels(labels.month)
    setGraphDatasets(report[index])
  }

  const handleXView = (value:string) => {
    switch(value) {
      case 'Weekly':{
        setGraphLabels(labels.week)
        setGraphDatasets([45,7,89,56,34,71,23])
        break;
      }
      case 'Monthly':{
        setGraphLabels(labels.month)
        setGraphDatasets(Array.from(Array(30)).map((e,i)=>Math.floor(Math.random() * 51)))
        break;
      }
      case 'Year':{
        setGraphLabels(labels.year)
        setGraphDatasets([900,565,456,788,123,123,345,879,989,455,123,987])
        break;
      }
    }
  }

  const screenDimensions = Dimensions.get("window");
  
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',margin:10}}>{
        ['Weekly','Monthly','Year'].map(item=>(
          <TouchableOpacity onPress={()=>handleXView(item)} key={item}>
          <View 
            style={{
              margin:10,
              paddingVertical:10,
              width:screenDimensions.width/5,
              backgroundColor:'crimson',
              justifyContent:'center',
              alignContent:'center',
              borderRadius:20
            }}
          >
            <Text style={styles.text}>{item}</Text>
          </View>
          </TouchableOpacity>
        ))
      }</View>
      <View>
        <LineChart
          fromZero={true}
          data={data}
          width={screenDimensions.width*0.9}
          height={screenDimensions.height/3}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          bezier
        />
      </View>
      <View style={{height:'45%'}}>
        <CalendarList
          current='2025-01-01'
          horizontal={true}
          showScrollIndicator={true}
          scrollEnabled={true}
          markedDates={{
            '2025-01-25': { selected: true, marked: true },
            '2025-01-24': { marked: true },
            '2025-01-26': {
                marked: true, dotColor: 'red',
                activeOpacity: 0
            },
          }}
          pastScrollRange={report.length-1}
          futureScrollRange={0}
          onVisibleMonthsChange={(months) => changeGraphData(months)}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#00adf5',
            monthTextColor: '#00adf5',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    display:'flex',
    color:'gold',
    fontSize:20,
    fontWeight:'bold',
    justifyContent:'center'
  }
});