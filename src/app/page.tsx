import AppFrameStage from '@/dom/organism/AppFrameStage'
import ModelGameStage from '@/model/level/ModelGameStage'
import Image from 'next/image'
import CustomBackgroundImage from '@/dom/molecule/CustomBackgroundImage'

export default function Home() {


  return (
    <main className={"flex-col w-100 tx-altfont-1 h-min-100vh  "}
      style={{
        background: "radial-gradient(#0a0a0a, #000)"
      }}
    >
      {/* <CustomBackgroundImage /> */}
      <AppFrameStage />
    </main>
  )
}
