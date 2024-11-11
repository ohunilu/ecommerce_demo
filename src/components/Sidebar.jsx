import { AttachmentIcon, CalendarIcon, LockIcon, RepeatIcon } from '@chakra-ui/icons'
import { List, ListIcon, ListItem } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <List color="white" fontSize="1.3em" spacing={6}>
        <ListItem>
            <NavLink to="/">
             <ListIcon as={CalendarIcon} color="white" />
            Dashboard
            </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to="/order">
            <ListIcon as={AttachmentIcon} color="white" />
            Order
            </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to="/product">
            <ListIcon as={RepeatIcon} color="white" />
            Product
            </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to="/user">
            <ListIcon as={LockIcon} color="white" />
            Users
            </NavLink>
        </ListItem>
    </List>
  )
}
