import {notFound} from 'next/navigation';
import {Header} from '@/components/Header';
import {Timeline,TimelineSummary,type TimelineEvent} from '@/components/Timeline';
import {children as demoChildren,events as demoEvents} from '@/lib/demo';
import {createClient} from '@/lib/supabase/server';

type Author={first_name:string;last_name:string};
export default async function Child({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{date?:string}>}){
  const{id}=await params;const query=await searchParams;const date=query.date??new Date().toISOString().slice(0,10);
  const supabase=await createClient();const{data:{user}}=await supabase.auth.getUser();
  let child:{id:string;firstName:string;lastName:string;section:string;age:string;authorized:boolean;emoji:string}|undefined;
  let timeline:TimelineEvent[]=[];
  if(user){
    const{data}=await supabase.from('children').select('id,first_name,last_name,birth_date,medication_authorized,section:sections(name)').eq('id',id).single();
    if(!data)notFound();
    const sectionValue=Array.isArray(data.section)?data.section[0]:data.section;
    child={id:data.id,firstName:data.first_name,lastName:data.last_name,section:sectionValue?.name??'Sans section',age:new Date(data.birth_date).toLocaleDateString('fr-FR'),authorized:data.medication_authorized,emoji:'🧸'};
    const from=`${date}T00:00:00.000Z`;const to=`${date}T23:59:59.999Z`;
    const{data:eventRows}=await supabase.from('events').select('id,child_id,type,occurred_at,description,author:profiles!events_author_id_fkey(first_name,last_name)').eq('child_id',id).gte('occurred_at',from).lte('occurred_at',to).order('occurred_at',{ascending:false});
    timeline=(eventRows??[]).map(row=>{const author=(Array.isArray(row.author)?row.author[0]:row.author) as Author|undefined;return{id:row.id,childId:row.child_id,type:row.type,occurredAt:row.occurred_at,description:row.description,author:author?`${author.first_name} ${author.last_name}`.trim():'Équipe'};});
  }else{
    const found=demoChildren.find(item=>item.id===id);if(!found)notFound();child=found;
    if(id==='1'&&date==='2026-10-11')timeline=demoEvents.map((event,index)=>({id:`demo-${index}`,childId:'1',type:{Repas:'meal',Sieste:'nap',Activité:'activity',Médicament:'medication',Incident:'incident'}[event.type]??'activity',occurredAt:`2026-10-11T${event.time}:00`,description:event.detail,author:event.author}));
  }
  return <div><Header/><main className="container"><div className="child"><div className="avatar">{child.emoji}</div><div><span className="badge">{child.section}</span><h1>{child.firstName} {child.lastName}</h1><p className="muted">{child.age} • Autorisation médicament : {child.authorized?'confirmée':'non confirmée'}</p></div></div><form className="filters" method="get"><label>Date <input className="input" name="date" type="date" defaultValue={date}/></label><button className="btn secondary">Afficher</button></form><div className="split"><section className="card"><h2>Timeline du jour</h2><Timeline events={timeline} childId={id} date={date}/></section><aside><div className="card"><h3>Informations utiles</h3><p>Section : {child.section}</p><p>Date de naissance : {child.age}</p><p>Médicament : {child.authorized?'autorisé':'autorisation absente'}</p></div><div className="card" style={{marginTop:18}}><h3>Résumé</h3><TimelineSummary count={timeline.length} childId={id} date={date}/></div></aside></div></main></div>;
}
