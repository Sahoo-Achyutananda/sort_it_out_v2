import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import DrawerList from "./TemporaryDrawer";
import { useLocation } from "react-router-dom";
// import Button from "@mui/material/Button";

const titles = {
  "/": "",
  "/bubble": "Bubble Sort",
  "/selection": "Selection Sort",
  "/insertion": "Insertion Sort",
  "/merge": "Merge Sort",
  "/quick": "Quick Sort",
  "/racemode": "Race Mode",
};

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const pageTitle = titles[location.pathname] || " ";

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(82, 11, 148, 0.14)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)", // for Safari
          boxShadow: "none",
          borderBottom: "solid 1px rebeccapurple",
        }}
      >
        <Toolbar>
          <Button
            onClick={toggleDrawer(true)}
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </Button>
          <Drawer
            open={open}
            onClose={toggleDrawer(false)}
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: "rgba(82, 11, 148, 0.14)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)", // for Safari
                boxShadow: "none",
              },
            }}
          >
            <DrawerList toggleDrawer={toggleDrawer} />
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
