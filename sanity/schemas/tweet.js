export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'text in tweet',
      type: 'string',
    },
    {
      name: 'blockTweet',
      title: 'Block tweet',
      description: 'ADMIN Controls:Toggle if Tweet is deemed inappropriate',
      type: 'boolean',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'ProfileImage',
      title: 'Profile image',
      type: 'string',
    },
    {
      name: 'Image',
      title: 'Tweet image',
      type: 'string',
    },

  ],


}
