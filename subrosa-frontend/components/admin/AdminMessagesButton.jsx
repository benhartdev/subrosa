import React from "react";
import { useRouter } from "next/navigation";
import { FaEnvelopeOpenText } from "react-icons/fa";

const AdminMessagesButton = () => {
  const router = useRouter();

  return (
    <button className="admin-message-button" onClick={() => router.push("/admin/messages")}>
      <FaEnvelopeOpenText className="admin-message-icon" />
      <span>Messages</span>
    </button>
  );
};

export default AdminMessagesButton;
