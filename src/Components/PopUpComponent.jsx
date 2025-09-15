import React, { useEffect, useState } from "react";

function PopUpComponent({ msg }) {
  const [visible, setVisible] = useState(false);
 
  useEffect(() => {
    if (msg) {
      setVisible(true);

      // hide after 2 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);

      return () => clearTimeout(timer); 
    }
  }, [msg]);

  if (!visible) return null; 

  return (
    <div className="fixed inset-x-0 top-[12vh] flex justify-center z-50">
      <div className="text-black p-2 bg-amber-400 w-fit rounded shadow-lg">
        {msg}
      </div>
    </div>
  );
}

export default PopUpComponent;
