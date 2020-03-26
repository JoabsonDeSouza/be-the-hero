import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import logo from '../../assets/logo.png';

export default function Details() {
  const route = useRoute();
  const navigation = useNavigation();

  const incident = route.params.incident;
  const valor = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value);

  const message = `Olá ${incident.ong}, estou entrando em contato pos gostaria de ajudar no caso "${incident.ong}" com o valor de ${valor}`;

  function navigationBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Feather color='#E02041' name="arrow-left" size={30} onPress={navigationBack} />
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{valor}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.contactTitle}>Salve o dia!</Text>
        <Text style={styles.contactTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.contactText}>Entre em contato</Text>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.detailsButton} onPress={sendMail}>
            <Text style={styles.detailsButtonText}>E-mail</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.detailsButton} onPress={sendWhatsapp}>
            <Text style={styles.detailsButtonText}>Whatsapp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
