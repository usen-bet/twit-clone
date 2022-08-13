import {  
    CalendarIcon,
    EmojiHappyIcon,
    LocationMarkerIcon,
    PhotographIcon,
    SearchCircleIcon
} from "@heroicons/react/outline"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useState, useRef, MouseEvent, SetStateAction, Dispatch } from "react"
import User from "../Public/Images/User.png"
import { Tweet, TweetBody } from "../typings"
import toast from "react-hot-toast"
import { fetchTweets } from "../Utility/fetchTweets"

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({ setTweets }: Props) => {
    const [image, setImage] = useState<string>("")
    const [input, setInput] = useState<string>("")
    const [imageUrl, setImageUrl] = useState<boolean>(false)
    const imageInputRef = useRef<HTMLInputElement>(null)
    const { data: session } = useSession()
    
    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

                  if (!imageInputRef.current?.value) return
                      
                      setImage(imageInputRef.current.value)
                      imageInputRef.current.value = '';
                      setImageUrl(false)
                  
    }
    const postTweet = async () => {
        const tweetInfo: TweetBody = {
        text: input,
        username: session?.user?.name || 'Unknown user'  , 
        profileImg: session?.user?.image || '65247.jpg',
        Image: image,
    }
    
    const result = await fetch(`/api/addTweet`, {
        body: JSON.stringify(tweetInfo),
        method: 'POST',
    })

        const json = await result.json()
        
        const newTweets = await fetchTweets();
        setTweets(newTweets)
        toast('Tweet Posted') 

        return json
        
    }
    


    const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        e.preventDefault()
        postTweet();
        setInput('')
        setImage('')
        setImageUrl(false)
                  
    }
    return (
      <div className="flex space-x-2 p-5 ">
          <div  className="h-14 w-14 object-cover mt-4">
              <Image
                  className="rounded-full"
                  src={session?.user?.image ||  User}
                  alt=""
              />
          </div> 
          <div className="flex flex-1 items-center pl-2">
              <form className="flex flex-1 flex-col">
              <input
                      type="text"
                      value={input}
                      onChange={(e) => {setInput(e.target.value)}}
                      placeholder="Whats Happening?"
                      className="h-24 w-full text-xl outline-none 
                      placeholder:text-xl"
              />
                  <div className="flex items-center">
              <div className="flex flex-1 space-x-2 text-twitter">
                  <PhotographIcon onClick={() => setImageUrl(!imageUrl)} className="h-5 w-5 cursor-pointer transition-transform
                  duration-150 ease-out hover:scale-150" /> 
                  <SearchCircleIcon className="h-5 w-5" />     
                  <EmojiHappyIcon className="h-5 w-5" />
                  <CalendarIcon className="h-5 w-5" />
                  <LocationMarkerIcon className="h-5 w-5" />
              </div>
                        <button
                            className="rounded-full bg-twitter px-5 py-2 
                            font-bold text-white disabled:opacity-40"
                            disabled={!input}
                            onClick={handleSubmit}
                        >
                            Tweet
                        </button>
                  </div>
                  {imageUrl && (
                      <form className="rounded-lg mt-5 flex bg-twitter/80 py-2 px-4 ">
                            <input
                                type="text"
                                ref={imageInputRef}
                             className="flex-1 bg-transparent p-2 text-white outline-none 
                              placeholder:text-white "
                              placeholder="Enter Image URL/Address"/>
                            <button
                                onClick={addImageToTweet}
                                type="submit"
                                
                                className="font-bold text-white"
                            >
                              Add Image
                          </button>
                    </form>  
                    )} 
                    {image && <img className="mt-10 h-40 w-full rounded-xl object-contain
                    shadow-lg" src={image} />}     
          </form>
          </div>
    </div>
  ) 
}

export default TweetBox