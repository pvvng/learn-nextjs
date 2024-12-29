import { API_URL } from "../constants/api_url";
import styles from "../styles/movie-videos.module.css";

async function getVideos(id: string) {
  // video data 불러오는데만 시간 지연 발생상황 가정
  // await new Promise(resolve => setTimeout(resolve, 3000));

  // 에러 상황 가정
  // throw new Error('something broke..');

  const response = await fetch(`${API_URL}/${id}/videos`, {
    cache: "force-cache",
  });

  return await response.json();
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);

  return (
    <div className={styles.container}>
      {videos.map((video) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.name}
        />
      ))}
    </div>
  );
}
