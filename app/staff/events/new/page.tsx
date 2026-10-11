import {Header} from '@/components/Header';
import {EventForm,type EventChild} from '@/components/EventForm';
import {createClient} from '@/lib/supabase/server';
import {children as demoChildren} from '@/lib/demo';

export default async function NewEvent(){
  const supabase=await createClient();const{data:{user}}=await supabase.auth.getUser();
  let children:EventChild[]=demoChildren.map(child=>({id:child.id,firstName:child.firstName,lastName:child.lastName,medicationAuthorized:child.authorized}));
  if(user){const{data}=await supabase.from('children').select('id,first_name,last_name,medication_authorized').order('first_name');children=(data??[]).map(child=>({id:child.id,firstName:child.first_name,lastName:child.last_name,medicationAuthorized:child.medication_authorized}));}
  return <div><Header active="new"/><main className="container"><h1>Nouvel événement</h1><p className="muted">L’événement est enregistré et apparaît immédiatement dans la timeline de l’enfant.</p><EventForm children={children} demo={!user}/></main></div>;
}
