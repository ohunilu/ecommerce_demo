import { AttachmentIcon, CalendarIcon, LockIcon, RepeatIcon, SettingsIcon, Divider } from '@chakra-ui/icons'
import { List, ListIcon, ListItem, Flex, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <List color="white" fontSize="1.3em" spacing={6}>
        <ListItem>
        <Text fontSize="2xl" fontWeight="bold">E-commerce</Text>
        </ListItem>
        <ListItem>
            <NavLink to="/">
            <Flex alignItems="center">
                <ListIcon as={CalendarIcon} color="white" fontSize="sm" />
                <Text fontSize="sm" fontWeight="semibold">Dashboard</Text>
            </Flex>
            </NavLink>
        </ListItem>
        <Divider borderColor={"white"} borderWidth={"1px"} />
        <ListItem>
            <NavLink to="/order">
            <Flex alignItems="center">
                <ListIcon as={AttachmentIcon} color="white" fontSize="sm"/>
                <Text fontSize="sm" fontWeight="semibold">Order</Text>
            </Flex>
            </NavLink>
        </ListItem>
        <Divider borderColor={"white"} borderWidth={"1px"} />
        <ListItem>
            <NavLink to="/product">
            <Flex alignItems="center">
                <ListIcon as={RepeatIcon} color="white" fontSize="sm"/>
                <Text fontSize="sm" fontWeight="semibold">Product</Text>
            </Flex>
            </NavLink>
        </ListItem>
        <Divider borderColor={"white"} borderWidth={"1px"} />
        <ListItem>
            <NavLink to="/stock">
            <Flex alignItems="center">
                <ListIcon as={LockIcon} color="white" fontSize="sm"/>
                <Text fontSize="sm" fontWeight="semibold">Stocks</Text>
            </Flex>
            </NavLink>
        </ListItem>
        <Divider borderColor={"white"} borderWidth={"1px"} />
        <ListItem>
            <NavLink to="/user">
            <Flex alignItems="center">
                <ListIcon as={LockIcon} color="white" fontSize="sm"/>
                <Text fontSize="sm" fontWeight="semibold">Users</Text>
            </Flex>
            </NavLink>
        </ListItem>
        <Divider borderColor={"white"} borderWidth={"1px"} />
        <ListItem>
            <NavLink to="/setting">
            <Flex alignItems="center">
                <ListIcon as={SettingsIcon} color="white" fontSize="sm"/>
                <Text fontSize="sm" fontWeight="semibold">Settings</Text>
            </Flex>           
            </NavLink>
        </ListItem>
    </List>
  )
}
