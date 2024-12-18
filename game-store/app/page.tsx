import Image from "next/image";
import HomePage from "./HomePage/HomePage";
import { MyProvider } from "../context/MyContext";

export default function Home() {
  return (
    <div>
      <MyProvider>
        <HomePage />
      </MyProvider>
    </div>
  );
}
