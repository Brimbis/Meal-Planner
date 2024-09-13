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
      <Text style={styles.title}> Login </Text>
      <View style={styles.view}>
        <TextInput
          style={styles.input}
          autoCapitalize={'words'}
          value = {state.firstName}
          onChangeText={text => setState(prevState => ({ ...prevState, firstName: text }))}
          placeholder="Enter your first name"
        />
        <View style={styles.separator}/>
        <TextInput
          style={styles.input}
          autoCapitalize={'words'}
          value = {state.lastName}
          onChangeText={text => setState(prevState => ({ ...prevState, lastName: text }))}
          placeholder="Enter your last name"
        />
        <View style={styles.separator}/>
        <TextInput
          style={styles.input}
          autoCapitalize={'words'}
          value = {state.email}
          onChangeText={text => setState(prevState => ({ ...prevState, email: text }))}
          placeholder="Enter your email"
        />
        <View style={styles.separator}/>
        <TextInput
          style={styles.input}
          autoCapitalize={'words'}
          value = {state.password}
          onChangeText={text => setState(prevState => ({ ...prevState, password: text }))}
          placeholder="Enter your password"
        />
        </View>
        <View style={styles.loginBtnContainer}>
          <View style={styles.loginBtn}>
            <Button title="Login" onPress={handlePress} />
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
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  }, 
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
    },
  loginBtnContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  loginBtn: {
    width: '50%', 
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
