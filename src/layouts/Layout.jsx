import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Resume from "../components/Resume"
import Modal from 'react-modal'
import useQuiosco from "../hooks/useQuiosco"
import ModalProduct from "../components/ModalProduct"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../hooks/useAuth"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const Layout = () => {
  const { user, error } = useAuth({middleware: 'auth'})
  const { modal } = useQuiosco()

  console.log(user)
  return (
    <>
      <div className="md:flex">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100">
          <Outlet />
        </main>
        <Resume />
      </div>
      <Modal isOpen={modal} style={customStyles}>
        <ModalProduct />
      </Modal>
      <ToastContainer />
    </>
  )
}

export default Layout