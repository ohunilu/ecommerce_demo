import { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  SkeletonText,
} from '@chakra-ui/react';

export default function Order() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5001/orders');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Received orders data:', data);
        setOrders(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Order ID</Th>
          <Th>Cashier</Th>
          <Th>Order Date</Th>
          <Th>Total Amount</Th>
          <Th>Shipping Cost</Th>
        </Tr>
      </Thead>
      <Tbody>
        {loading ? (
          <Tr>
            <Td colSpan={5}>
              <SkeletonText />
            </Td>
          </Tr>
        ) : error ? (
          <Tr>
            <Td colSpan={5}>{error}</Td>
          </Tr>
        ) : (
          orders.map((order) => (
            <Tr key={order.order_id}>
              <Td>{order.order_id}</Td>
              <Td>{order.user?.user_name}</Td>
              <Td>{order.order_date}</Td>
              <Td>{order.total_amount}</Td>
              <Td>{order.shipping_cost}</Td>
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  );
};