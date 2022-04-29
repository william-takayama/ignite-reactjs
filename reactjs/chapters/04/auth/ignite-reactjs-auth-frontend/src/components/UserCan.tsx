import React from 'react'
import { useUserCan } from '../hooks/useUserCan'

interface UserCanProps {
  children: React.ReactNode
  permissions?: string[]
  roles?: string[]
}

export default function UserCan({
  children,
  permissions,
  roles,
}: UserCanProps) {
  const userCanSeeComponent = useUserCan({ permissions, roles })

  if (!userCanSeeComponent) {
    return null
  }

  return <>{children}</>
}
