import { API_URL } from "../app/(home)/page";

async function getVideos(id: string) {
  // video data 불러오는데만 시간 지연 발생상황 가정
  // await new Promise(resolve => setTimeout(resolve, 3000));

  // 에러 상황 가정
  // throw new Error('something broke..');

  const response = await fetch(`${API_URL}/${id}/videos`, { cache: "force-cache" });

  return await response.json();
}

export default async function MovieVideos({id} : {id:string}){
  const videos = await getVideos(id);

  return <h6>{JSON.stringify(videos)}</h6>
}