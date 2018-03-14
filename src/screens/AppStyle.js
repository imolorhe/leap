import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  listItemText: {
    fontSize: 20
  }
});
