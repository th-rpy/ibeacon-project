import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Building from '@/components/Building'
import MQTTComponent from '@/components/MQTTComponent'; 

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Zetabox Building</title>
        <meta name="description" content="Zetabox 3D Building" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MQTTComponent />
        <Building/>
      </main>
    </>
  )
}
