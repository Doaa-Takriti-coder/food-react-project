import React from "react";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import { RedProvider } from "../context/RedContext"; // تأكد من تعديل المسار حسب موقع الملف

const Home = () => {
  return (
    <div>
      <RedProvider>
        <Navbar />
        <Content />
      </RedProvider>
    </div>
  );
};

export default Home;
