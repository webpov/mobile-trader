import AppFrameStage from '@/dom/organism/Dashboard/AppFrameStage'
import ModelGameStage from '@/model/level/ModelGameStage'
import Image from 'next/image'
import CustomBackgroundImage from '@/dom/molecule/CustomBackgroundImage'

export default function Home() {


  return (
    <main className={"flex-col w-100 tx-altfont-1 h-min-100vh flex-justify-start "} id="main_scrollable_content"
      style={{
        background: "radial-gradient(#222222, #070707)"
      }}
    >
      <div className=' pos-fixed w-100vw h-100vh top-0 left-0 opaci-20'>
        {/* <CustomBackgroundImage /> */}
      </div>
      <AppFrameStage />
    </main>
  )
}
