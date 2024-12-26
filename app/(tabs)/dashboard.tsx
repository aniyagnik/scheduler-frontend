
import { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native';
import CreateTaskButton from '@/components/createTaskButton'
import TodaysTask from '@/components/todaysTask'
import Modal from '@/components/modal'

class Dashboard extends Component {
	state = {
		tasks : [
			{
				_id:'0',
				title: 'study',
				priority:1,
				score:5,
				target:10,
				isMeasurable:true, 
				isDone:false, 
			},
			{
				_id:'1',
				title: 'sleep',
				priority:1,
				score:4,
				target:8,
				isMeasurable:true, 
				isDone:false,
			},
			{
				_id:'2',
				title: 'exercise', 
				priority:1,
				isMeasurable:false, 
				score:0,
				isDone:true
			},
			{
				_id:'3',
				title: 'meditate', 
				priority:1,
				isMeasurable:false, 
				score:0,
				isDone:false
			},
			{
				_id:'4',
				title: '10k', 
				priority:1,
				isMeasurable:false, 
				score:0,
				isDone:false
			}, // last object of array has report of today
			{
				_id:'5',
				title: 'completion', 
				priority:1,
				isMeasurable:true, 
				score:30,
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
		let newTasks = this.state.tasks
		newTasks[index].isDone = !newTasks[index].isDone 
		
		if(newTasks[index].isDone) newTasks[newTasks.length-1].score+=10/newTasks[index].priority
		else newTasks[newTasks.length-1].score-=10/newTasks[index].priority

		this.setState({tasks : newTasks})
	}

  render(){
    return (
			<View style={styles.container}>
				<Text style={styles.text}>Dashboard</Text>
				<View style={{flexDirection:'column'}}>{
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
				}</View>
				<CreateTaskButton/>
				{
					this.state.isModalVisible?(
						<Modal task={this.state.currentTask} hideModal={this.hideTaskEditModal}/>
					):(<></>)
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
