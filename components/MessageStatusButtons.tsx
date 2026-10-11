'use client';
import {useState,useTransition} from 'react';
import {updateMessageStatus} from '@/app/actions';
export function MessageStatusButtons({messageId,initialStatus}:{messageId:string;initialStatus:string}){const[status,setStatus]=useState(initialStatus);const[pending,startTransition]=useTransition();function update(next:'read'|'handled'){startTransition(async()=>{const result=await updateMessageStatus({messageId,status:next});if(result.ok||result.error==='Session expirée')setStatus(next);});}return <div style={{display:'flex',gap:8}}><button className="btn ghost" disabled={pending||status!=='new'} onClick={()=>update('read')}>Marquer comme lu</button><button className="btn secondary" disabled={pending||status==='handled'} onClick={()=>update('handled')}>Traité</button></div>}
