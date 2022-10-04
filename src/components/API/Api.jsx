import axios from 'axios';

const KEY = "29228905-12cd39cd1befa2d2c4090f04e";
const URL = "https://pixabay.com/api/";

const instance = axios.create({
  baseURL: URL,
  params: {
    key: KEY,
    image_type: "photo",
    orientation: "horizontal",
    per_page: 12,
  }
});

export const searchImages = async (q, page = 1) => {
  const { data } = await instance.get("/", {
    params: {
      q,
      page,
    }
  })
  return data;
}