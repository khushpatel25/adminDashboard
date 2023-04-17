import { useState } from 'react';
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
} from '@mui/icons-material';
import {
    AppBar,
    Toolbar,
    useTheme,
    IconButton,
    InputBase,
    Typography,
    Button,
    Box,
    Menu,
    MenuItem
} from '@mui/material';
import { useDispatch } from 'react-redux';

import profilePic from 'assets/profile.jpg';
import { setMode } from 'state';
import FlexBetween from 'components/FlexBetween';

const Navbar = ({ user, setIsSidebarOpen, isSidebarOpen }) => {

    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar sx={{
            position: 'static',
            background: 'none',
            boxShadow: 'none'
        }}>
            <Toolbar sx={{
                justifyContent: 'space-between',
            }}>
                <FlexBetween>
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        borderRadius='9px'
                        gap='3rem'
                        p='0.1rem 1.5rem'
                    >
                        <InputBase placeholder='Search...' />
                        <IconButton onClick={() => console.log("Search clicked..")}>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>
                <FlexBetween gap='1.5rem'>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlined sx={{ fontSize: '25px' }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: '25px' }} />
                        )}
                    </IconButton>
                    <IconButton onClick={() => console.log("Setting clicked...")}>
                        <SettingsOutlined sx={{ fontSize: '25px' }} />
                    </IconButton>
                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '1rem',
                                textTransform: 'none'
                            }}
                        >
                            <Box
                                component="img"
                                alt='profile'
                                src={profilePic}
                                height='32px'
                                width='32px'
                                borderRadius='50%'
                                sx={{ objectFit: 'cover' }}
                            />
                            <Box textAlign='left'>
                                <Typography fontWeight='bold' fontSize='0.9rem' sx={{ color: theme.palette.secondary[100] }}>
                                    {user?.name}
                                </Typography>
                                <Typography fontWeight='bold' fontSize='0.8rem' sx={{ color: theme.palette.secondary[200] }}>
                                    {user?.occupation}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined sx={{ fontSize: '25px', color: theme.palette.secondary[300] }} />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        >
                            <MenuItem onClick={handleClose}>
                                Log Out
                            </MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;