// component that provides a Plus sign button that when clicked opens a modal to enter data.
import React, { useState } from "react";
import {
Modal,
Text,
TextInput,
View,
TouchableOpacity,
StyleSheet,
} from "react-native";

export default function AddItemModal({ onAddItem }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

const handlePress = () => {
    if (title.trim()) {
        onAddItem({title: title.trim(), description: description.trim()}); //we will define this function later
        setTitle("");
        setDescription("");
        setModalVisible(false);
    } else {
        alert("Please enter an item");
    }
};

return (
    <View>
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
        >
            <Text style={styles.addButtonText}> + </Text>
        </TouchableOpacity>
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add Item</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="Enter item"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        />
                        <TextInput
                        style={styles.input}
                        placeholder="Enter Description"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.successButton]}
                            onPress={handlePress}
                        >
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            title="Cancel"
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
);
}

const styles = StyleSheet.create({
    addButton: {
        width: 60,
        padding: 15,
        backgroundColor: "#0fff12",
        borderRadius: 50,
        alignSelf: "center",
    },
    addButtonText: {
        fontSize: 24,
        textAlign: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 10,
        height: 250,
        display: "flex",
        justifyContent: "space-between",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        padding: 8,
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        alignItems: "center",
    },
    successButton: {
        backgroundColor: "#0fff12",
    },
    cancelButton: {
        backgroundColor: "#ff5c5c",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});