import Movie from "../../components/movie";
import { API_URL } from "../../constants/api_url";
import styles from "../../styles/home.module.css";

export const metadata = {
  title: "Home",
};

async function getMovies() {
  // backend 에서의 통신 지연 발생
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const resonse = await fetch(API_URL, { cache: "force-cache" });
  const json = await resonse.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();

  // getMovies 통신 기다리는 동안 loading page 보여준다
  // isLoading ? "Loading..." : <HomePage /> 랑 비슷한 동작
  // 다만, 위는 client에서, 이는 서버 컴포넌트에서 동작
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
        />
      ))}
    </div>
  );
}
