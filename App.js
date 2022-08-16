import { NativeBaseProvider } from "native-base";
import { Home } from "./src/screen/home";

export default function App() {
  return (
    <NativeBaseProvider>
      <Home />
    </NativeBaseProvider>
  );
}
