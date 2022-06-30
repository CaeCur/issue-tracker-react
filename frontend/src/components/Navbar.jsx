import { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
//mui
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

// const pages = ["Home", "Issues", "Create Issue"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function CustomLink({ to, children, props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Button
      component={Link}
      to={to}
      sx={{
        my: 2,
        color: "white",
        bgcolor: isActive ? "text.disabled" : "",
        display: "block",
        textAlign: "center",
        "&:hover": {
          bgcolor: isActive ? "text.disabled" : "",
          color: isActive ? "" : "text.disabled",
        },
        ...props,
      }}
    >
      {children}
    </Button>
  );
}

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ marginBottom: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* desktop logo */}
          <Box
            component="img"
            src="/spider-man-logo.png"
            alt="Logo"
            sx={{ display: { xs: "none", md: "flex" }, height: 40, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 0,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DESK
          </Typography>

          {/* desktop nav menu */}
          <Box
            mr={2}
            sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1, justifyContent: "flex-end" }}
          >
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/issues">Issues</CustomLink>
            <CustomLink to="/create-issue">Create Issue</CustomLink>
          </Box>

          {/* mobile nav menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem component={Link} to="/" sx={{ my: 2, color: "white", display: "block" }}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>

              <MenuItem
                component={Link}
                to="/issues"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography textAlign="center">Issues</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/create-issue"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography textAlign="center">Create Issue</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* mobile logo */}
          <Box
            component="img"
            src="/spider-man-logo.png"
            alt="Logo"
            sx={{ display: { xs: "flex", md: "none" }, height: 40, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MOBILE
          </Typography>

          {/* User Avatar */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/spider-man-logo.png" />
              </IconButton>
            </Tooltip>
            {/* user menu */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
