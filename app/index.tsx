import { Text, SafeAreaView, StyleSheet, TextInput, Button, View } from 'react-native';
import react, {useState} from "react"

export default function App() {
    const [state, setState] = useState({
      firstName: '', 
      lastName: '', 
      email: '',
      password: '', 
      });
    const [greeting, setGreeting] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // success flag

    const handleSwitchLogin = () => {
      
    }

    const handlePress = () => {
      const { firstName, lastName, email, password } = state;

      if (firstName && lastName && email && password) {
        setGreeting(`Hello, ${firstName} ${lastName}! You have successfully registered your account!`);
        setIsSuccess(true); // Set success to true
      } else {
        setGreeting('Please fill in all fields.');
        setIsSuccess(false); // Set success to false
      }
    };
    // Registration
    // First Name, Last Name, Email, Password
    // If Fields are complete then say registration successful
    return (
      <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Sign Up </Text>
      <View style={styles.separator}/>
      <View style={styles.center}>
        <TextInput
          style={styles.input}
          autoCapitalize={'words'}
          value = {state.firstName}
          onChangeText={text => setState(prevState => ({ ...prevState, firstName: text }))}
          placeholder="First Name"
        />
        <View style={styles.separator}/>
        <TextInput
          style={styles.input}
          autoCapitalize={'words'}
          value = {state.lastName}
          onChangeText={text => setState(prevState => ({ ...prevState, lastName: text }))}
          placeholder="Last Name"
        />
        <View style={styles.separator}/>
        <TextInput
          style={styles.input}
          autoCapitalize={'words'}
          value = {state.email}
          onChangeText={text => setState(prevState => ({ ...prevState, email: text }))}
          placeholder="Email"
        />
        <View style={styles.separator}/>
        <TextInput
          style={styles.input}
          autoCapitalize={'words'}
          value = {state.password}
          onChangeText={text => setState(prevState => ({ ...prevState, password: text }))}
          placeholder="Password"
        />
        </View>
        <View style={styles.separator}/>
        <View style={styles.center}>
          <View style={styles.loginBtn}>
            <Button title="SIGN UP" onPress={handlePress} />
          </View>
        </View>
        <View style={styles.center}>
          <View style={styles.loginBtn}>
            <Button title="SWITCH TO LOGIN" onPress={handleSwitchLogin} />
          </View>
        </View>
        <Text style={[styles.paragraph, { color: isSuccess ? 'green' : 'red' }]}>
          {greeting}
        </Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 4,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 400, 
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
  }, 
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
    },
  center: {
    alignItems: 'center',
    marginVertical: 8,
  },
  loginBtn: {
    width: 200, 
    textAlign: 'center'
    },
  view: {
    marginVertical: 8, 
    padding: 20, 
    },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
  },
});
