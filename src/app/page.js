'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button, Box, AppBar, Toolbar } from '@mui/material';
import theme from './theme';
//theme.js가져오기
import { MdDeleteForever } from "react-icons/md";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button variant="contained" href='sub/'>버튼</Button>
        <Button variant="contained" startIcon={<MdDeleteForever />}>?</Button>
        <MdDeleteForever /><MdDeleteForever /><MdDeleteForever />
      </ThemeProvider>
    </>
  );
}