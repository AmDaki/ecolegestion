import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@env';

const ScheduleScreen = () => {
  const [classes, setClasses] = useState([]); // Liste des classes disponibles
  const [selectedClass, setSelectedClass] = useState(''); // Classe sélectionnée
  const [schedule, setSchedule] = useState({});
  const [newTask, setNewTask] = useState({ day: '', hour: '', task: '' });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = () => {
    axios
      .get(`${API_URL}/get-all-classes`)
      .then((response) => {
        if (response.data.status === 'ok') {
          setClasses(response.data.classes);
        } else {
          Alert.alert('Erreur', response.data.message || 'Erreur inconnue');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des classes:', error);
        Alert.alert('Erreur', 'Impossible de récupérer les classes.');
      });
  };

  const addTask = () => {
    const regex = /^(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche) (\d{2})\/(\d{2})\/(\d{2})$/;
    const match = newTask.day.match(regex);
  
    if (!selectedClass) {
      Alert.alert('Erreur', 'Veuillez sélectionner une classe.');
      return;
    }
  
    if (!newTask.day || !newTask.hour || !newTask.task) {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
      return;
    }
  
    if (!match) {
      Alert.alert('Erreur', 'Veuillez entrer la date au format "Lundi 26/11/24"');
      return;
    }
  
    setSchedule((prevSchedule) => {
      const updatedSchedule = { ...prevSchedule };
  
      if (!updatedSchedule[selectedClass]) {
        updatedSchedule[selectedClass] = {
          lundi: [],
          mardi: [],
          mercredi: [],
          jeudi: [],
          vendredi: [],
          samedi: [],
          dimanche: [],
        };
      }
  
      updatedSchedule[selectedClass][newTask.day] = [
        ...(updatedSchedule[selectedClass][newTask.day] || []),
        { hour: newTask.hour, task: newTask.task },
      ];
  
      return updatedSchedule;
    });
  
    setNewTask({ day: '', hour: '', task: '' });
    Alert.alert('Succès', 'Créneau ajouté !');
  };

  const saveSchedule = () => {
    if (!selectedClass || !schedule[selectedClass]) {
      Alert.alert('Erreur', 'Aucun emploi du temps à enregistrer.');
      return;
    }
  
    // Filtrer les jours vides
    const filteredSchedule = Object.keys(schedule[selectedClass]).reduce((acc, day) => {
      const tasks = schedule[selectedClass][day];
      if (tasks.length > 0) {
        acc[day] = tasks;
      }
      return acc;
    }, {});
  
    // Si aucun jour n'a de tâches, on ne sauvegarde pas
    if (Object.keys(filteredSchedule).length === 0) {
      Alert.alert('Erreur', 'Aucune tâche à enregistrer.');
      return;
    }
  
    const payload = {
      classe: selectedClass,
      emploiDuTemps: filteredSchedule,
    };
  
    axios
      .post(`${API_URL}/save-emploitemps`, payload)
      .then((response) => {
        if (response.data.status === 'ok') {
          Alert.alert('Succès', 'Emploi du temps enregistré avec succès !');
        } else {
          Alert.alert('Erreur', response.data.message || 'Erreur inconnue.');
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement de l'emploi du temps:", error);
        Alert.alert('Erreur', "Impossible d'enregistrer l'emploi du temps.");
      });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Emploi du Temps</Text>

      {/* Sélection de la classe */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sélectionnez une classe :</Text>
        <Picker
          selectedValue={selectedClass}
          onValueChange={(itemValue) => setSelectedClass(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Choisissez une classe" value="" />
          {classes.map((cls) => (
            <Picker.Item key={cls.nomClasse} label={cls.nomClasse} value={cls.nomClasse} />
          ))}
        </Picker>
      </View>

      {/* Ajouter une tâche */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Jour et Date (ex: Mardi 26/11/24)"
          value={newTask.day}
          onChangeText={(text) => setNewTask({ ...newTask, day: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Heure (ex: 10:00)"
          value={newTask.hour}
          onChangeText={(text) => setNewTask({ ...newTask, hour: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Tâche (ex: Math, Anglais)"
          value={newTask.task}
          onChangeText={(text) => setNewTask({ ...newTask, task: text })}
        />

        <Button title="Ajouter" onPress={addTask} color="#4CAF50" />
      </View>

      <View style={styles.inputContainer}>
        <Button
          title="Enregistrer l'emploi du temps"
          onPress={saveSchedule}
          color="#2196F3"
        />
      </View>

      {/* Afficher l'emploi du temps */}
      {selectedClass && schedule[selectedClass] ? (
        <View style={styles.scheduleContainer}>
          <Text style={styles.sectionTitle}>
            Emploi du temps pour la classe {selectedClass}
          </Text>
          {Object.keys(schedule[selectedClass]).map((day) => (
  schedule[selectedClass][day].length > 0 && (
    <View key={day} style={styles.dayContainer}>
      <Text style={styles.dayTitle}>
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </Text>
      {schedule[selectedClass][day].map((item, index) => (
        <View key={index} style={styles.taskRow}>
          <Text style={styles.taskText}>
            {item.hour} - {item.task}
          </Text>
        </View>
      ))}
    </View>
  )
))}

        </View>
      ) : (
        <Text style={styles.noScheduleText}>
          Sélectionnez une classe pour afficher ou créer son emploi du temps.
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  scheduleContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskRow: {
    marginBottom: 10,
    padding: 5,
  },
  taskText: {
    fontSize: 14,
  },
  noScheduleText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  noTaskText: {
    fontSize: 14,
    color: '#888',
  },
});

export default ScheduleScreen;
