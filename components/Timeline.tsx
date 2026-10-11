'use client';

import {useEffect,useMemo,useState} from 'react';

export type TimelineEvent={id:string;childId:string;type:string;occurredAt:string;description:string;author:string};
const labels:Record<string,string>={meal:'Repas',nap:'Sieste',activity:'Activité',medication:'Médicament',incident:'Incident'};

export function Timeline({events,childId,date}: {events:TimelineEvent[];childId:string;date:string}){
  const[demoEvents,setDemoEvents]=useState<TimelineEvent[]>([]);
  useEffect(()=>{try{setDemoEvents(JSON.parse(localStorage.getItem('lespetitspas-demo-events')??'[]'));}catch{setDemoEvents([]);}},[]);
  const displayed=useMemo(()=>[...events,...demoEvents.filter(event=>event.childId===childId&&event.occurredAt.slice(0,10)===date)].sort((a,b)=>b.occurredAt.localeCompare(a.occurredAt)),[events,demoEvents,childId,date]);
  if(!displayed.length)return <div className="empty">Aucun événement pour cette date.</div>;
  return <div className="timeline" style={{marginTop:25}}>{displayed.map(event=><article className="event" key={event.id}><div className="badge">{labels[event.type]??event.type} • {new Date(event.occurredAt).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}</div><h3 style={{marginTop:8}}>{labels[event.type]??'Événement'}</h3><p>{event.description}</p><small className="muted">Saisi par {event.author}</small></article>)}</div>;
}

export function TimelineSummary({count,childId,date}:{count:number;childId:string;date:string}){
  const[demoCount,setDemoCount]=useState(0);
  useEffect(()=>{try{const stored=JSON.parse(localStorage.getItem('lespetitspas-demo-events')??'[]') as TimelineEvent[];setDemoCount(stored.filter(event=>event.childId===childId&&event.occurredAt.slice(0,10)===date).length);}catch{setDemoCount(0);}},[childId,date]);
  return <p><span className="stat">{count+demoCount}</span> événement{count+demoCount>1?'s':''} enregistré{count+demoCount>1?'s':''}</p>;
}
