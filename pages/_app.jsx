import '../style.css'
import Head from 'next/head'

function App ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Jogo da Velha</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App