import axios from 'axios'

export const fetchRandomImages = async () => {
  const response = await axios.get('https://api.unsplash.com/photos/random', {
    params: {
      client_id: process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_KEY,
      count: 20,
    },
  })
  return response.data
}
