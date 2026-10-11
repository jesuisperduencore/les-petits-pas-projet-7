import {Header} from '@/components/Header';import {EventForm} from '@/components/EventForm';
export default function NewEvent(){return <div><Header active="new"/><main className="container"><h1>Nouvel événement</h1><p className="muted">La validation est répétée côté serveur avant enregistrement.</p><EventForm/></main></div>}
