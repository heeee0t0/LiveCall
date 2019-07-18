import React, { Component } from 'react';
import styled from "styled-components";

export default class ActiveList extends Component {
    render() {
        return (
            <ListContainer>
                <ContactImage source={require("../assets/images.jpg")}/>
            </ListContainer>
            // <View style={[styles.root]}>
            //     <FlatList
            //       renderItem={({ item, separators }) => (
            //         <View style={styles.rowBgColor}>
            //           <Image
            //             source={require("../assets/images/cardImage.png")}
            //             style={styles.avatarImageStyle}
            //           />
            //           <View style={styles.contentColor}>
            //             <Text style={styles.rowPrimaryText}>Two-line Item</Text>
            //             <Text numberOfLines={1} style={styles.rowSecondaryText}>
            //               Secondary text
            //             </Text>
            //           </View>
            //           {/* <Icon
            //             name={"message"}
            //             type={"MaterialCommunityIcons"}
            //             style={styles.iconStyle}
            //           /> */}
            //         </View>
            //       )}
            //       style={styles.list}
            //     />
            // </View>
        )
    }
}

const ListContainer=styled.View`

`;

const ContactImage=styled.Image`
  width:44px;
  height:44px;
  background:black;
  border-radius:22px;
  margin-left:20px;
  position:absolute;
  top:0;
  left:0;
`;

// const styles = StyleSheet.create({
//     root: {
//       flex: 1,
//       backgroundColor: "#FFF",
//       paddingTop: 8
//     },
//     list: {
//       flex: 1,
//       backgroundColor: "#FFF"
//     },
//     rowBgColor: {
//       height: 72,
//       flexDirection: "row",
//       alignItems: "center",
//       paddingLeft: 16
//     },
//     avatarImageStyle: {
//       width: 40,
//       height: 40,
//       backgroundColor: "#CCCCCC",
//       borderRadius: 20
//     },
//     contentColor: {
//       left: 72,
//       height: 72,
//       position: "absolute",
//       right: 0,
//       justifyContent: "center",
//       paddingRight: 40,
//       borderColor: "#BDBDBD",
//       borderBottomWidth: 0.5
//     },
//     rowPrimaryText: {
//       color: "#212121",
//       paddingBottom: 8,
//       fontSize: 16
//     },
//     rowSecondaryText: {
//       color: "#9E9E9E",
//       fontSize: 13
//     },
//     iconStyle: {
//       fontSize: 24,
//       color: "#CCCCCC",
//       position: "absolute",
//       right: 16
//     }
//   });