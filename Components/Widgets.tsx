import { SearchIcon } from "@heroicons/react/outline"
import {
    TwitterTimelineEmbed,
    TwitterShareButton,
    TwitterFollowButton,
    TwitterHashtagButton,
    TwitterMentionButton,
    TwitterTweetEmbed,
    TwitterMomentShare,
    TwitterDMButton,
    TwitterVideoEmbed,
    TwitterOnAirButton
} from 'react-twitter-embed';


const Widgets = () => {
  return (
      <div className="hidden px- mt-2 col-span-2 lg:block">
         <div className="rouunded-full bg-gray-100 p-3 flex
      space-x-2 mt-2 items-center ">
          <SearchIcon className="h-5 w-5 text-gray-400" />
          <input
              type="text"
              placeholder="Type Here..."
          className="flex-1 bg-transparent outline-none"/>
          </div>
          <TwitterTimelineEmbed
           sourceType="profile"
           screenName="saurabhnemade"
           options={{height:1000}}
          />
          

     </div>
  )
}

export default Widgets