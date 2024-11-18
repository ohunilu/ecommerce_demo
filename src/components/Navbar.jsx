import { Flex, Text, Heading, Spacer, HStack, Button } from "@chakra-ui/react"

export default function Navbar() {

    return (
        <Flex as="nav" p="10px" alignItems="Center">
            <Heading as="h3"> Demo </Heading>
            <Spacer />

            <HStack spacing="10px">
            <Text>Hello Admin</Text>
            <Button colorScheme="blue">Logout</Button>
            </HStack>
        </Flex>
    )
}