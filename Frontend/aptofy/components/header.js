import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RadioIcon from "@mui/icons-material/Radio";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import CloudIcon from "@mui/icons-material/Cloud";
const drawerWidth = 250;
const navItems = [
    {
        label: "Dashboard",
        url: "/",
    },
    {
        label: "Upload",
        url: "/songUpload",
    },
    // {
    //     label: "songRequestAdmin",
    //     url: "/songRequestAdmin",
    // },
    {
        label: "Creator",
        url: "/uploadSongHome",
    },
];

export default function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const router = useRouter();
    const {
        connect,
        account,
        network,
        connected,
        disconnect,
        wallet,
        wallets,
        signAndSubmitTransaction,
        signTransaction,
        signMessage,
    } = useWallet();
    const container = window !== undefined ? () => window().document.body : undefined;

    const onConnect = async (walletName) => {
        await connect(walletName.name);
    };
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", marginBottom: "0px" }}>
            <span className="w-full flex justify-center p-3">
                <RadioIcon fontSize="large" />
            </span>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton onClick={() => router.push(item.url)} sx={{ textAlign: "center" }}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 3, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        onClick={() => router.push("/")}
                        className="cursor-pointer"
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: { xs: 1, md: 0 }, display: "flex", alignItems: "center" }}
                    >
                        <RadioIcon />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end", mr: 3 }}>
                        {navItems.map((item) => (
                            <Button onClick={() => router.push(item.url)} key={item.label} sx={{ color: "#fff" }}>
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                    <Box>
                        {!connected ? (
                            <Button sx={{ color: "#fff" }} onClick={() => onConnect(wallets[0])}>
                                <CloudOffIcon />
                                <span className="ml-2">Connect</span>
                            </Button>
                        ) : (
                            <Tooltip title={account.address}>
                                <Button sx={{ color: "#fff" }} onClick={() => disconnect()}>
                                    <CloudIcon />
                                    <span className="ml-2 w-24 overflow-hidden text-ellipsis whitespace-nowrap">
                                        {account.address}
                                    </span>
                                </Button>
                            </Tooltip>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main">
                <Toolbar />
            </Box>
        </Box>
    );
}
