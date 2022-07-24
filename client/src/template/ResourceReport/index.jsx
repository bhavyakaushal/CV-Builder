import React from "react";

/* Styles */
import CommonStyles from "./pdf_styles";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const SubHeading = ({ children, extraStyles = [] }) => {
    return <View style={[styles.subHeading, ...extraStyles]}>{children}</View>;
};

const InputBox = ({ children, extraStyles = [] }) => {
    return (
        <View style={[CommonStyles.inputBox, ...extraStyles]}>{children}</View>
    );
};

const TemplateBuilder = ({ userProfile, skills, projects }) => {
    return (
        <Document>
            <Page style={CommonStyles.page}>
                <View style={CommonStyles.template}>
                    <SubHeading>
                        <Text>My Report</Text>
                    </SubHeading>

                    <View style={CommonStyles.profileSection}>
                        <Text style={CommonStyles.profileHeader}>
                            {userProfile.username}
                        </Text>
                        <Text style={{ marginBottom: "9px", marginTop: "9px" }}>
                            {userProfile.email}
                        </Text>
                        <Text>{userProfile.contact}</Text>
                        <Text style={CommonStyles.textPink}>About Me</Text>
                        <InputBox
                            extraStyles={[{ height: "180px", width: "100%" }]}
                        >
                            <Text>{userProfile.aboutme}</Text>
                        </InputBox>
                    </View>
                    <View style={CommonStyles.skillSection}>
                        <SubHeading>
                            <Text>Skills</Text>
                        </SubHeading>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                flexWrap: "wrap",
                                alignContent: "flex-start",
                                width: "100%"
                            }}
                        >
                            {Array.isArray(skills) &&
                                skills.map((temp_skills, i) => {
                                    return (
                                        <InputBox
                                            extraStyles={[
                                                {
                                                    height: "60px",
                                                    width: "275px",
                                                    marginRight: "8px"
                                                }
                                            ]}
                                        >
                                            <Text>{temp_skills.skill}</Text>
                                            <Text
                                                style={{
                                                    marginTop: "6px",
                                                    color: "#ed1c3c"
                                                }}
                                            >
                                                Rating: &nbsp;
                                                {temp_skills.rating}/5
                                            </Text>
                                        </InputBox>
                                    );
                                })}
                        </View>
                    </View>

                    <View style={CommonStyles.projectSection}>
                        <SubHeading>
                            <Text>Projects</Text>
                        </SubHeading>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignContent: "flex-start",
                                width: "100%",
                                height: "400px"
                            }}
                        >
                            {Array.isArray(projects) &&
                                projects.map((temp_projects, i) => {
                                    return (
                                        <InputBox>
                                            <Text
                                                style={
                                                    CommonStyles.projectHeader
                                                }
                                            >
                                                {temp_projects.description}
                                            </Text>
                                            <Text>{temp_projects.title}</Text>
                                        </InputBox>
                                    );
                                })}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    subHeading: {
        fontSize: "16px",
        fontWeight: 600,
        color: "#323338",
        marginBottom: "24px"
    }
});

export default TemplateBuilder;
