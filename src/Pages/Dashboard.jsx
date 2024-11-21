import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';

export default function Dashboard() {
  const [data, setData] = useState({
    totalRevenue: 0,
    grossProfit: 0,
    averageOrderValue: 0,
    inventoryTurnover: [],
    salesPerUser: [],
    topSellingProducts: [],
    productCategorySales: []
  });

  useEffect(() => {
    fetch('http://localhost:5003/analytics')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <Flex direction="column">
      <SimpleGrid spacing={15} minChildWidth="250px">
        <Card borderTop={"8px"} borderColor={"blue.600"}>
          <CardHeader>
            <Text fontSize="sm">Total Revenue</Text>
          </CardHeader>
          <CardBody>
          <NumericFormat 
            value={data.totalRevenue} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'₦ '} 
            renderText={(value) => <Text fontSize="4xl" fontWeight="bold">{value}</Text>} 
          />
          </CardBody>
        </Card>
        <Card borderTop={"8px"} borderColor={"blue.600"}>
          <CardHeader>
            <Text fontSize="sm">Gross Profit</Text>
          </CardHeader>
          <CardBody>
          <NumericFormat 
            value={data.grossProfit} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'₦ '} 
            renderText={(value) => <Text fontSize="4xl" fontWeight="bold">{value}</Text>} 
          />
          </CardBody>
        </Card>
        <Card borderTop={"8px"} borderColor={"blue.600"}>
          <CardHeader>
            <Text fontSize="sm">Average Order Value</Text>
          </CardHeader>
          <CardBody>
          <NumericFormat 
            value={data.averageOrderValue} 
            displayType={'text'} 
            thousandSeparator={true} 
            prefix={'₦ '} 
            renderText={(value) => <Text fontSize="4xl" fontWeight="bold">{value}</Text>} 
          />
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid spacing={15} minChildWidth="500px" mt={8}>
        <Card height="300px">
          <CardHeader>
            <Text fontSize="sm">Inventory Turnover</Text>
          </CardHeader>
          <CardBody>
            <LineChart width={500} height={250} data={data.inventoryTurnover}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="turnover" stroke="#8884d8" />
            </LineChart>
          </CardBody>
        </Card>
        <Card height="300px">
          <CardHeader>
            <Text fontSize="sm">Sales per User</Text>
          </CardHeader>
          <CardBody>
            <BarChart width={500} height={250} data={data.salesPerUser}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="email" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_sales" fill="#8884d8" />
            </BarChart>
          </CardBody>
        </Card>
        <Card height="300px">
          <CardHeader>
            <Text fontSize="sm">Top 10 Selling Products</Text>
          </CardHeader>
          <CardBody>
            <BarChart width={500} height={250} data={data.topSellingProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity_sold" fill="#8884d8" />
            </BarChart>
          </CardBody>
        </Card>
        <Card height="300px">
          <CardHeader>
            <Text fontSize="sm">Percentage of Each Product Category</Text>
          </CardHeader>
          <CardBody>
            <PieChart width={500} height={250}>
              <Pie
                dataKey="category_sales"
                isAnimationActive={false}
                data={data.productCategorySales}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.productCategorySales.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#8884d8" />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Flex>
  );
};