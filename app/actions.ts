'use server';
import {createClient} from '@/lib/supabase/server';
import {revalidatePath} from 'next/cache';
import {createClient as createAdminClient} from '@supabase/supabase-js';

const eventTypes=['meal','nap','activity','medication','incident'] as const;

export async function createEvent(input:{childId:string;type:string;occurredAt:string;description:string}){
  const description=input.description.trim();
  if(!input.childId||!eventTypes.includes(input.type as typeof eventTypes[number]))return{ok:false,error:'Données invalides'};
  if(!description||description.length>500)return{ok:false,error:'La description doit contenir entre 1 et 500 caractères'};
  if(Number.isNaN(Date.parse(input.occurredAt)))return{ok:false,error:'Date ou heure invalide'};
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)return{ok:false,error:'Session expirée',demo:true};
  if(input.type==='medication'){
    const {data:child}=await supabase.from('children').select('medication_authorized').eq('id',input.childId).single();
    if(!child?.medication_authorized)return{ok:false,error:'Autorisation parentale requise'};
  }
  const {error}=await supabase.from('events').insert({child_id:input.childId,type:input.type,occurred_at:input.occurredAt,description,author_id:user.id});
  if(error)return{ok:false,error:error.message};
  revalidatePath(`/staff/children/${input.childId}`);
  revalidatePath('/parent');
  return{ok:true};
}

export async function sendMessage(input:{childId:string;text:string}){
  const text=input.text.trim();
  if(!text||text.length>500)return{ok:false,error:'Le message doit contenir entre 1 et 500 caractères'};
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)return{ok:false,error:'Session expirée',demo:true};
  const {error}=await supabase.from('messages').insert({child_id:input.childId,parent_id:user.id,content:text,status:'new'});
  if(error)return{ok:false,error:error.message};
  revalidatePath('/parent/messages');
  revalidatePath('/staff/messages');
  return{ok:true};
}

export async function updateMessageStatus(input:{messageId:string;status:'read'|'handled'}){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)return{ok:false,error:'Session expirée'};
  const {error}=await supabase.from('messages').update({status:input.status}).eq('id',input.messageId);
  if(error)return{ok:false,error:error.message};
  revalidatePath('/staff/messages');
  revalidatePath('/parent/messages');
  return{ok:true};
}

export async function inviteParent(input:{email:string;firstName:string;lastName:string}){
  const email=input.email.trim().toLowerCase();const firstName=input.firstName.trim();const lastName=input.lastName.trim();
  if(!email.includes('@')||!firstName||!lastName)return{ok:false,error:'Renseignez un nom, un prénom et une adresse e-mail valide.'};
  const supabase=await createClient();const{data:{user}}=await supabase.auth.getUser();if(!user)return{ok:false,error:'Session expirée'};
  const{data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).single();if(profile?.role!=='staff')return{ok:false,error:'Accès réservé à l’équipe.'};
  const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!serviceKey)return{ok:false,error:"L’invitation n’est pas configurée sur le serveur."};
  const admin=createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,serviceKey,{auth:{autoRefreshToken:false,persistSession:false}});
  const{error}=await admin.auth.admin.inviteUserByEmail(email,{data:{first_name:firstName,last_name:lastName},redirectTo:`${process.env.NEXT_PUBLIC_APP_URL}/login`});
  return error?{ok:false,error:error.message}:{ok:true};
}
