
export const ODivider = ({...props}:any) => {
  return (<>
    <div className={`flex  gap-3  tx-white ${props.className}`}>
      <hr className=" opaci-20 flex-1" />
      <div className="opaci-25">o</div>
      <hr className=" opaci-20 flex-1" />
    </div>
  </>)
}