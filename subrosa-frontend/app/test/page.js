"use client";

import React from 'react';
import PersonalLogin from '../../components/PersonalLogin';
import '../../styles/addworkForm.css';

import GalleryScroll from '../../components/Composant non utilisé/GalleryScroll'
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
          </div>
          <div>
          <PersonalLogin />
          <GalleryScroll />
          <AddworkForm />
        </div>
      </>
    )
  }
