import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Feed from '../Components/Feed'
import Sidebar from '../Components/SideBar'
import Widgets from '../Components/Widgets'
import { fetchTweets } from '../Utility/fetchTweets'
import { Tweet } from '../typings'
import Toast,{Toaster} from 'react-hot-toast'

interface Props {
  tweets: Tweet[] 
}

const Home = ({ tweets }: Props) => {
 
  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />

      <main className="grid grid-cols-9">
        <Sidebar />
                                                                                                                                                                                                                                                                                                                                                                                                                                           
        <Feed tweets={ tweets } />

        <Widgets />

      </main>

    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();
  return {
    props: {
       tweets,
    },
  }
}
