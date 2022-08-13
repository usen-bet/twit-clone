import { Tweet, Comment } from "../typings"
import TimeAgo from "react-timeago"
import {
    ChatAlt2Icon,
    HeartIcon,
    SwitchHorizontalIcon,
    UploadIcon
} from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { fetchComments } from "../Utility/fetchComment"
import ReactTimeago from "react-timeago"

interface Props {
  tweet: Tweet 
}


const Twit = ({ tweet }: Props) => {
    const [comments, setComments] = useState<Comment[]>([])

    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id)
        setComments(comments);
    }

    useEffect(() => {
        refreshComments();
    }, [])
 
  return (
      <div className="flex flex-col space-x-2 border-y border-gray-100 p-5">
          <div className="flex space-x-3">
              <img 
                  className="h-10 w-10 rounded-full object-cover"
                  src={tweet.profileImg}
              />
              <div>
                  <div className="flex items-center space-x-1 " >
                      <p className="mr-1 font-bold">{tweet.username}</p>
                      <p className="hidden text-sm text-gray-500 sm:inline">@{tweet.username.replace(/ \s+/g, '').toLowerCase()}</p>
                      <TimeAgo
                          className="text-sm text-gray-500"
                          date={tweet._createdAt}
                      />
                  </div>
                  <p>
                      {tweet.text}
                  </p>
                  {tweet.Image && <img src={tweet.Image} alt=""
                      className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm" />}
              </div>
          </div>
          <div className="mt-5 flex justify-between">
              <div className="flex cursor-pointer items-center space-x-3 text-gray-600">
                  <ChatAlt2Icon className="h-5 w-5" />  
               <p></p>   
              </div>
              <div className="flex cursor-pointer items-center space-x-3 text-gray-600">
               <SwitchHorizontalIcon className="h-5 w-5"/>    
              </div>  
              <div className="flex cursor-pointer items-center space-x-3 text-gray-600">
                <HeartIcon className="h-5 w-5"/>   
              </div>              
              <div className="flex cursor-pointer items-center space-x-3 text-gray-600">
                <UploadIcon className="h-5 w-5"/>   
              </div>              
          </div>
          {comments?.length > 0 && (
              <div className="my-2 mt-5 max-h-44 
                border-t border-gray-100 p-5">
                  {comments.map(comment => (
                      <div key={comment._id} className="relative flex space-x-2">
                          <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
                          <img
                              src={comment.profileImg}
                              className="mt-2 h-7 w-7 rounded-full object-cover"
                              alt=""
                          />
                          <div>
                              <div className="flex items-center space-x-1">
                                  <p className="mr-1 font-bold">{comment.username}</p>
                                  <p className="hidden text-sm">@{comment.username.replace(/\s+/g, '').toLowerCase()}</p>
                              <ReactTimeago
                                  className="text-sm text-gray-500"
                                  date={comment._createdAt}
                              />
                              </div>
                              <p>{ comment.comment }</p>
                              
                          </div>

                          </div>
                  ))}
              </div>
          )}
    </div>
  )
}

export default Twit