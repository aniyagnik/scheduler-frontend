
import { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native';
import * as Progress from 'react-native-progress';
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
				target:1,
				isDone:true
			},
			{
				_id:'3',
				title: 'meditate', 
				priority:1,
				isMeasurable:false, 
				score:0,
				target:1,
				isDone:false
			},
			{
				_id:'4',
				title: '10k', 
				priority:1,
				isMeasurable:false, 
				score:0,
				target:1,
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

	updateTaskScore = (value:string,index:number) => {
		let newTasks = this.state.tasks
		const oldScore = newTasks[index].score
		newTasks[index].score = parseInt(value)

		newTasks[newTasks.length-1].score+=10/newTasks[index].priority*(newTasks[index].score-oldScore)/newTasks[index].target
		
		this.setState({tasks : newTasks})
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
				<View style={styles.contentBox}>
					<Text style={styles.contentHead}>Your day includes...</Text>
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
				</View>
				<View style={styles.contentBox}>
					<Text style={styles.contentHead}>Report</Text>
					<View style={{flexDirection:'row',justifyContent:"space-around"}}>
						{
							[80,100,70,40,50,100].map((score,index)=>{
								return (
									<Progress.Circle 
										key={index}
										style={{cursor:'pointer'}}
										progress={score/100} 
										thickness={3} 
										textStyle={{fontSize:9}} 
										showsText={true} 
										size={30}
									/>
								)
							})
						}
					</View>
				</View>
				<View style={styles.contentBox}>
				<Text style={styles.contentHead}>You can do it...</Text>
				</View>
				{
					this.state.isModalVisible?(
						<Modal task={this.state.currentTask} hideModal={this.hideTaskEditModal} updateScore={this.updateTaskScore}/>
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
    justifyContent: 'flex-start',
		padding:10
  },
	contentBox:{
		backgroundColor:'lightgray',
		padding:20,
		borderRadius:20,
		opacity:0.7,
		marginBottom:10
	},
	contentHead:{
		fontSize:20,
		fontWeight:'bold',
		paddingBottom:10
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
