"use client";

import React from 'react';
import PersonalLogin from '../../components/PersonalLogin';
// import '../../styles/inscription-artiste.css';
// import '../../styles/GalleryScroll.css';
// import '../../styles/addworkForm.css';
import '../../styles/HeaderNew.css'; 
import HeaderNew from '../../components/HeaderNew'
import GalleryScroll from '../../components/GalleryScroll'
import AddworkForm from '../../components/AddworkForm'

import Head from 'next/head'

export default function ArtistLogin() {
    return (
      <>
        <Head>
          <script
            src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"
            defer
          ></script>
        </Head>
  
        <div>
          <HeaderNew />
          </div>
          <div>
          <PersonalLogin />
          <GalleryScroll />
          <AddworkForm />
        </div>
      </>
    )
  }
