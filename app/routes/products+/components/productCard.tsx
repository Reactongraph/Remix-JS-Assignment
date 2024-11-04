import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Product {
  productId: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  price: number;
  priceSale: number;
  image: string | null;
  isActive: boolean | string;
  createdAt: string;
  quantity: number;
}

interface ProductCardProps {
  product: Product;
  onEdit: (productId: string) => void;
  onDelete: (productId: string) => void;
}

export default function ProductCard({product, onEdit, onDelete}: ProductCardProps) {
  return (
    <Card
      sx={{
        maxWidth: '500px',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <Box sx={{position: 'relative'}}>
        <CardMedia
          component="img"
          height="200"
          image={product.image || '/images/dummy-product.jpg'}
          alt={product.title.en}
          sx={{
            bgcolor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <Tooltip title="Quick view">
          <Chip
            label="Electronics"
            color="primary"
            size="small"
            sx={{position: 'absolute', right: 5, top: 10, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
          />
        </Tooltip>
      </Box>
      <CardContent>
        <Box
          sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2}}
        >
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              {product.title.en}
            </Typography>
          </Box>
          <Chip
            label={product.isActive ? 'Active' : 'Inactive'}
            size="small"
            sx={{mb: 1}}
            style={{
              backgroundColor: product.isActive ? 'green' : 'rgba(0, 0, 0, 0.3)',
              color: '#fff',
            }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{mb: '10px'}}>
          {product.description.en}
        </Typography>

        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
          <Box>
            <Typography
              variant="h5"
              component="span"
              sx={{
                display: 'inline-block',
                marginRight: 1,
                color: 'primary.main',
                fontWeight: 'bold',
                fontSize: '32px',
              }}
            >
              ${product.price}
            </Typography>
            {product.priceSale > product.price && (
              <Typography
                variant="body1"
                component="span"
                sx={{
                  display: 'inline-block',
                  color: 'text.secondary',
                  textDecoration: 'line-through',
                  fontSize: '22px',
                }}
              >
                ${product.priceSale}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Edit and Delete Buttons */}
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
          <Typography variant="caption" color="text.secondary">
            Created At: {new Date(product.createdAt).toLocaleDateString()}
          </Typography>
          <Box>
            <Tooltip title="Edit">
              <IconButton onClick={() => onEdit(product.productId)} color="primary">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => onDelete(product.productId)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
