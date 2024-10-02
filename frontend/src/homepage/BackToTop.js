import React, { useEffect, useState } from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai';


// 置頂按鈕
function BackToTop() {  
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  return (
    <>
    {showScrollButton && (
      <button
        className="btn btn-primary rounded-circle shadow"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "20px",
          zIndex: "1000"
        }}
        onClick={scrollToTop}
      >
        <AiOutlineArrowUp style={{ fontSize: "24px" }} />
      </button>
    )}
    </>
  )
}

export default BackToTop