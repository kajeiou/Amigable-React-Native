import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, FlatList, TouchableOpacity, Modal } from 'react-native';
import tw from 'tailwind-react-native-classnames';
export default function App() {
  const [textEntered, setTextEntered] = useState('');
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)

  const onChangeHandler = (text) => {
    setTextEntered(text);
  };

  const addTask = () => {
    if (textEntered.trim() !== '') {
      setTasks([...tasks, textEntered]);
      setTextEntered('');
      //modalVisibleHandler()
    }
  };

  const clearTasks = () => {
    setTasks([]);
  };
  const modalVisibleHandler = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1 items-center bg-gray-200 pt-10`}>
      <Text style={tw`text-2xl font-bold mb-4 text-center`}>Accueil</Text>

      <View style={tw`flex-row mb-4`}>
        <View style={tw`flex-1 mr-2`}>
          <Button title="Se connecter" color="silver" />
        </View>
        <View style={tw`flex-1 ml-2`}>
          <Button title="S'inscrire" color="green" />
        </View>
      </View>

      <View style={tw`flex-row mb-4`}>
        <TextInput
          style={tw`flex-1 bg-gray-100 rounded p-2 mr-2`}
          onChangeText={onChangeHandler}
          value={textEntered}
          placeholder="Écrivez une tâche"
        />
        <Button
          title={`Add ${textEntered} task`}
          onPress={addTask}
          style={tw`flex-shrink-0`}
        />
      </View>
      {/* <ScrollView contentContainerStyle={tw`flex-grow bg-white p-4`}> */}

        <View style={tw`bg-gray-100 rounded-lg p-4 w-full`}>
          <Text style={tw`text-xl font-bold mb-4`}>Liste des tâches</Text>

          {tasks.length > 0 ? (
            <View>
              <View style={tw`flex-row border-b border-gray-300 pb-2 mb-2`}>
                <Text style={tw`w-1/4 font-bold`}>#</Text>
                <Text style={tw`w-3/4 font-bold`}>Tâche</Text>
              </View>
              <FlatList
                data={tasks}
                renderItem={({ item, index }) => 
                  <View key={index} style={tw`flex-row pb-2 mb-2`}>
                    <Text style={tw`w-1/4`}>{index + 1}</Text>
                    <Text style={tw`w-3/4`}>{item}</Text>
                  </View>}
                keyExtractor={(item, index) => index.toString()}
                style={tw`max-h-20`} />
            </View>
            
          ) : (
            
              <Text style={tw`text-gray-500 `}>Aucune tâche disponible</Text>
           
          )}

          <Text style={tw`mt-4`}>Nombre de tâches : {tasks.length}</Text>

          {tasks.length > 0 && (
            <View style={tw`mt-4`}>
              <Button title="Effacer les tâches" onPress={clearTasks} color="red" />
            </View>
          )}
        </View>
      </View>
      
        <View style={tw`flex-row items-center justify-between bg-white border-t border-gray-300`}>
          <TouchableOpacity style={tw`flex-1 p-8`}>
            <Text style={tw`text-gray-600`}>Accueil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-1 p-8`}>
            <Text style={tw`text-gray-600`}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-1 p-8`}>
            <Text style={tw`text-gray-600`}>Paramètres</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={modalVisible} />
    </View>
  );
}
