import { Pressable, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IC_Drawer_IOS } from '../../assets/svg/Icons'

const HeaderDrawer = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ paddingVertical: 10, paddingRight: 20, }} >
            <IC_Drawer_IOS style={{ marginLeft: 0 }} />
        </TouchableOpacity>
    )
}

export default HeaderDrawer

const styles = StyleSheet.create({})