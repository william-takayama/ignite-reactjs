import { useEffect } from 'react'
import { signOutClient } from '../contexts/AuthContext'

export let authChannel: BroadcastChannel | undefined

export function useBroadcastChannel() {
  // This native API broadcast data event between different browsing contexts windows | tabs | iframes
  // more about it: https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data.type) {
        case 'signOut':
          signOutClient(false)
          break
        case 'signIn':
          window.location.replace('http://localhost:3000/dashboard')
          break
        default:
          break
      }
    }
  }, [])
}
