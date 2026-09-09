
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx'

import Modal from 'react-modal'

Modal.setAppElement('#root') 
import "@daypicker/react/style.css";

createRoot(document.getElementById('root')).render(
<AuthProvider>
    <App />
</AuthProvider>

)
