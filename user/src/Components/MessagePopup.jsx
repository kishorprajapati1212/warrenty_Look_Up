import React, { useEffect, useState } from "react";

const MessagePopup = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onClose(); // inform parent to remove it
    }, 3000); // auto close in 3s

    return () => clearTimeout(timeout);
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  const backgroundColor =
    type === "success" ? "rgba(46, 204, 113, 0.9)" : "rgba(231, 76, 60, 0.9)";

  return visible ? (
    <>
      <div
        style={{
          position: "fixed",
          top: "15%",
          right: "20px",
          zIndex: 9999,
          backgroundColor,
          color: "#fff",
          padding: "12px 16px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          minWidth: "260px",
          display: "flex",
          flexDirection: "column",
          animation: "slideIn 0.3s ease-out",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{message}</span>
          <button
            onClick={handleClose}
            style={{
              marginLeft: "10px",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>
        {/* Progress Bar */}
        <div
          style={{
            marginTop: "8px",
            width: "100%",
            height: "4px",
            backgroundColor: "rgba(255,255,255,0.3)",
            overflow: "hidden",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              height: "100%",
              backgroundColor: "#fff",
              animation: "progressShrink 3s linear forwards",
            }}
          />
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes progressShrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </>
  ) : null;
};

export default MessagePopup;
