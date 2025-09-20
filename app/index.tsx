import { Redirect } from 'expo-router';


export default function Index() {
  // Redirect to sign-in page as the entry point
  return <Redirect href="/(auth)/sign-in" />;
}

