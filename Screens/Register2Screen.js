const {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
  } = require('react-native');
  import {useNavigation} from '@react-navigation/native';
  import styles from './style';
  import Feather from 'react-native-vector-icons/Feather';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Fontisto from 'react-native-vector-icons/Fontisto';
  import Error from 'react-native-vector-icons/MaterialIcons';
  import {useState} from 'react';
  import axios from 'axios';
  import Toast from 'react-native-toast-message';
  import {RadioButton} from 'react-native-paper';
  import { API_URL } from '@env';
  
  function Register2Screen({props}) {
    const [identifiant, setIdentifiant] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [telephoneVerify, setTelephoneVerify] = useState(false);
    const [identifiantVerify, setIdentifiantVerify] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState('');
    const [secretText, setSecretText] = useState('');
    const [NiveauClasse, setNiveauClasse] = useState('');

    const [Matiere, setMatiere] = useState('');
    const [Classe, setClasse] = useState('');
    const [DateNaissance, setDatNaiss] = useState('');
  
    const navigation = useNavigation();
    function handelSubmit() {
      const userData = {
        identifiant: identifiant,
         nom: nom,
         prenom: prenom,
         password: password,
         telephone: telephone, 
         userType,
         NiveauClasse,
         DateNaissance,
      };
      // if (nameVerify && emailVerify && passwordVerify && mobileVerify) {
        if (userType == 'Admin' && secretText != '1243') {
          return Alert.alert('Invalid Admin');
        }
        axios
          .post(`${API_URL}/register`, userData)
          .then(res => {
            console.log(res.data);
            if (res.data.status == 'ok') {
              Alert.alert('Registered Successfull!!');
              navigation.navigate('PL');
            } else {
              Alert.alert(JSON.stringify(res.data));
            }
          })
          .catch(e => console.log(e));
      // } else {
        // Alert.alert('Fill mandatory details');
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error!!',
        //   text2: 'Fill mandatory details',
        //   visibilityTime: 5000,
        // });
      // }
    }
  
    
    function handleNom(e) {
        const nomVar = e.nativeEvent.text;
        setNom(nomVar);
      }

      function handlePrenom(e) {
        const prenomVar = e.nativeEvent.text;
        setPrenom(prenomVar);
      }

      function handleNiveauClasse(e) {
        const niveauVar = e.nativeEvent.text;
        setNiveauClasse(niveauVar);
      }

      function handleTelephone(e) {
        const telephoneVar = e.nativeEvent.text;
        setTelephone(telephoneVar);

        if (/[0-8]/.test(telephoneVar)) {
            setTelephone(telephoneVar);
            setTelephoneVerify(true);
          }
      }
  

 
  function handleIdentifiant(e) {
    const identifiantVar = e.nativeEvent.text;
    setIdentifiant(identifiantVar);
    setIdentifiantVerify(false);

    if (identifiantVar.length > 1) {
      setIdentifiantVerify(true);
    }
  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }
    
   
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        style={{backgroundColor: 'white'}}>
        <View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/signUp.png')}
            />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.text_header}>Enregistrement!</Text>
  
            <View style={styles.radioButton_div}>
              {/* <Text style={styles.radioButton_title}> Login as</Text> */}
              <View style={styles.radioButton_inner_div}>
                <Text style={styles.radioButton_text}>Eleve</Text>
                <RadioButton
                  value="Eleve"
                  status={userType == 'Eleve' ? 'checked' : 'unchecked'}
                  onPress={() => setUserType('Eleve')}
                />
              </View>

              <View style={styles.radioButton_inner_div}>
                <Text style={styles.radioButton_text}>Admin</Text>
                <RadioButton
                  value="Admin"
                  status={userType == 'Admin' ? 'checked' : 'unchecked'}
                  onPress={() => setUserType('Admin')}
                />

              </View>
              <View style={styles.radioButton_inner_div}>
                <Text style={styles.radioButton_text}>Professeur</Text>
                <RadioButton
                  value="Professeur"
                  status={userType == 'Professeur' ? 'checked' : 'unchecked'}
                  onPress={() => setUserType('Professeur')}
                />
              </View>

              <View style={styles.radioButton_inner_div}>
                <Text style={styles.radioButton_text}>Parent</Text>
                <RadioButton
                  value="Parent"
                  status={userType == 'Parent' ? 'checked' : 'unchecked'}
                  onPress={() => setUserType('Parent')}
                />
              </View>


            </View>
  
            {userType == 'Admin' ? (
              <View style={styles.action}>
                <FontAwesome
                  name="user-o"
                  color="#420475"
                  style={styles.smallIcon}
                />
                <TextInput
                  placeholder="Secret Text"
                  style={styles.textInput}
                  onChange={e => setSecretText(e.nativeEvent.text)}
                />
              </View>
            ) : (
              ''
            )}
  {userType == 'Professeur' ? (
              <View style={styles.action}>
                <FontAwesome
                  name="user-o"
                  color="#420475"
                  style={styles.smallIcon}
                />
                <TextInput
                  placeholder="Matiere"
                  style={styles.textInput}
                  onChange={e => setMatiere(e.nativeEvent.text)}
                />
              </View>
            ) : (
              ''
            )}

             {userType == 'Eleve' ? (
              <View style={styles.action}>
                <FontAwesome
                  name="user-o"
                  color="#420475"
                  style={styles.smallIcon}
                />
                <TextInput
                  placeholder="NiveauClasse"
                  style={styles.textInput}
                  onChange={e => handleNiveauClasse(e)}
                />
              </View>
              
            ) : (
              ''
            )}
             {userType == 'Eleve' ? (
              <View style={styles.action}>
                <FontAwesome
                  name="user-o"
                  color="#420475"
                  style={styles.smallIcon}
                />
                <TextInput
                  placeholder="Date de Naissance"
                  style={styles.textInput}
                  onChange={e => setDatNaiss(e.nativeEvent.text)}
                />
              </View>
              
            ) : (
              ''
            )}
  
           
            <View style={styles.action}>
              <FontAwesome
                name="id-badge"
                color="#420475"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Identifiant"
                style={styles.textInput}
                onChange={e => handleIdentifiant(e)}
              />
              {identifiant.length < 1 ? null : identifiantVerify ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : (
                <Error name="error" color="red" size={20} />
              )}
            </View>
            {identifiant.length < 1 ? null : identifiantVerify ? null : (
              <Text
                style={{
                  marginLeft: 20,
                  color: 'red',
                }}>
                L'identifiant doit comporter plus d'un caracractere
              </Text>
            )}
            
            <View style={styles.action}>
              <FontAwesome
                name="user"
                color="black"
                size={24}
                style={{marginLeft: 0, paddingRight: 5}}
              />
              <TextInput
                placeholder="Nom"
                style={styles.textInput}
                onChange={e => handleNom(e)}
              />
              {/* {nom.length < 1 ? null : emailVerify ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : (
                <Error name="error" color="red" size={20} />
              )} */}
            </View>
            {/* {nom.length < 1 ? null : emailVerify ? null : (
              <Text
                style={{
                  marginLeft: 20,
                  color: 'red',
                }}>
                Enter Proper Email Address
              </Text>
            )} */}
            <View style={styles.action}>
              <FontAwesome
                name="user"
                color="black"
                size={24}
                style={{marginLeft: 0, paddingRight: 5}}
              />
              <TextInput
                placeholder="Prenom"
                style={styles.textInput}
                onChange={e => handlePrenom(e)}
                maxLength={10}
              />
              {/* {prenom.length < 1 ? null : mobileVerify ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : (
                <Error name="error" color="red" size={20} />
              )} */}
            </View>
            {/* {prenom.length < 1 ? null : mobileVerify ? null : (
              <Text
                style={{
                  marginLeft: 20,
                  color: 'red',
                }}>
                Phone number with 6-9 and remaing 9 digit with 0-9
              </Text>
            )} */}

