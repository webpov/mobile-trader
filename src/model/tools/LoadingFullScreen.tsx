import Link from "next/link";

export function LoadingFullScreen() {
    return (<>
        <div className=" flex-center">
          <div className="flex-col h-min-50vh">
            
            <Link href="/" className="z-600 nodeco bg-w-10 bord-r-50 mt-3 opaci-chov--50 hover-3 " >
              <div className="tx-white 1 pa-2 ">Loading...</div>
            </Link>
          </div>
        </div>
    </>)
}