'use client';
import Link from 'next/link';
import {FormEvent,useState} from 'react';
import {useRouter} from 'next/navigation';
import {createClient} from '@/lib/supabase/client';

export function LoginForm(){
  const[email,setEmail]=useState('');const[password,setPassword]=useState('');const[error,setError]=useState('');const[loading,setLoading]=useState(false);const router=useRouter();
  async function submit(e:FormEvent){e.preventDefault();setLoading(true);setError('');const supabase=createClient();const{data,error:authError}=await supabase.auth.signInWithPassword({email,password});if(authError||!data.user){setError('Email ou mot de passe incorrect.');setLoading(false);return}const{data:profile}=await supabase.from('profiles').select('role').eq('id',data.user.id).single();router.replace(profile?.role==='staff'?'/staff':'/parent');router.refresh()}
  return <div className="login card"><div className="brand">Les Petits Pas</div><h1 style={{marginTop:24}}>Connexion</h1><p className="muted">Accédez à votre espace sécurisé.</p><form onSubmit={submit}><label className="label" htmlFor="email">Email</label><input id="email" className="input" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/><label className="label" htmlFor="password">Mot de passe</label><input id="password" className="input" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}/>{error&&<p role="alert" className="error">{error}</p>}<button className="btn primary" style={{marginTop:18,width:'100%'}} disabled={loading}>{loading?'Connexion…':'Se connecter'}</button></form><p className="footer-note">Mode soutenance sans données réelles :</p><div style={{display:'flex',gap:10,marginTop:10,flexWrap:'wrap'}}><Link className="btn ghost" href="/staff?demo=1">Démo équipe</Link><Link className="btn ghost" href="/parent?demo=1">Démo parent</Link></div></div>
}
