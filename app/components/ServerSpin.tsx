'use client'
import { MessageSeverity } from "primereact/api";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import SessionInfo from "./SessionInfo";

export default function ServerSpin() {
const toastTopCenter = useRef<Toast>(null);

useEffect(() => {
  let ignore = false
  const loadData = async () => {
    try {
      // Notify the user that the server is spinning up
      showMessage(MessageSeverity.WARN, 'Server Spinning Up', 'Please wait...');
      const session = await SessionInfo();

      // Update the message once the server is up
      showMessage(MessageSeverity.SUCCESS, 'Server is Up', 'Data loaded successfully.');
    } catch (error) {
      console.log(error);
      // Notify the user about the server error
      showMessage(MessageSeverity.ERROR, 'Server Error', 'An error occurred.');
    }
  };

  loadData();
}, []);

const showMessage = (severity: MessageSeverity, summary: string | null, detail: string | null) => {
  toastTopCenter.current?.show([
    { severity: severity, summary: summary, detail: detail, life: 3000 }
  ])
}
return (
    <Toast ref={toastTopCenter} position="top-center" />
)
}