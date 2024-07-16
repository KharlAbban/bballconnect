import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ClerkProvider} from "@clerk/clerk-react"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import './index.css'

// import CLERK API KEY
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPublishableKey) throw new Error("Missing Clerk publishable key!");

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>,
)
