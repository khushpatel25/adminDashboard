import { useState } from 'react'
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
} from '@mui/material';

import Header from 'components/Header';
import { useGetProductsQuery } from 'state/api';

const Product = ({ _id, price, description, rating, supply, stat, name, category }) => {

    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    const { yearlySalesTotal, yearlyTotalSoldUnits } = stat[0];

    const handleOnclick = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <Card sx={{
            backgroundColor: theme.palette.background.alt,
            backgroundImage: "none",
            borderRadius: '0.55rem'
        }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant='h5' component='div'>
                    {name}
                </Typography>
                <Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />
                <Typography>
                    {description}
                </Typography>
            </CardContent>
            <CardActions >
                <Button variant='primary' size='small' onClick={handleOnclick}>
                    See More
                </Button>
            </CardActions>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{ color: theme.palette.neutral[300] }}>
                <CardContent>
                    <Typography>id: {_id}</Typography>
                    <Typography>Supply left: {supply}</Typography>
                    <Typography>Yearly Sales This Year: {yearlySalesTotal}</Typography>
                    <Typography>Yearly Sold Units This Year: {yearlyTotalSoldUnits}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

const Products = () => {

    const { data, isLoading } = useGetProductsQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");   

    return (
        <Box m="1.5rem 2.5rem">
            <Header
                title='PRODUCTS'
                subtitle="See your lists of Products"
            />
            {data || !isLoading ? (
                <Box
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >
                    {data?.productsWithStats?.map((item, index) => (
                        <Product {...item} key={index} />
                    ))}
                </Box>
            ) : (
                <>
                    Loading...
                </>
            )}
        </Box>
    )
}

export default Products;