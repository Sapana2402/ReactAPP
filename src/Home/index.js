import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  addNote,
  decrement,
  increment,
  removeNote,
  updateNotes,
} from '../../features/counter/counterSlice';
import CustomeButton from '../components/CustomeButton';
import {
  ADD,
  MINUS,
  NOTES,
  NOTES_DETAILS,
  PLUS,
  YOUR_NOTES,
} from '../Utils/config';
import COLORS from '../Utils/colors';

const Home = () => {
  const [value, setValue] = useState('');
  const [btnText, setBtnText] = useState(ADD);
  const [currentId, setCurrentID] = useState();
  const dispatch = useDispatch();
  const data = useSelector(state => state?.data);
  const count = useSelector(state => state?.value);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.titleView}>
        <Text style={styles.flex}>{item.text}</Text>
        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => {
              setValue(item.text);
              setBtnText('UPDATE');
              setCurrentID(item.id);
            }}>
            <Image
              style={styles.editImage}
              source={require('../Utils/assets/edit.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(removeNote(item.id))}>
            <Image
              style={styles.deleteImge}
              source={require('../Utils/assets/delete.png')}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const addNotes = () => {
    if (value === '') {
      Alert.alert(NOTES_DETAILS);
    } else {
      dispatch(addNote(value));
      setValue('');
    }
  };

  return (
    <View style={styles.flexContainer}>
      <View style={styles.counterView}>
        <Text style={styles.counterText}>{count}</Text>
        <View style={styles.row}>
          <CustomeButton tiitle={PLUS} onPress={() => dispatch(increment())} />
          <CustomeButton
            tiitle={MINUS}
            onPress={() => dispatch(decrement())}
            style={styles.decrementButton}
          />
        </View>
      </View>

      <View style={styles.subView}>
        <Text style={styles.headingText}>{YOUR_NOTES}</Text>
        <View style={styles.notesView}>
          <TextInput
            autoFocus={true}
            style={styles.flex}
            placeholder={NOTES}
            value={value}
            onChangeText={item => setValue(item)}
          />
          <CustomeButton
            tiitle={btnText}
            onPress={() => {
              if (btnText == ADD) {
                addNotes();
              } else {
                dispatch(updateNotes({id: currentId, text: value}));
                setBtnText(ADD);
                setValue('');
                setCurrentID('');
              }
            }}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  counterView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  decrementButton: {
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
  },
  notesView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  headingText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subView: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: COLORS.lightCream,
    borderRadius: 10,
    padding: 10,
    paddingBottom: 10,
  },
  flex: {
    flex: 1,
  },
  titleView: {
    backgroundColor: COLORS.white,
    padding: 5,
    margin: 5,
    borderRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counterText: {
    fontWeight: 'bold',
  },
  deleteImge: {
    width: 26,
    height: 26,
  },
  editImage: {
    width: 20,
    height: 20,
  },
  flexContainer: {
    flex: 1,
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Home;
