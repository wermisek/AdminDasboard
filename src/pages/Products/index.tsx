import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Rating,
  Stack,
} from '@mui/material';
import { Edit, Delete, Add, FilterList } from '@mui/icons-material';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    category: 'Electronics',
    rating: 4.5,
    stock: 50,
    image: 'https://via.placeholder.com/200',
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 299.99,
    category: 'Electronics',
    rating: 4.2,
    stock: 30,
    image: 'https://via.placeholder.com/200',
  },
  {
    id: 3,
    name: 'Laptop Bag',
    description: 'Stylish and durable laptop bag',
    price: 49.99,
    category: 'Accessories',
    rating: 4.0,
    stock: 100,
    image: 'https://via.placeholder.com/200',
  },
  // Add more mock products as needed
];

const categories = ['All', 'Electronics', 'Accessories', 'Clothing'];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = mockProducts
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'All' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" startIcon={<Add />}>
          Add Product
        </Button>
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 3 }}
        alignItems="center"
      >
        <TextField
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    height: 40,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {product.description}
                </Typography>
                <Box sx={{ mt: 2, mb: 1 }}>
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Rating value={product.rating} precision={0.5} readOnly />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Chip
                    label={`Stock: ${product.stock}`}
                    color={product.stock > 0 ? 'success' : 'error'}
                    size="small"
                  />
                  <Box>
                    <IconButton size="small">
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products; 