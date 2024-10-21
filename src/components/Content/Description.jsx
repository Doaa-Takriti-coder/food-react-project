import React, { useState } from "react";
import { useRedContext } from "../../context/RedContext";
import { motion } from "framer-motion";

const Description = () => {
  const { isRed, isScaling } = useRedContext(); // استخدام الـ Context

  return (
    <div className="Description">
      <h1 style={{ color: isRed ? "#FEA150" : "#5CAC0E" }}>Delicious</h1>
      <h2>Quench the Hunger</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet ipsum,
        auctor quis sagittis felis risus, a odio. Amet ante nulla sem mauris.
        Sollicitudin ultrices enim quam.
      </p>
      <motion.button
        style={{ backgroundColor: isRed ? "#FEA150" : "#5CAC0E", originX: 0 }} // التأكد من بقاء الزر ثابتًا من اليسار
        animate={{
          scaleX: isScaling ? 0.8 : 1, // تقليص العرض إلى 80%
          scaleY: isScaling ? 0.95 : 1, // تقليص الطول إلى 95%
          originX: 0, // بقاء الزر ثابتًا من جهة اليسار
        }}
        transition={{ duration: 0.3 }} // مدة الانتقال
      >
        Quench Now
      </motion.button>
    </div>
  );
};

export default Description;
