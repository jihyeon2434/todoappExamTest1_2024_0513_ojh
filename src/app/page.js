'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button, Box, AppBar, Toolbar } from '@mui/material';
import theme from './theme';
import { MdDeleteForever } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar className="tw-justify-center">
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
        툴바를 '/'바로 붙이면 뒷 배경영역을 차지해서 그밑에 나오게 할 수있다. fixed라서
        툴바'/'설정안하면 NOIE영역 뒤에 글이 써짐.
        <section className="tw-h-screen tw-flex tw-items-center tw-justify-center tw-text-[2rem]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur quibusdam nesciunt,
          autem reiciendis eaque harum nihil veritatis adipisci. Quod similique doloribus harum
          repudiandae placeat. Explicabo tempore illum consectetur. Sunt, aliquid.
        </section>
      </ThemeProvider>
    </>
  );
}
