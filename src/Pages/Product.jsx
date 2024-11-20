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


export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Received data:', data);
        setProducts(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

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
            <Th color="white">Product ID</Th>
            <Th color="white">Product Name</Th>
            <Th color="white">Cost Price</Th>
            <Th color="white">Sales Price</Th>
            <Th color="white">Category</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={5}>
                <SkeletonText />
              </Td>
            </Tr>
          ) : (
            currentProducts.map((product) => (
              <Tr key={product.product_id}>
                <Td>{product.product_id}</Td>
                <Td>{product.product_name}</Td>
                <Td>{product.cost_price}</Td>
                <Td>{product.sales_price}</Td>
                <Td>{product.category}</Td>
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