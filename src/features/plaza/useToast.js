import { useState } from 'react'

export default function useToast() {
  const [message, setMessage] = useState('')

  return { message, showMessage: setMessage }
}
