// RedContext.js
import React, { createContext, useContext, useState } from 'react';

// إنشاء الـ Context
const RedContext = createContext();

// إنشاء Provider
export const RedProvider = ({ children }) => {
  const [isRed, setIsRed] = useState(false);
  const [isScaling, setIsScaling] = useState(false); // حالة للتحجيم

  const handleClick = () => {
    setIsScaling(true); // تفعيل التحجيم عند الضغط
    setTimeout(() => {
      setIsScaling(false); // إعادة التحجيم بعد فترة
    }, 300); // مدة التحجيم
  };
  return (
    <RedContext.Provider value={{ isRed, setIsRed, isScaling, setIsScaling,handleClick}}>
      {children}
    </RedContext.Provider>
  );
};

// دالة مساعدة للوصول إلى الـ Context
export const useRedContext = () => {
  return useContext(RedContext);
};
