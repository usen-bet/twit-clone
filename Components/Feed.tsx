import { RefreshIcon } from "@heroicons/react/outline"
import TweetBox from "./TweetBox"
import { Tweet } from "../typings"
import Twit from "./Twit"
import { fetchTweets } from "../Utility/fetchTweets"
import toast from 'react-hot-toast'
import { useState } from 'react'

interface Props {
  tweets: Tweet[] 
}

const Feed = ({ tweets: tweetsProp }: Props) => {

  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)

  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...')

    const tweets = await fetchTweets()
    setTweets(tweets)

    toast.success('Feed Updated!', { 
      id:refreshToast
    })
  }
  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex items-center justify-between ">
          <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>  
        <RefreshIcon
          onClick={handleRefresh}
          className="h-8 w-8 mr-8 mt-8 cursor-pointer
         text-twitter transition-all duration-500 ease-out
         hover:rotate-180 group-active:scale-125"
        /> 
    </div>          
      <div className="">
      <TweetBox setTweets={setTweets} />    
      </div>  
      <div> 
        {tweets.map(tweet => (
            <Twit key={tweet._id} tweet={tweet} />
        ))
          
          }
      </div>
      </div>
      
  )
}

export default Feed