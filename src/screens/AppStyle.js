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
  },
  taskImageContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskImage: {
    width: 80,
    height: 80,
    borderRadius: 10
  }
});
