
import { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Redirect } from 'expo-router';
import CreateTaskButton from '@/components/createTaskButton'
import TodaysTask from '@/components/todaysTask'
import Modal from '@/components/modal'

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
		],
		isModalVisible:false,
		currentTask:{}
	}

	showTaskEditModal = (index:number) => {
		console.log('show modal',index)
		this.setState({currentTask:this.state.tasks[index]})
		this.setState({isModalVisible:true})
	}

	hideTaskEditModal = () => {
		console.log('hide modal')
		this.setState({currentTask:{}})
		this.setState({isModalVisible:false})
	}

	toggleTaskCheck = (index:number)=>{
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
				<View style={{flexDirection:'column'}}>
					{
						this.state.tasks.map(
							(task: any,index:number)=>{
								return (
									<TodaysTask 
										key={index} 
										index={index} 
										task={task} 
										showModal={this.showTaskEditModal} 
										toggleCheck={this.toggleTaskCheck}
									/>
								)
						})
					}
				</View>
				<CreateTaskButton onPress={()=><Redirect href='/createTask'/>}/>
				{
					this.state.isModalVisible?(
						<Modal task={this.state.currentTask} hideModal={this.hideTaskEditModal}/>
					):(
						<></>
					)
				}
			</View>
    )
  }
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
	modal:{
		width:'100%',
		backgroundColor:'crimson'
	},
	modalHead:{
		width:'100%',
		paddingHorizontal:20,
		paddingVertical:10,
		backgroundColor:'whitesmoke',
		borderWidth:2,
		borderColor:'gray',
		fontWeight:'bold',
		boxShadow: '0 3px 3px black',
		borderTopLeftRadius:20,
		borderTopRightRadius:20,
		zIndex:1,
		fontSize:30
	},
	modalContent:{
		alignSelf: 'center',
    justifyContent: 'center',
		backgroundColor:'wheat',
		padding:20,
		borderRadius:40,
	},
	modalRows:{
		alignSelf: 'center',
    justifyContent: 'space-around',
		paddingHorizontal:20,
		paddingVertical:5,
		flexDirection:'row',
		gap:20
	},
	textField:{
		color:'gray',
		width:'30%',
		textAlign:'center',
		borderRadius:2,
		boxShadow: 'inset 0 0 5px gray',
		fontSize:15
	}
	
});
