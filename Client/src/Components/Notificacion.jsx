import { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
 export const Notificacion = () => {
  const notify = () => toast('This is a test notification!');

  return (
    <div>
      <button onClick={notify}>Show Notification</button>
      <ToastContainer/>
    </div>
  );
};

