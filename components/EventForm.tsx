'use client';

import {FormEvent,useMemo,useState,useTransition} from 'react';
import {useRouter} from 'next/navigation';
import {createEvent} from '@/app/actions';

export type EventChild={id:string;firstName:string;lastName:string;medicationAuthorized:boolean};

const types=[
  {value:'meal',label:'Repas'},{value:'nap',label:'Sieste'},{value:'activity',label:'Activité'},
  {value:'medication',label:'Médicament'},{value:'incident',label:'Incident'},
];

function currentLocalDateTime(){const now=new Date();now.setMinutes(now.getMinutes()-now.getTimezoneOffset());return now.toISOString().slice(0,16);}

export function EventForm({children}: {children:EventChild[]}){
  const router=useRouter();const[pending,startTransition]=useTransition();
  const[childId,setChildId]=useState(children[0]?.id??'');const[type,setType]=useState('meal');
  const[occurredAt,setOccurredAt]=useState(currentLocalDateTime);const[description,setDescription]=useState('');const[notice,setNotice]=useState('');
  const selectedChild=useMemo(()=>children.find(child=>child.id===childId),[childId,children]);
  function saveDemoEvent(){const stored=JSON.parse(localStorage.getItem('lespetitspas-demo-events')??'[]') as unknown[];stored.push({id:crypto.randomUUID(),childId,type,occurredAt:new Date(occurredAt).toISOString(),description:description.trim(),author:'Nadia'});localStorage.setItem('lespetitspas-demo-events',JSON.stringify(stored));}
  function submit(event:FormEvent){event.preventDefault();setNotice('');if(!description.trim()){setNotice('Ajoutez une description.');return;}if(type==='medication'&&!selectedChild?.medicationAuthorized){setNotice('Autorisation parentale requise pour cet enfant.');return;}startTransition(async()=>{const result=await createEvent({childId,type,occurredAt:new Date(occurredAt).toISOString(),description});if(!result.ok&&result.demo){saveDemoEvent();}else if(!result.ok){setNotice(result.error??'Enregistrement impossible.');return;}setDescription('');router.push(`/staff/children/${childId}?date=${occurredAt.slice(0,10)}`);router.refresh();});}
  if(!children.length)return <div className="card empty">Aucun enfant disponible.</div>;
  return <form className="card" style={{maxWidth:720,marginTop:24}} onSubmit={submit}>
    <label className="label" htmlFor="child">Enfant</label><select id="child" className="select" value={childId} onChange={event=>setChildId(event.target.value)}>{children.map(child=><option key={child.id} value={child.id}>{child.firstName} {child.lastName}</option>)}</select>
    <label className="label" htmlFor="eventType">Type</label><select id="eventType" className="select" value={type} onChange={event=>setType(event.target.value)}>{types.map(item=><option key={item.value} value={item.value}>{item.label}</option>)}</select>
    <label className="label" htmlFor="time">Date et heure</label><input id="time" className="input" type="datetime-local" value={occurredAt} onChange={event=>setOccurredAt(event.target.value)} required/>
    <label className="label" htmlFor="description">Description</label><textarea id="description" className="textarea" maxLength={500} value={description} onChange={event=>setDescription(event.target.value)} placeholder="Décrivez l'événement avec des mots simples..." required/><p className="footer-note">{description.length}/500 caractères</p>
    {type==='medication'&&!selectedChild?.medicationAuthorized&&<div className="error" style={{marginTop:15}}>L’autorisation parentale n’est pas confirmée. L’enregistrement sera bloqué.</div>}{notice&&<p role="status" className="error">{notice}</p>}
    <button className="btn primary" style={{marginTop:18}} disabled={pending}>{pending?'Enregistrement…':'Enregistrer l’événement'}</button>
  </form>;
}
