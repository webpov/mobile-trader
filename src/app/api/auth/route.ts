import { NextResponse } from "next/server";

export async function POST(request: any) {  
  const body:any = await request.json()
  const { hash, keys } = body;
  if (!hash || !keys) {
    return NextResponse.json({ message: "Unkown Error" },{ status: 400, })
  }
  let dataToReturn = { hash, keys }

  
  if (!dataToReturn) {
    return NextResponse.json({ message: "Invalid Credentials" },{ status: 401, })
  }

  const generatedJWT = keys
  let bodyResponse = {success: !!dataToReturn, }
  let cookieKeyName = "publicSecretKey"  
  const fullRes:any = new Response(JSON.stringify(bodyResponse), { status: 200,
    headers: { 'Set-Cookie': [
        `${cookieKeyName}=${generatedJWT}; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=604800`, // 604800
      ].join('; ')
    }
  })

  return fullRes
}