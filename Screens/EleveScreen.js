import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const EleveScreen = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Optionnal
        strokeWidth: 2,
      },
    ],
  };

  const classes = [
    { id: '1', subject: 'Mathématiques', time: 'Lundi 9h - 10h' },
    { id: '2', subject: 'Français', time: 'Lundi 10h - 11h' },
    { id: '3', subject: 'Anglais', time: 'Mardi 9h - 10h' },
    { id: '4', subject: 'Histoire', time: 'Mardi 10h - 11h' },
    { id: '5', subject: 'Sciences', time: 'Mercredi 9h - 10h' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Tableau de bord de l'élève</Text>

      <Text style={styles.sectionHeader}>Statistiques des notes</Text>
      <LineChart
        data={data}
        width={screenWidth - 30} // Définir la largeur du graphique
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // intervalle de graduation
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <Text style={styles.sectionHeader}>Emploi du temps</Text>
      <FlatList
        data={classes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.classItem}>
            <Text style={styles.classText}>{item.subject}</Text>
            <Text style={styles.classText}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
  classItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  classText: {
    fontSize: 16,
  },
});

export default EleveScreen;
