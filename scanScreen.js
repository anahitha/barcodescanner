import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native-gesture-handler';
 
export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedBookID: '',
            scannedStudentID: '',
            buttonState: 'normal',
            transactionMessage: ''
        }
    }
    getCameraPermissions = async(ID)=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status == "granted",
            scanned: false,
            buttonState: ID
        })
    }

    handleBarcodeScan = async({type, data})=>{
        const {buttonState} = this.state
        if(buttonState==="BookID"){
        this.setState({
            scanned: true,
            scannedBookID: data,
            buttonState: 'normal'
        })}
        else if(buttonState=="StudentID"){
            this.setState({
                scanned: true,
                scannedStudentID: data,
                buttonState: 'normal'
            })
        }
    }
    
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState !== 'normal' && hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned = {scanned? undefined: this.handleBarcodeScan} 
                 style = {StyleSheet.absoluteFillObject}>

                </BarCodeScanner>
            )
        }
        else if(buttonState == 'normal'){
            return(
                <View style = {styles.container}>
                    <View>
                        <Text style = {{
                            textAlign: 'center',
                            fontSize: 25
                        }}>Bar Code Scanner</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TouchableOpacity style = {styles.scanButton}
                        onPress = {this.getCameraPermissions("BookID")}>
                            <Text style = {styles.buttonText}> Scan Barcode </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
      },
    buttonText:{
        fontSize: 20,
      },
    submitButton:{
        backgroundColor: 'blue',
        padding: 10,
        margin: 10,
        width: 100,
        height: 50
      },
    submitText:{
        fontSize: 20,
        padding: 10,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'

      },
    inputView: {
        flexDirection: 'row',
        margin: 20
    },
    inputBox: {
        width: 200,
        height:40,
        borderWidth: 1.5,
        fontSize: 20
    }
  });