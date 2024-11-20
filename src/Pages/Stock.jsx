import {
  useState,
  useEffect
} from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  SkeletonText,
  Button
} from '@chakra-ui/react';


export default function Stock() {
  const [stockLevels, setStockLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const stockLevelsPerPage = 10;

  useEffect(() => {
    const fetchStockLevels = async () => {
      try {
        const response = await fetch('http://localhost:5000/stock-levels');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Received data:', data);
        setStockLevels(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockLevels();
  }, []);

  const currentStockLevels = stockLevels.slice(
    (currentPage - 1) * stockLevelsPerPage,
    currentPage * stockLevelsPerPage
  );
  const totalPages = Math.ceil(stockLevels.length / stockLevelsPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box overflow="auto" maxWidth="100%" width="100%">
      <Table
        variant="simple"
        border="2px"
        borderColor="blue.700"
        borderCollapse="collapse"
      >
        <Thead bgColor="blue.700">
          <Tr>
            <Th color="white">Inventory ID</Th>
            <Th color="white">Product Name</Th>
            <Th color="white">Purchase Date</Th>
            <Th color="white">Quantity Purchased</Th>
            <Th color="white">Quantity Sold</Th>
            <Th color="white">Outstanding Stock</Th>
            <Th color="white">Supplier Name</Th>
            <Th color="white">Reorder Level</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={8}>
                <SkeletonText />
              </Td>
            </Tr>
          ) : (
            currentStockLevels.map((stockLevel) => (
              <Tr key={stockLevel.inventory_id}>
                <Td>{stockLevel.inventory_id}</Td>
                <Td>{stockLevel.products.product_name}</Td>
                <Td>{stockLevel.purchase_date}</Td>
                <Td>{stockLevel.quantity_purchased}</Td>
                <Td>{stockLevel.quantity_sold}</Td>
                <Td>{stockLevel.outstanding_stock}</Td>
                <Td>{stockLevel.supplier.supplier_name}</Td>
                <Td>{stockLevel.reorder_level}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <div
        display="flex"
        justifyContent="center"
        marginTop={4}
      >
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            colorScheme={currentPage === page ? "blue" : "gray"}
            variant={currentPage === page ? "solid" : "outline"}
            marginX={1}
          >
            {page}
          </Button>
        ))}
      </div>
    </Box>
  );
}