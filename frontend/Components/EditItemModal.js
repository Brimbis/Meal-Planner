import React, { useState, useEffect } from 'react';
import {
Modal,
Text,
TextInput,
View,
TouchableOpacity,
StyleSheet,
} from 'react-native';

export default function EditItemModal({ item, isVisible, onClose, onSave }) {
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description || '');

    useEffect(() => {
    setTitle(item.title);
    setDescription(item.description || '');
    }, [item]);

    const handleSave = () => {
        if (title.trim()) {
            onSave({ ...item, title: title.trim(), description: description.trim() });
            onClose();
        } else {
            alert('Please enter a title');
        }
        };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Edit Item</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="Enter title"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        />
                        <TextInput
                        style={styles.input}
                        placeholder="Enter description"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.successButton]}
                            onPress={handleSave}
                        >
                        <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                        <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
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
