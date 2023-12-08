import { getSupabaseClient } from "@/../script/state/repository/webdk";
import { fetchPlayerByHref } from '@/../script/state/repository/webdk';
import { NextResponse } from "next/server";
import { signJWT } from "@/../script/util/webhelp";
import jwt from 'jsonwebtoken'

export async function POST(request: any) {  
  const body:any = await request.json()
  const { hash, keys } = body;
  if (!hash || !keys) {
    return NextResponse.json({ message: "Unkown Error" },{ status: 400, })
  }
  // console.log("hash and keys", hash, keys)
  let dataToReturn = { hash, keys }

  // const supabase = getSupabaseClient()
  // try {
  //   dataToReturn = await fetchPlayerByHref(supabase, theSrc)
  // } catch (error) {
  //   return NextResponse.json({ message: "Unkown Error" },{ status: 400, })
  // }
  
  if (!dataToReturn) {
    return NextResponse.json({ message: "Invalid Credentials" },{ status: 401, })
  }

  // const generatedJWT = signJWT(jwt, { data: dataToReturn })
  const generatedJWT = keys
  let bodyResponse = {success: !!dataToReturn, }//data: dataToReturn}
  let cookieKeyName = "publicSecretKey"  
  const fullRes:any = new Response(JSON.stringify(bodyResponse), { status: 200,
    headers: { 'Set-Cookie': [
        `${cookieKeyName}=${generatedJWT}; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=604800`, // 604800
      ].join('; ')
    }
  })
  // fullRes.headers.append( 'Set-Cookie',
  //   `user=${JSON.stringify(dataToReturn)}; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=604800` // 604800
  // )

  return fullRes
}