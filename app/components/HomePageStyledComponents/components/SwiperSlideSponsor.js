import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper'
import { BackSwiper, SponsImg } from './styles/SponsorSection.styled'

export default function SwiperSlideSponsor() {
  const icons = [
    'https://studs.se/static/media/karma.d97a429f.png',
    'https://studs.se/static/media/storykit.35ccbd65.png',
    'https://studs.se/static/media/goldman_sachs.b59ecafe.png',
    'https://studs.se/static/media/scania.4aff3dd9.png',
    'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png',
  ]

  return (
    <BackSwiper>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        speed={4000}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {icons.map((icon, index) => (
          <SwiperSlide key={index}>{<SponsImg src={icon} />}</SwiperSlide>
        ))}
      </Swiper>
    </BackSwiper>
  )
}
