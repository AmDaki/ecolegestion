import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ScheduleScreen = () => {
  const [schedule, setSchedule] = useState({
    lundi: [],
    mardi: [],
    mercredi: [],
    jeudi: [],
    vendredi: [],
    samedi: [],
    dimanche: []
  });

  const [newTask, setNewTask] = useState({ day: '', hour: '', task: '' });

  const addTask = () => {
    // Vérifiez que le jour existe dans schedule
    if (newTask.day in schedule) {
      if (newTask.hour && newTask.task) {
        setSchedule((prevSchedule) => ({
          ...prevSchedule,
          [newTask.day]: [...prevSchedule[newTask.day], { hour: newTask.hour, task: newTask.task }]
        }));
        setNewTask({ day: '', hour: '', task: '' });
        Alert.alert('Succès', 'Créneau ajouté !');
      } else {
        Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
      }
    } else {
      Alert.alert('Erreur', "Le jour spécifié n'est pas valide. Utilisez l'un des jours définis (lundi, mardi, etc.).");
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Emploi du Temps</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Jour (lundi, mardi, etc.)"
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

      <View style={styles.scheduleContainer}>
        {Object.keys(schedule).map((day) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
            {schedule[day].length > 0 ? (
              schedule[day].map((item, index) => (
                <View key={index} style={styles.taskRow}>
                  <Text style={styles.taskText}>{item.hour} - {item.task}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noTaskText}>Aucune tâche ajoutée</Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF'
  },
  scheduleContainer: {
    flex: 1,
  },
  dayContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  taskText: {
    fontSize: 16,
    color: '#333333'
  },
  noTaskText: {
    fontSize: 16,
    color: '#888888'
  },
});

export default ScheduleScreen;
