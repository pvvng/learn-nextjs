import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

export const metadata = {
  title: "Movie",
};

interface IParams {
  params: Promise<{ id: string }>;
}

export default async function MovieDetail({ params }: IParams) {
  const { id } = await params;

  // fetch 최적화 방법 1 / Promise.all로 병렬 통신
  // await 연달아 사용하면 (직렬 fetch) 시간이 너무 오래 걸림.
  // promise.all을 활용한 병렬 fetch로 시간 단축 시키기
  // 다만, 두 통신이 모두 완료될때까지 UI는 보이지 않는다는 문제 존재함.
  // const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);

  // fetch 최적화 방법 2 / suspense를 활용하여 컴포넌트를 짜개서 개별적으로 대기하기
  // 컴포넌트를 자신이 렌더링하는 부분만 fetch하도록 쪼갠다.
  // Suspense를 달아서 로딩 상태일때 fallback을 보여준다.
  // 이러면 둘 중 하나가 통신 시간이 좀 걸려도 먼저 완료된 다른 하나가 렌더링된다.
  // 즉, 병렬적으로 데이터 처리가 가능하면서, 먼저 로딩된 부분을 렌더링 가능해지는것.
  return (
    <div>
      {/* await 하는 부분 */}
      <Suspense fallback={<h1>Loading... MovieDetail</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading... Video</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
