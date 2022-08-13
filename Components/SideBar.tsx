import React from 'react'
import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon,
}
    from '@heroicons/react/outline'
import Image from 'next/image'
import Twitter from "../public/Images/Twitter.png"
import SidebarRow from './SidebarRow'
import { signIn, signOut, useSession } from 'next-auth/react'


const Sidebar = () => {
    const { data:session } = useSession()
  return (
      <div className='flex flex-col items-center col-span-2
      md:items-start'>
          <div  className='h-10 w-10 m-3'>
              <Image className='' src={Twitter} />
          </div>
          <SidebarRow Icon={HomeIcon} title="Home" />
          <SidebarRow Icon={HashtagIcon} title="Explore" />
          <SidebarRow Icon={BellIcon} title="Notifications" />
          <SidebarRow Icon={MailIcon} title="Messages" />
          <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
          <SidebarRow Icon={CollectionIcon} title="Lists" />
          <SidebarRow Icon={UserIcon} onClick={session ? signOut : signIn} title={session ? 'Sign Out' : 'Sign In'} />
          <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
      </div>
  )
}

export default Sidebar