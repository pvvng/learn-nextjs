import Link from "next/link";

export const metadata = {
  title: "Home",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

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
    <div>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={`movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </div>
  );
}