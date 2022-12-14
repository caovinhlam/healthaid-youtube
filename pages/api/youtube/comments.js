import axios from "axios"

export default function handler(req, res) {
  const options = {
    method: "GET",
    url: "https://youtube-v31.p.rapidapi.com/commentThreads",
    params: {
      videoId: req.query["query"],
      part: "snippet",
      maxResults: "100",
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_URL,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.status(200).json(response.data.items);
    })
    .catch(function (error) {
      console.error(error);
      res.status(400).json(error.res.data);
    });
}
