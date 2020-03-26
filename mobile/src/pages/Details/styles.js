import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginTop: 48,
    marginBottom: 16,
  },

  incidentProperty: {
    marginTop: 24,
    fontSize: 16,
    color: '#41414d',
    fontWeight: 'bold'
  },

  contactBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },

  incidentValue: {
    marginTop: 8,
    fontSize: 16,
    color: '#737380'
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  detailsButton: {
    width: '48%',
    height: 50,
    backgroundColor: '#E02041',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  detailsButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  contactText: {
    marginTop: 16,
    marginBottom: 15,
    fontSize: 16,
    color: '#737380',
  },
});