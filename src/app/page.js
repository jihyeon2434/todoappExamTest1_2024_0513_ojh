'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  Button,
  Box,
  AppBar,
  Toolbar,
  Snackbar,
  Alert as MuiAlert,
  Backdrop,
  CircularProgress,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import theme from './theme';
import { FaBars } from 'react-icons/fa';

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert {...props} ref={ref} variant="filled" />;
});

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [newtoopen, setnewOpen] = React.useState(false);
  const alertRef = React.useRef(null);

  const toggleDrawer = (newOpen) => () => {
    setnewOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar>
            <div className="tw-flex-1">
              <FaBars className="tw-cursor-pointer" />
            </div>
            <div className="logo-box">
              <a href="/" className="tw-font-bold">
                NOTE!
              </a>
            </div>
            <div className="tw-flex-1 tw-flex tw-justify-end">
              <a href="/write">글쓰기</a>
            </div>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <div>
          <Button onClick={toggleDrawer(true)}>Open drawer</Button>
          <Drawer open={newtoopen} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
        <section className="tw-h-screen tw-flex tw-items-center tw-justify-center tw-text-[5rem]">
          section
        </section>
      </ThemeProvider>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <section>
        <Button onClick={() => setOpen(true)}>Open Snackbar</Button>
        <Alert ref={alertRef} severity="error" varient="filled">
          게시물이 삭제되었습니다.
        </Alert>
        <Alert severity="success" varient="outlined">
          This is a success msg!!!!!
        </Alert>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Note archived">
          <Alert severity="warning">게시물이 삭제됨</Alert>
        </Snackbar>
        <Button onClick={() => setOpen(true)}>Show backdrop</Button>
      </section>
    </>
  );
}
