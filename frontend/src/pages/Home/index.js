import React from 'react';
import Footer from '../../components/Footer/footer';
import Destination from '../../components/Destination';
import { Wrap } from './styles';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Fonts/fonts';

function Home() {
  const navigator = useNavigate();
  const handleClickDestination = (event) => {
    event.preventDefault();
    const id = event.currentTarget.querySelector('span').innerText; // 나라명
    navigator(`/detail/${id}`);
  };
  // test data
  const bestDestination = [
    {
      title: '도쿄',
      imgUrl:
        'https://search.pstatic.net/common?src=http%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F1b%2Fde%2F4e%2F5f%2Fphoto3jpg.jpg&type=w800_travelsearch',
      companion: '김지홍',
    },
    {
      title: '영국',
      imgUrl:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMjZfMjcg%2FMDAxNjc0NzI3OTgxMzc2.cOSJIS85UD67Hqf56HgnS7YujYXIFSxOeNlUIHeGpyUg.fbJB2wA0RgHV_ZlawXrSZjLKEejo7ffVG5xZVUL61bkg.JPEG.dhyoon0308%2FIMG_2664.JPG&type=sc960_832',
      companion: '남상림',
    },
    {
      title: '이집트',
      imgUrl:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMjVfMjc1%2FMDAxNjc3Mjk4ODA0MjMy.arcEsUyclA9O9WP-XZQGPWNiz2XpPK6dylh3HmYCSeMg.MJ7dQKQzvneeQlCqqH1OZyGucD2oIW5OHe0rhZxl0g0g.JPEG.intel007%2FIMG_5581.JPG&type=sc960_832',
      companion: '윤서영',
    },
  ];

  return (
    <div>
      <Wrap>
        <Title margin={'20px 0'}>추천하는 여행지 & 비슷한 사용자</Title>
        {bestDestination.map((destination) => (
          <Destination
            onClick={handleClickDestination}
            key={destination.title}
            title={destination.title}
            imgUrl={destination.imgUrl}
            companion={destination.companion}
          />
        ))}
      </Wrap>
      <Footer />
    </div>
  );
}
export default Home;