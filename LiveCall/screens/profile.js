import React, { Component } from 'react'

export default class profile extends Component {
    render() {
        return (
            <View style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.pic} />
                <View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.name}</Text>
                  </View>
                  <View style={styles.end}>
                    <Image style={[styles.icon, {marginLeft:15, marginRight:5, width:14, height:14}]} source={{uri:"https://img.icons8.com/small/14/000000/double-tick.png"}}/>
                    <Text style={styles.time}>{item.date} {item.time}</Text>
                  </View>
                </View>
                <Image style={[styles.icon, { marginRight: 50 }]} source={{uri: callIcon}}/>
            </View>
        )
    }
}
