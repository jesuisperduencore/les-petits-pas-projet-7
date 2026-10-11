import {createServerClient} from '@supabase/ssr';
import {NextResponse,type NextRequest} from 'next/server';

export async function middleware(request:NextRequest){
  let response=NextResponse.next({request});
  const supabase=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:{getAll:()=>request.cookies.getAll(),setAll(items){items.forEach(({name,value})=>request.cookies.set(name,value));response=NextResponse.next({request});items.forEach(({name,value,options})=>response.cookies.set(name,value,options))}}});
  const{data:{user}}=await supabase.auth.getUser();const path=request.nextUrl.pathname;const requestedDemo=request.nextUrl.searchParams.get('demo')==='1';const demoRole=request.cookies.get('demo_role')?.value;if(requestedDemo){response.cookies.set('demo_role',path.startsWith('/staff')?'staff':'parent',{httpOnly:true,sameSite:'lax',maxAge:3600})}const demo=requestedDemo||(path.startsWith('/staff')&&demoRole==='staff')||(path.startsWith('/parent')&&demoRole==='parent');if((path.startsWith('/staff')||path.startsWith('/parent'))&&!user&&!demo){return NextResponse.redirect(new URL('/login',request.url))}if(user){const{data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).single();if(path.startsWith('/staff')&&profile?.role!=='staff')return NextResponse.redirect(new URL('/parent',request.url));if(path.startsWith('/parent')&&profile?.role==='staff')return NextResponse.redirect(new URL('/staff',request.url))}return response;
}
export const config={matcher:['/staff/:path*','/parent/:path*']};
