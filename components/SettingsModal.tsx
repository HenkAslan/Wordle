import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useMMKVBoolean } from 'react-native-mmkv';
import { storage } from './storage';

export type Ref = BottomSheetModal;


const SettingsModel = forwardRef<Ref>((props, ref) => {
    const snapPoints = useMemo(() => ['50%'], []);
    const { dismiss } = useBottomSheetModal();

    const [hard, setHard] = useMMKVBoolean('hard-mode', storage);
    const [dark, setDark] = useMMKVBoolean('dark-mode', storage);
    const [contrast, setContrast] = useMMKVBoolean('contrast-mode', storage);

    const toggleDark = () => setDark(prev => !!!prev);
    const toggleHard = () => setHard(prev => !!!prev);
    const toggleContrast = () => setContrast(prev => !!!prev);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop
            opacity={0.8}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            {...props}
            onPress={dismiss}
        />
    ), []);

    return <BottomSheetModal
        snapPoints={snapPoints}
        backgroundComponent={renderBackdrop}
        ref={ref}
        index={0}
        handleComponent={null}
    >
        <View style={styles.contentContainer}>
            <View style={styles.btnModel}>
                <Text style={styles.containerHeaderLine}>SETTINGS</Text>
                <TouchableOpacity onPress={() => dismiss()}>
                    <Ionicons name='close' size={28} color={Colors.light.dark} />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <View style={styles.rowText}>
                    <Text style={styles.rowTextBig}>Hard Mode</Text>
                    <Text style={styles.rowTextSmall}>Kelimeler daha uzun ve daha zordur</Text>
                </View>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={hard ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleHard}
                    value={hard}
                />
            </View>
            <View style={styles.row}>
                <View style={styles.rowText}>
                    <Text style={styles.rowTextBig}>Dark Mode</Text>
                    <Text style={styles.rowTextSmall}>Uygulamanın temasını değiştir</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.rowText}>
                    <Text style={styles.rowTextBig}>High Contrast Mode</Text>
                    <Text style={styles.rowTextSmall}>Daha iyi görünürlük için kontrastı artırın</Text>
                </View>
            </View>
        </View>
    </BottomSheetModal>

});

export default SettingsModel

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerHeaderLine: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
    },
    btnModel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#888',
    },
    rowText: {
        flex: 1,
    },
    rowTextBig: {
        fontSize: 18,
    },
    rowTextSmall: {
        fontSize: 14,
        color: '#5e5e5e',
    },
})