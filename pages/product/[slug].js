import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Rating,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { useState, useEffect, useContext } from 'react';
import Layout from '../../components/Layout';
import classes from '../../utils/classes';
import { client } from '../../utils/client';
import { urlFor, urlForThumbnail } from '../../utils/image';
import Image from 'next/image';
import { Store } from '../../utils/store';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useRouter } from 'next/router';

const ProductDetails = (props) => {
  const router = useRouter();
  const { slug } = props;
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    product: null,
    loading: true,
    error: '',
  });

  const { product, loading, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await client.fetch(
          `*[_type == "product" && slug.current == $slug][0]`,
          { slug }
        );

        setState({ ...state, product, loading: false });
      } catch (err) {
        setState({ ...state, error: err.messsage, loading: false });
      }
    };
    fetchData();
  }, []);
  console.log('Anna', product);
  console.log('safina', cart.cartItems);

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image),
        quantity,
      },
    });
    console.log(cart.cartItems);
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: 'success',
    });

    router.push(`/cart`);
  };

  return (
    <Layout title={product?.title}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="error">{error}</Alert>
      ) : (
        <Box>
          <Box item sx={classes.section}>
            <NextLink href="/" passHref>
              <Link>
                <Typography>back to result</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <Image
                src={urlFor(product.image)}
                alt={product.name}
                Layout="responsive"
                width={640}
                height={640}
              />
            </Grid>

            <Grid item md={3} xs={12}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h1">
                    {product.name}
                  </Typography>
                </ListItem>
                <ListItem>Category: {product.category}</ListItem>
                <ListItem>Brand: {product.brand}</ListItem>
                <ListItem>
                  <Rating value={product.rating} readOnly={true}></Rating>(
                  <Typography sx={classes.smallText}>
                    {product.numReviews} reviews)
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Description: {product.description}</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Price</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>${product.price}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Status</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {product.countInStock > 0
                            ? 'In stock'
                            : 'Un available'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={addToCartHandler}
                    >
                      ADD TO CART
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Layout>
  );
};

export default ProductDetails;

export const getServerSideProps = (context) => {
  return {
    props: {
      slug: context.params.slug,
    },
  };
};
