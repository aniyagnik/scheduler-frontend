import { View, Image, Text, StyleSheet, TouchableOpacity , ScrollView, TextInput} from 'react-native'
import React, { ChangeEvent, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';

export default function CreateTask() {
	const [formData,setFormData] = useState({
		title: '',
		discription:'', 
		priority:'', 
		repetitionType:'',
		date:'',
		status: '',
		type: '', 
		unit: '', 
		targetType: '', 
		target: '', 
	})
	const handleFormDataChange = (event:any) => {
		const {name,value} = event.target
		console.log(name,value)
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};
	const router = useRouter()
	const submitForm = () => {
		console.log(formData)
		alert('submit form')
		router.navigate('/dashboard')
	}
  return (
    <ScrollView style={{flex:1}}>
      <Image 
        source={require('@/assets/images/waterO.gif')}
        style={{
            width:"100%",
            height:"10%",
        }}
        resizeMode='cover'  
      />
			<Text style={styles.heading}>Create Task</Text>
      <View style={{padding:20,gap:20}}>
				<TextInput
					//name='title'
					placeholder='title'
					style={styles.textField}
					onChangeText={handleFormDataChange}
				/>
				<TextInput
					//name="description"
					placeholder='description (optional)'
					style={styles.textField}
					onChangeText={handleFormDataChange}
				/>
				<select name="priority" id="priority">
					<option value="p" selected>Priority</option>
					<option value="High">High</option>
					<option value="Medium">Medium</option>
					<option value="mercedes">Low</option>
				</select> 
				<select name="repetitionType" id="repetition">
					<option value="daily" selected>Daily</option>
					<option value="weekly">Weekly</option>
					<option value="monthly">Monthly</option>
					<option value="once">Once</option>
				</select>
				{/* <TextInput type="date" id="date" name="date"/>
				<TextInput type="radio" id="yesNo" name="type" value="yes or no"/> */}
				<label htmlFor="yes or no">yes | no</label><br/>
				{/* <TextInput type="radio" id="measurable" name="measurable" value="measurable"/> */}
				<label htmlFor="measurable">measurable</label><br/>
				<TextInput
					//name="unit"
					placeholder='unit'
					style={styles.textField}
					onChangeText={handleFormDataChange}
				/>
				<TextInput
					//name="targetType"
					placeholder='target type'
					style={styles.textField}
					onChangeText={handleFormDataChange}
				/>
				<TextInput
				//	name="target"
					placeholder='target'
					style={styles.textField}
					onChangeText={handleFormDataChange}
				/>
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.submitButton}
					onPress={submitForm}
				>
					<MaterialIcons
						style={{display:'flex',justifyContent:'center'}} 
						name='add'
						size={20} 
						color="black"
					/>
      	<Text style={styles.text}>Save</Text>
			</TouchableOpacity>
      </View> 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
	heading: {
    color: 'black',
    fontSize: 30,
		fontFamily: 'unicase',
		left:20
  },
	textField:{
		borderWidth:1,
		height:40,
		paddingHorizontal:20,
		borderRadius:2,
		boxShadow: 'inset 0 0 5px gray',
	},
	submitButton: {
    justifyContent:'center',
    flexDirection:'row',
    paddingHorizontal:24,
    paddingVertical:5,
    borderRadius:5,
		shadowColor:'black',
		boxShadow: '0 2px 2px gray',
    backgroundColor:'whitesmoke',
    margin:10
	},
  text:{
    display: 'flex',
    alignSelf: 'center',
    fontWeight:'bold',
    fontSize: 15,
    color: 'black',
  },
	button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
	item: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderBottomWidth: 1,
	},
})


	// const fields = [
	// 	{id:'title',placeholder:'enter task name'},
	// 	{id:'description',placeholder:'enter description'},
	// 	{id:'unit',placeholder:'enter units'},
	// 	{id:'target',placeholder:'set target to achieve'},
	// 	{id:,placeholder:}
	// ]