import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Avatar } from 'react-native-elements';

const Stories = ({ children, imgProfile, onOpen }) => {

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ paddingVertical: 0 }}>
      {/* <TouchableOpacity
        onPress={() => {

        }
        }> */}
      <View
        style={{
          flexDirection: 'column',
          paddingHorizontal: 8,
          position: 'relative',
        }}>
        <View
          style={{
            // width: 68,
            // height: 68,
            width: 79,
            height: 79,
            backgroundColor: 'white',
            borderWidth: 1.8,
            borderRadius: 100,
            borderColor: '#c13584',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {children}
          <Avatar size="large" rounded showEditButton
            source={{
              uri: imgProfile
            }}
            title=""
            containerStyle={styles.userInfoAvatar}
          >
            <Avatar.Accessory size={23} onPress={onOpen} />
          </Avatar>
        </View>
        {/* <Text
            style={{
              textAlign: 'center',
              fontSize: 10,
              opacity: 1 == 0 ? 1 : 0.5,
            }}>
            Luisito
          </Text> */}
      </View>
      {/* </TouchableOpacity> */}
    </ScrollView>
  );
};

export default Stories;

const styles = StyleSheet.create({

})