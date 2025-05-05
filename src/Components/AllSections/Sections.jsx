import React from 'react'
import AlertSection from './AlertSection/AlertSection'
import FirstSection from './FirstSection/FirstSection'
import SecondSection from './SecondSection/SecondSection'
import ThirdSection from './ThirdSection/ThirdSection'
import FourthSection from './FourthSection/FourthSection'
import FifthSection from './FifthSection/FifthSection'
import SixthSection from './SixthSection/SixthSection'
// import YouTubeVideos from './YouTubeVideos/YouTubeVideos'
import YouTubeVideosWithPromise from './YouTubeVideos/YoutubeVideosWithPromise'

function Sections() {
  return (
    <>
        <AlertSection/>
         <FirstSection/>
         <SecondSection/>
         <ThirdSection/>
         <FourthSection/>
         <FifthSection/>
         <SixthSection/>
         {/* <YouTubeVideos/> */}
         <YouTubeVideosWithPromise/>
    </>
  )
}

export default Sections