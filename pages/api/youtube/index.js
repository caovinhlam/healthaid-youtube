import axios from "axios";

const options = {
  method: "GET",
  url: `https://${process.env.NEXT_PUBLIC_RAPID_URL}/search`,
  params: {
    relatedToVideoId: "7aekxC_monc",
    part: "id,snippet",
    type: "video",
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_URL,
  },
};

export default async function handler(req, res) {
  return axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      const jsonData = response.data;
      res.status(200).json(jsonData)
    })
    .catch(function (error) {
      console.error(error);
      res.status(400).json(error.res.data);
    });
}


