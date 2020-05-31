import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import { SwipeListView } from 'react-native-swipe-list-view';

export default function Basic() {
    const [listData, setListData] = useState(
        [
            { text: `Ключевая информация`,
                in: [
                    {text: `Ключевая информация 1`}
                ]
                .map((_, i) => ({ key: `${i}`, text: `${_.text}`, in: _.in }))
            },
            { text: `Общие вопросы` },
            { text: `Холл-прихожая` },
            { text: `Гардеробная для верхней одежды` },
            { text: `Гардеробная для главной спальни` },
            { text: `Детская гардеробная` },
            { text: `Кухня` },
            { text: `Столовая` },
            { text: `Гостиная` },
            { text: `Главная спальня` },
            { text: `Детская спальня` },
            { text: `Гостевая спальня` },
            { text: `Ванная комната` },
            { text: `Детская ванная` },
            { text: `Гостевой санузел` },
            { text: `Постирочная` },
            { text: `Кабинет` },
        ]
        .map((_, i) => ({ key: `${i}`, text: `${_.text}`, in: _.in }))
        );

    const closeRow = (rowMap, rowKey) => {
        console.warn(rowMap[rowKey]);
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => {
                    // console.log('You touched me 123 ', data, data.item.in);
                    if(data.item.in) setListData(data.item.in);
                    // setListData(listData);
                }
            }
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View>
                <Text>{data.item.text}</Text>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Text>Left</Text>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Ред.</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Удалить</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                onRowDidOpen={onRowDidOpen}
            />

            <ActionButton
              buttonColor="rgba(231,76,60,1)"
              onPress={() => { console.log("hi")}}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        top: 20,
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});
