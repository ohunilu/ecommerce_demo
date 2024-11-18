import { Card, CardBody, CardHeader, Flex, SimpleGrid, Text} from "@chakra-ui/react";

export default function Dashboard () {

  return (
<Flex direction="column">
  <SimpleGrid spacing={15} minChildWidth="250px"> 
    <Card borderTop={"8px"} borderColor={"blue.600"}>
    <CardHeader>
        <Text fontSize="sm">Total Sales</Text>
      </CardHeader>
      <CardBody>
        <Text fontSize="4xl" fontWeight="bold">₦ 2,500,000.00</Text> 
        </CardBody>
    </Card>
    <Card borderTop={"8px"} borderColor={"blue.600"}>
      <CardHeader>
      <Text fontSize="sm">Monthly Average Order Value</Text>
      </CardHeader>
      <CardBody>
      <Text fontSize="4xl" fontWeight="bold">₦ 55,000.00</Text>
      </CardBody>
    </Card>
    <Card borderTop={"8px"} borderColor={"blue.600"}>
      <CardHeader>
      <Text fontSize="sm">Monthly Gross Profit</Text>
      </CardHeader>
      <CardBody>
      <Text fontSize="4xl" fontWeight="bold">₦ 60,000.00</Text>
      </CardBody>
    </Card>
  </SimpleGrid>

  <SimpleGrid spacing={15} minChildWidth="500px" mt={8}>
<Card height="300px">
    <CardHeader>
        <Text fontSize="sm">Inventory Turnover</Text>
      </CardHeader>
      <CardBody>
        <Text fontSize="4xl" fontWeight="bold">Line Chart</Text> 
        </CardBody>
    </Card>
    <Card height="300px">
      <CardHeader>
      <Text fontSize="sm">Sales per Cashier</Text>
      </CardHeader>
      <CardBody>
      <Text fontSize="4xl" fontWeight="bold">Bar Chart</Text>
      </CardBody>
    </Card>
    <Card height="300px">
      <CardHeader>
      <Text fontSize="sm">Top 10 selling Products</Text>
      </CardHeader>
      <CardBody>
      <Text fontSize="4xl" fontWeight="bold">Bar Chart</Text>
      </CardBody>
    </Card>
    <Card height="300px">
      <CardHeader>
      <Text fontSize="sm">Percentage of Each Product in Total Monthly Sales</Text>
      </CardHeader>
      <CardBody>
      <Text fontSize="4xl" fontWeight="bold">Pie Chart</Text>
      </CardBody>
    </Card>
  </SimpleGrid>
</Flex>
  );
};
