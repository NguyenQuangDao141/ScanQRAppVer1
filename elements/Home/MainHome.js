import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { Children, useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View, Dimensions, ScrollView, TouchableOpacity, TextInput, InputAccessoryView } from 'react-native';
import firebase from '../config'
import Card from './Card'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const width = Dimensions.get('window').width;

let deviceTemp, order,device=0;
export default function MainHome({ route, navigation }) {
    order = route.params
    if(order == undefined) {
        alert(`Vui lòng quét mã QR...`)
        order = {order:0}
    };
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'HOME',
                    headerStyle: {
                        backgroundColor: '#c4b6b6',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
}


let noti = false;
let stt1 = true;
let velo = 0, timeRemain = 0, stt0;
let bedId =0;
let name=""
function Home() {
        const [time, setTime] = useState(new Date().toLocaleString());
    let stt;
    let sttStyle1,hour,minute;
    if(order.order==0){
        velo=0;
        stt0 = false;
        hour = 0;
        minute =0;
        timeRemain=0;
        noti = true;
    }
    else {
        noti = false;
    const rootRef = firebase.database().ref();
    const animalRef = rootRef.child("/" + order.order);
    animalRef.on('value', (childSnapshot) => {
        velo = (childSnapshot.toJSON().velo);
        stt0 = (childSnapshot.toJSON().stt);
        timeRemain = (childSnapshot.toJSON().time);
        bedId = childSnapshot.toJSON().bedId;
        name = childSnapshot.toJSON().name;
        timeRemain = timeRemain.substring(0,2);
    hour = Math.floor(timeRemain / 60), minute = timeRemain - hour * 60;
    })
    }
    useEffect(() => {
        const interval = setTimeout(() => {
            setTime(new Date().toLocaleString());
            stt1 = !stt1;
            return () => {
                clearInterval(this.interval)
            }
        }, 1000);
    }, [time]);
    if (stt0 == true) {
        stt = "Đang chảy";
        sttStyle1 = {
            fontSize: 44,
            fontWeight: 'bold',
            color: '#000',
        }
    }
    else {
        stt = "Không chảy"
        sttStyle1 = {
            fontSize: 44,
            fontWeight: 'bold',
            color: '#f00'
        }
    }

    return (
        <ScrollView>
            <View style={style.container}>
                <Card>
                    <View style={style.containerOne}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Image
                                source={require('./infusion.png')}
                                style={{ width: 75, height: 75 }}
                            />
                        </View>
                        <View style={style.text}>
                            <Text style={style.text1}> Thời gian hết bình </Text>
                            <Text style={style.expert}>{` ${hour} giờ ${minute} phút `}</Text>
                        </View>
                    </View>
                </Card>
                <Card>
                    <View style={style.containerResult}>
                        <Text style={style.result}> {velo} </Text>
                        <Text style={style.unit}>Giọt/Phút</Text>
                    </View>
                </Card>
    
                <Card>
                    <View style={style.containerThree}>
                        <View style={style.containerThree}>
                            <Text style={style.dieukhien}> Trạng thái </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={sttStyle1}>
                                {stt}
                            </Text>
                            {(stt0) ?
                                (stt1 ?
                                    <Image
                                        source={require('./drop.png')}
                                        style={{ width: 50, height: 50, marginHorizontal: 20 }}
                                    /> :
                                    <Image
                                        source={require('./drop.png')}
                                        style={{ width: 50, height: 50, opacity: 0, marginHorizontal: 20 }}
                                    />)
                                :
                                (stt1 ?
                                    <Image
                                        source={require('./warning.png')}
                                        style={{ width: 50, height: 50, marginHorizontal: 20 }}
                                    />
                                    :
                                    <Image
                                        source={require('./warning.png')}
                                        style={{ width: 50, height: 50, opacity: 0, marginHorizontal: 20 }}
                                    />)
                            }
                            {

                            }

                        </View>
                    </View>
                </Card>
                {noti?
                <Card>
                    <Text>Vui lòng quét mã QR trên thiết bị để bắt đầu theo dõi</Text>
                </Card>:
                <>
                                {/* <View style = {{alignItems:'center'}}> */}
                    <TouchableOpacity >
                        <Card >
                            <View style={{alignItems:'center'}}>
                            <Text style = {{color:'red',fontSize:22,fontWeight:'bold'}}>Cảnh báo bác sĩ</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                    {/* </View> */}
                    <View style={{width:width}}>
                <Card>
                    <Text>Đã kết nối với thiết bị mã giường bệnh: {bedId}</Text>
                    <Text>Tên bệnh nhân: {name} </Text>
                </Card>
                </View>

                </>
                }
                <View style={style.time}>
                    <Text style={style.timeText}> {time}</Text>
                
                </View>
            </View>
        </ScrollView >
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    containerOne: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text1: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    expert: {
        color: '#000',
        fontSize: 33,
    },
    timeText: {
        fontSize: 15,
        color: '#000',
    },
    time: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    containerResult: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    result: {
        fontSize: 100,
        fontWeight: 'bold',
        color: '#000'
    },
    unit: {
        fontSize: 19,
        color: '#000'
    },
    containerTwo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#000'
    },
    containerThree: {
        flexDirection: 'column',

        alignItems: 'center',
        justifyContent: 'center',

    },
    dieukhien: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    containerFour: {
        marginHorizontal: 30,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    appButtonContainer: {
        elevation: 11,
        height: 80,
        width: 80,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        textTransform: "uppercase"
    },
    appButtonContainer1: {
        elevation: 11,
        height: 50,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderRadius: 5,
        backgroundColor: '#C0C0C0',
        paddingVertical: 10,
        paddingHorizontal: 15
    }
})