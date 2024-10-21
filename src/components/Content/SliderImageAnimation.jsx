// SliderImageAnimation.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRedContext } from "../../context/RedContext"; // استيراد الـ Context

const SliderImageAnimation = () => {
  const { isRed, setIsRed, handleClick } = useRedContext(); // استخدام الـ Context

  const images = [
    "/assets/image 1 (1).png",
    "/assets/image 2.png",
    "/assets/image 5.png",
    "/assets/image 6.png",
    "/assets/image 9.png",
    "/assets/image 1 (1).png",
    "/assets/image 6.png",
    "/assets/image 5.png",
  ];

  const [rotationAngle, setRotationAngle] = useState(0);
  const [canNavigateNext, setCanNavigateNext] = useState(true);
  const [centralImage, setCentralImage] = useState("/assets/center image.png"); // حالة للصورة المركزية
  const [isScaling, setIsScaling] = useState(false); // حالة للتحجيم

  const handleNext = () => {
    handleClick();
    if (canNavigateNext) {
      setRotationAngle((prevAngle) => prevAngle - 60);
      setCanNavigateNext(false);
      setIsRed(true); // تحديث قيمة isRed في الـ Context
      setIsScaling(true); // تفعيل التحجيم
      setTimeout(() => {
        setCentralImage("/assets/center image (1).png"); // تغيير الصورة المركزية إلى الصورة الجديدة
        setIsScaling(false); // إعادة تعيين التحجيم بعد فترة
      }, 300); // مدة التحجيم (300 مللي ثانية)
    }
  };

  const handlePrevious = () => {
    handleClick();
    if (!canNavigateNext) {
      setRotationAngle((prevAngle) => prevAngle + 60);
      setCanNavigateNext(true);
      setIsRed(false); // تحديث قيمة isRed في الـ Context
      setIsScaling(true); // تفعيل التحجيم
      setTimeout(() => {
        setCentralImage("/assets/center image.png"); // إعادة الصورة المركزية إلى الأصلية
        setIsScaling(false); // إعادة تعيين التحجيم بعد فترة
      }, 300); // مدة التحجيم (300 مللي ثانية)
    }
  };

  const renderCurvedLines = (x1, y1, x2, y2) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const controlX = midX * 1.2;
    const controlY = midY * 1.2;

    return (
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0, // تأكد من أن قيمة zIndex أقل من الصور
        }}
      >
        <path
          d={`M ${250 + x1} ${250 + y1} Q ${250 + controlX} ${
            250 + controlY
          }, ${250 + x2} ${250 + y2}`}
          stroke={isRed ? "#F07000" : "#5CAC0E"}
          strokeWidth="1"
          strokeDasharray="22"
          fill="none"
        />
      </svg>
    );
  };

  return (
    <div
      className="slider-container"
      style={{ position: "relative", width: 500, height: 500, left: "30%" }}
    >
      <div
        className="clip-path"
        style={{ backgroundColor: isRed ? "#FEA150" : "#DDFFBC" }}
      >
        <motion.div
          className="circle"
          animate={{ rotate: rotationAngle }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ position: "relative", width: 500, height: 500 }}
        >
          {images.map((src, index) => {
            const angle = (index / images.length) * 360;
            const radians = (angle * Math.PI) / 180;
            const x = 250 * Math.cos(radians);
            const y = 250 * Math.sin(radians);

            return (
              <motion.div
                key={index}
                className="image-wrapper"
                style={{
                  position: "absolute",
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: `translate(-50%, -50%) rotate(${-rotationAngle}deg)`,
                  zIndex: 0,
                }}
              >
                <img
                  src={src}
                  alt={`Slider ${index}`}
                  className="slider-image"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    zIndex: "99999999",
                  }}
                />
              </motion.div>
            );
          })}

          {images.map((src, index) => {
            const angle1 = (index / images.length) * 360;
            const radians1 = (angle1 * Math.PI) / 180;
            const x1 = 250 * Math.cos(radians1);
            const y1 = 250 * Math.sin(radians1);

            const nextIndex = (index + 1) % images.length;
            const angle2 = (nextIndex / images.length) * 360;
            const radians2 = (angle2 * Math.PI) / 180;
            const x2 = 250 * Math.cos(radians2);
            const y2 = 250 * Math.sin(radians2);

            return renderCurvedLines(x1, y1, x2, y2);
          })}
        </motion.div>
      </div>
      <motion.div
        className="central-image"
        style={{
          position: "absolute",
          top: "70%",
          left: "30%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        <motion.img
          src={centralImage} // استخدام الصورة المختارة
          alt="Central Image"
          initial={{ scale: 1 }} // الحجم الابتدائي
          animate={{ scale: isScaling ? 0 : 1 }} // إذا كانت الحالة للتحجيم مفعلة، اجعل الصورة صغيرة
          transition={{ duration: 0.3 }} // مدة الانتقال
          style={{
            width: 293,
            height: 293,
            borderRadius: "50%",
            objectFit: "cover",
            transform: "rotate(0deg)",
          }}
        />
      </motion.div>
      <div className="controls">
        <button
          onClick={handlePrevious}
          disabled={canNavigateNext}
          style={{ backgroundColor: isRed ? "#FEA150" : "#5CAC0E" }}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3137 22.6274L1.00001 11.3137M12.3137 22.6274L23.6274 11.3137M12.3137 22.6274V2.47955e-05"
              stroke="#FFF4F4"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
      <div className="controls1">
        <button
          onClick={handleNext}
          disabled={!canNavigateNext}
          style={{ backgroundColor: isRed ? "#FEA150" : "#5CAC0E" }}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6863 2.62742L24 13.9411M12.6863 2.62742L1.37258 13.9411M12.6863 2.62742V22.6274"
              stroke="#FFF4F4"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SliderImageAnimation;
