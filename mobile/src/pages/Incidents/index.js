import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import styles from './styles';
import logo from '../../assets/logo.png';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigationToDetail(incident) {
    navigation.navigate('Details', { incident });
  }

  async function loadIncidents() {
    if (loading) return;

    if (total > 0 && incidents.length === total) return;

    setLoading(true);

    const response = await api.get('incidents', {
      params: { page }
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1)
    setLoading(false);
  };

  useEffect(() => {
    loadIncidents();
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text> Total de <Text style={styles.headerTotal}>{total} casos</Text></Text>
      </View>
      <View >
        <Text style={styles.title}>Bem-Vindo!</Text>
        <Text style={styles.subtitle}>Escolha um dos casos abaixo e salve o dia.</Text>

        <FlatList
          data={incidents}
          style={styles.incidentList}
          contentContainerStyle={{ paddingBottom: 200 }}
          keyExtractor={incident => String(incident.id)}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: incident }) => (
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{incident.name}</Text>

              <Text style={styles.incidentProperty}>CASO:</Text>
              <Text style={styles.incidentValue}>{incident.description}</Text>

              <Text style={styles.incidentProperty}>VALOR:</Text>
              <Text style={styles.incidentValue}>{
                Intl.NumberFormat(
                  'pt-BR',
                  { style: 'currency', currency: 'BRL' }
                ).format(incident.value)
              }</Text>

              <TouchableOpacity style={styles.detailsButton} onPress={() => navigationToDetail(incident)}>
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather color='#E02041' name="arrow-right" size={16} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}