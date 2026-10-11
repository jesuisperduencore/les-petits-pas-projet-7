import './globals.css';
import './status.css';
import type { Metadata } from 'next';
export const metadata: Metadata={title:'Les Petits Pas',description:'Transmissions quotidiennes de la crèche Les Petits Pas'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
