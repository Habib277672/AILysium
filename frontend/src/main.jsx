import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "14px",
            borderRadius: "9999px",
            padding: "10px 18px",
          },
          success: {
            iconTheme: { primary: "#3b82f6", secondary: "#fff" }, // sky
          },
        }}
      />
    </AuthProvider>
  </StrictMode>,
)