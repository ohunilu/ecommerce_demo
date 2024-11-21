import {
  useState,
  useEffect
} from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
  Button,
  Box,
  SkeletonText,
  SimpleGrid,
  Stack,
  Divider
} from '@chakra-ui/react';

function b64toBlob(b64Data, contentType) {
  const byteString = atob(b64Data);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: contentType });
  return blob;
}

function createImageBlob(base64String) {
  if (!base64String) {
    return 'default-image.jpg'; // Default image URL
  }
  const imageBlob = b64toBlob(base64String, 'image/jpeg');
  const imageSrc = URL.createObjectURL(imageBlob);
  return imageSrc;
}

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
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
    <Box maxWidth="100%" width="100%">
      {loading ? (
        <SimpleGrid columns={3} spacing={4}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, index) => (
            <Card key={index} maxW="sm">
              <SkeletonText height="200px" />
              <CardBody>
                <SkeletonText mt="4" />
                <SkeletonText mt="4" />
                <SkeletonText mt="4" />
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={3} spacing={4}>
          {currentProducts.map((product) => (
            <Card key={product.product_id} maxW="sm">
              <Image src={createImageBlob(product.product_image)} />
              <CardBody>
              <Stack mt='6' spacing='3'>
                <Heading size="md">{product.product_name}</Heading>
                <Text>
                  {product.description}
                </Text>
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                  ₦ {product.sales_price}
                </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button variant="ghost" colorScheme='blue'>Add to cart</Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
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