<View style={styles.action}>
              <FontAwesome
                name="mobile"
                color="black"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Telephone"
                style={styles.textInput}
                onChange={e => handleTelephone(e)}
              />
              {telephone.length < 1 ? null : telephoneVerify ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : (
                <Error name="error" color="red" size={20} />
              )}
            </View>
            {telephone.length < 1 ? null : telephoneVerify ? null : (
              <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Le numero de telephone doit contenir 8 chiffres 
            </Text>
            )}

            <View style={styles.action}>
              <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                onChange={e => handlePassword(e)}
                secureTextEntry={showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {password.length < 1 ? null : !showPassword ? (
                  <Feather
                    name="eye-off"
                    style={{marginRight: -10}}
                    color={passwordVerify ? 'green' : 'red'}
                    size={23}
                  />
                ) : (
                  <Feather
                    name="eye"
                    style={{marginRight: -10}}
                    color={passwordVerify ? 'green' : 'red'}
                    size={23}
                  />
                )}
              </TouchableOpacity>
            </View>
            {password.length < 1 ? null : passwordVerify ? null : (
              <Text
                style={{
                  marginLeft: 20,
                  color: 'red',
                }}>
                Majuscule,Number and 6 or more characters.
              </Text>
            )}
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.inBut} onPress={() => handelSubmit()}>
              <View>
                <Text style={styles.textSign}>ENREGISTREZ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );

    
  }
  
  export default Register2Screen;