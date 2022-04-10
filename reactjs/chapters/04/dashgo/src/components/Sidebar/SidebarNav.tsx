import { Stack } from '@chakra-ui/react'
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri'
import NavLink from './NavLink'
import NavSection from './NavSection'

const GeneralLinksMap = [
  { name: 'Dashboard', icon: RiDashboardLine, url: '/dashboard' },
  { name: 'Users', icon: RiContactsLine, url: '/users' },
]

const AutomationLinksMap = [
  { name: 'Forms', icon: RiInputMethodLine, url: '/forms' },
  { name: 'Automation', icon: RiGitMergeLine, url: '/automation' },
]

export default function SidebarNav() {
  return (
    <Stack spacing={12} align="flex-start">
      <NavSection title="General">
        {GeneralLinksMap.map(({ name, icon, url }) => (
          <NavLink key={name} href={url} icon={icon} py={1}>
            {name}
          </NavLink>
        ))}
      </NavSection>

      <NavSection title="AUTOMATION">
        {AutomationLinksMap.map(({ name, icon, url }) => (
          <NavLink key={name} href={url} icon={icon} py={1}>
            {name}
          </NavLink>
        ))}
      </NavSection>
    </Stack>
  )
}
