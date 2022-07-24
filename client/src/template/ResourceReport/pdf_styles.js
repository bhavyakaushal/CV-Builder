import { StyleSheet } from "@react-pdf/renderer";

const commonStyles = StyleSheet.create({
    page: {
        padding: 20
    },
    template: {
        display: "flex",
        flexDirection: "column",
        padding: "16px 12px",
        fontFamily: "Tinos",
        fontWeight: 400,
        width: "100%",
        height: "100%"
    },
    profileSection: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        fontWeight: 500,
        fontSize: "12px",
        color: "#323338"
    },
    textPink: {
        color: "#ed1c3c",
        marginBottom: "9px",
        marginTop: "18px"
    },
    inputBox: {
        display: "flex",
        flexDirection: "column",
        borderRadius: "3px",
        color: "#939499",
        padding: "6px 12px",
        borderTopRightRadius: "24px",
        borderBottomLeftRadius: "24px",
        borderBottomRightRadius: "24px",
        backgroundColor: "#f5f6f8",
        border: "none",
        marginBottom: "10px"
    },
    profileHeader: {
        fontWeight: 600,
        textTransform: "capitalize",
        color: "#ed1c3c",
        fontSize: "24px",
        marginBottom: "9px"
    },
    imageLogo: {
        height: "24px",
        width: "24px"
    },
    skillSection: {
        width: "70%",
        marginTop: "41px",
        fontWeight: 500,
        fontSize: "12px"
    },
    projectSection: {
        width: "70%",
        marginTop: "41px",
        fontWeight: 500,
        fontSize: "12px"
    },
    projectHeader: {
        fontSize: "20px",
        color: "black",
        fontWeight: 600,
        marginBottom: "24px"
    }
});

export default commonStyles;
