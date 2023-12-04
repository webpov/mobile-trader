// import bg from '@/../public/img/neonbg.png' // focused
import bg from '@/../public/img/neonbg2.jpg' // ligher
// import bg from '@/../public/img/neonbg4.jpg' // darker


export default function CustomBackgroundImage ({bg_src = bg.src}:any) {
    return(<>

<div className='pos-abs w-100  h-100vh z-1 bg-black'
        style={{
          backgroundImage: `url(${bg_src})`, width: '100vw', 
          filter:"blur(5px)", 
          backgroundSize: "cover",
        }}
      ></div>
      {/* <div className='pos-abs w-100 z-1 h-100vh bg-black' style={{width: '100vw',}}></div> */}

    </>)
}