import { BsMessenger } from "react-icons/bs";

function ContactButton() {
  return (
    <a
      href="https://m.me/540820209104279"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button
        style={{
          width: "60px",
          height: "60px",
          background: "linear-gradient(45deg, rgb(51,118,240) 20%, rgb(128,92,217) 40%, rgb(238,88,128) 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <BsMessenger style={{ fontSize: "30px" }} />
      </button>
    </a>
  );
}

export default ContactButton;
