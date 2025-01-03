import { StyleSheet, Text, View,TextInput } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

export default function Modal({task,hideModal,updateScore}) {
  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000040',
				width: '100%',
				height: '100%',
				position: 'fixed',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
      }}
			onClick={hideModal}
    >
      <Animated.View
        entering={SlideInDown}
        style={{
          width: '100%',
          height: '75%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: 'white',
					borderTopLeftRadius:20,
					borderTopRightRadius:20
        }}
      >
				<View style={styles.modalHead}>
					<Text style={{fontSize:20,fontWeight:'bold'}}>{task.title}</Text>
				</View>
				<View style={{alignItems: 'center',justifyContent: 'center', width:'100%',height:'100%'}}>
					<View style={styles.modalContent}>
						<View style={styles.modalRows}>
							<Text style={{fontSize:20,fontWeight:'bold'}}>Target</Text>
							<TextInput
								placeholder={task.target}
								style={styles.textField}
								editable={false}
							/>
						</View>
						<View style={styles.modalRows}>
							<Text style={{fontSize:20,fontWeight:'bold'}}>Today</Text>
							<TextInput
								value={task.score}
								style={styles.textField}
								onChangeText={(value)=>updateScore(value,index)}
							/>
						</View>
						</View>
					</View>
      </Animated.View>
    </Animated.View>
  );
}

const styles=StyleSheet.create({
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
	},
})