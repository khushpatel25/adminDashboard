import { useState, useEffect } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    ListItem,
    Typography,
    IconButton,
    useTheme
} from '@mui/material';
import {
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

import FlexBetween from 'components/FlexBetween';

const navItems = [
    {
        text: 'DashBoard',
        icon: <HomeOutlined />
    },
    {
        text: 'Client Facing',
        icon: null
    },
    {
        text: 'Products',
        icon: <ShoppingCartOutlined />
    },
    {
        text: 'Customers',
        icon: <Groups2Outlined />
    },
    {
        text: 'Transactions',
        icon: <ReceiptLongOutlined />
    },
    {
        text: 'Geography',
        icon: <PublicOutlined />
    },
    {
        text: 'Sales',
        icon: null
    },
    {
        text: 'Overview',
        icon: <PointOfSaleOutlined />
    },
    {
        text: 'Daily',
        icon: <TodayOutlined />
    },
    {
        text: 'Monthly',
        icon: <CalendarMonthOutlined />
    },
    {
        text: 'Breakdown',
        icon: <PieChartOutlined />
    },
    {
        text: 'Management',
        icon: null
    },
    {
        text: 'Admin',
        icon: <AdminPanelSettingsOutlined />
    },
    {
        text: 'Performance',
        icon: <TrendingUpOutlined />
    },
]


const Sidebar = ({ user, isNonMobile, isSidebarOpen, setIsSidebarOpen, drawerWidth }) => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const theme = useTheme();

    const [active, setActive] = useState('');

    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname])

    return (
        <Box component='nav'>
            {isSidebarOpen && (
                <Drawer
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            borderWidth: isNonMobile ? 0 : '2px',
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                >
                    <Box width='100%'>
                        <Box m='1.5rem 2rem 2rem 3rem'>
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display='flex' alignItems='center' gap='0.5rem'>
                                    <Typography variant='h4' fontWeight='bold'>
                                        KHUSH PATEL
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }, index) => {
                                if (!icon) {
                                    return (
                                        <Typography sx={{ m: '2.25rem 0 1rem 3rem' }} key={index}>
                                            {text}
                                        </Typography>
                                    )
                                }
                                const lcText = text.toLowerCase();
                                return (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton onClick={() => {
                                            navigate(`/${lcText}`)
                                            setActive(lcText)
                                        }}
                                            sx={{
                                                backgroundColor: active === lcText
                                                    ? theme.palette.secondary[300]
                                                    : 'transparent',
                                                color: active === lcText
                                                    ? theme.palette.primary[600]
                                                    : theme.palette.secondary[200]
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: '2rem',
                                                    color: active === lcText
                                                        ? theme.palette.primary[600]
                                                        : theme.palette.secondary[200]
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ ml: 'auto' }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar;