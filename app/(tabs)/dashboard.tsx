
import { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import CreateTaskButton from '@/components/createTaskButton'
import TodaysTask from '@/components/todaysTask'

class Dashboard extends Component {
	state = {
		tasks : [
			{
				_id:'0',
				title: 'study',
				score:5,
				target:10,
				isMeasurable:true, 
				isDone:false, 
			},
			{
				_id:'1',
				title: 'sleep',
				score:5,
				target:8,
				isMeasurable:true, 
				isDone:false,
			},
			{
				_id:'2',
				title: 'exercise', 
				isMeasurable:false, 
				isDone:true
			}, // last object of array has report of today
			{
				_id:'3',
				title: 'completion', 
				isMeasurable:true, 
				score:40,
				target:50,
				isDone:false
			}
		]
	}

  onCreateTaskPress = () => {
		const router = useRouter()
    router.navigate('/createTask')
  }

	toggleTaskCompletion = (index:number)=>{
		const updatedTask = this.state.tasks[index]
		updatedTask.isDone = !updatedTask.isDone
		// code to alter score of last object on array based on prioritity
		this.setState({
			tasks : [
				...this.state.tasks.splice(0,index),
				updatedTask,
				...this.state.tasks.splice(index+1),
			]
	  })
	}

  render(){
    return (
        <View style={styles.container}>
					<Text style={styles.text}>Dashboard</Text>
					<View style={{margin:15, flexDirection:'column'}}>
						{
							this.state.tasks.map((task: any,index:number)=>{
									return (<TodaysTask key={index} index={index} task={task} onClickDone={this.toggleTaskCompletion}/>)
							})
						}
					</View>
					<CreateTaskButton onPress={this.onCreateTaskPress}/>
        </View>
    )
  }
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
