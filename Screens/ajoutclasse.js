import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env'; // Import API_URL depuis le fichier .env

const CreateClassScreen = () => {
  const [className, setClassName] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [classCapacity, setClassCapacity] = useState('');
  const [classes, setClasses] = useState([]); // Stockage des classes
  const [modalVisible, setModalVisible] = useState(false); // Contrôle du modal

  const handleCreateClass = () => {
    if (!className || !classGrade || isNaN(classCapacity) || classCapacity <= 0) {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis et la capacité doit être un nombre positif.');
      return;
    }

    const classData = {
      nomClasse: className,
      niveau: classGrade,
      capacite: parseInt(classCapacity),
    };

    axios.post(`${API_URL}/registerClasse`, classData)
      .then(() => {
        Alert.alert('Succès', 'Classe créée avec succès!');
        setClassName('');
        setClassGrade('');
        setClassCapacity('');
      })
      .catch((error) => {
        if (error.response) {
          console.error('Erreur réponse:', error.response.data);
        } else {
          console.error('Erreur:', error.message);
        }
        Alert.alert('Erreur', 'Impossible de créer la classe.');
      });
  };

  const fetchClasses = () => {
    axios.get(`${API_URL}/get-all-classes`)
      .then((response) => {
        if (response.data.status === 'ok') {
          setClasses(response.data.classes); // Stocke les classes
          setModalVisible(true); // Ouvre le modal
        } else {
          Alert.alert('Erreur', response.data.message || 'Erreur inconnue');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des classes:', error);
        Alert.alert('Erreur', 'Impossible de récupérer les classes.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Créer une Nouvelle Classe</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom de la classe :</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 6ème A"
          value={className}
          onChangeText={setClassName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Niveau :</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 6ème"
          value={classGrade}
          onChangeText={setClassGrade}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Capacité :</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 30"
          keyboardType="numeric"
          value={classCapacity}
          onChangeText={setClassCapacity}
        />
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateClass}>
        <Text style={styles.buttonText}>Créer la Classe</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createButton} onPress={fetchClasses}>
        <Text style={styles.buttonText}>Liste des Classes créées</Text>
      </TouchableOpacity>

      {/* Modal pour afficher la liste des classes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Liste des Classes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FlatList
                data={classes}
                horizontal // Affichage horizontal
                keyExtractor={(item) => `${item.nomClasse}-${item.niveau}-${item.capacite}`} // Utilisation d'une combinaison unique des champs
                renderItem={({ item }) => (
                  <View style={styles.classCard}>
                    <View style={styles.cardDetails}>
                      <Text style={styles.classText}>Nom : {item.nomClasse}</Text>
                      <Text style={styles.classText}>Niveau : {item.niveau}</Text>
                      <Text style={styles.classText}>Capacité : {item.capacite}</Text>
                    </View>
                  </View>
                )}
              />
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F3F8FE',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2A9D8F',
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'uppercase',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#264653',
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    borderColor: '#E1E8ED',
    borderWidth: 1,
    color: '#2A9D8F',
  },
  createButton: {
    backgroundColor: '#E76F51',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2A9D8F',
  },
  classCard: {
    marginRight: 15, // Espacement entre les cartes
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E8ED',
    width: 250, // Largeur fixe des cartes
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  cardDetails: {
    alignItems: 'center',
  },
  classText: {
    fontSize: 16,
    color: '#264653',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#E76F51',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});

export default CreateClassScreen;
