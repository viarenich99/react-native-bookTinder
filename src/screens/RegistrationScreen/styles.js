import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitLogin: {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCB255',
        borderRadius: 50,
        width:205,
        height:50,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
        marginTop: 17,
    },
    loginText: {
        color: 'white',
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 29,
    },
    View: {
        flex: 1,
    },
    LinearGradient: {
        alignItems: 'center',
        flex: 1,
        paddingTop:28,

    }
});
