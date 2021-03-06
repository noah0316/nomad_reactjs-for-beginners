import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import FlagEmoji from "Components/FlagEmoji";
import CastPoster from "Components/CastPoster";
import Carousel from "react-elastic-carousel";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0px;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 13px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Youtube = styled.iframe`
  border-radius: 4px;
  margin-top: 25px;
  width: 1200px;
  height: 500px;
`;

const Trailer = styled.div`
  display: ${(props) => (props.isExist ? "block" : "none")};
`;

const Button = styled.button`
  all: unset;
  font-size: 20px;
  padding-top: 3%;

  :hover {
    color: grey;
  }
`;

const CastTitle = styled.h3`
  font-size: 32px;
  margin-top: 1%;
  position: absolute;
`;

const CastContainer = styled.div`
  overflow-x: scroll;
  display: flex;
  margin-left: auto;
  margin-top: 1.5%;
`;

const DetailPresenter = ({
  result,
  credits,
  loading,
  error,
  handleButton,
  button,
}) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <>
            {result.production_countries
              ? result.production_countries.map((country, index) => (
                  <FlagEmoji key={index} country={country.iso_3166_1} />
                ))
              : result.origin_country.map((country, index) => (
                  <FlagEmoji key={index} country={country} />
                ))}
          </>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime
                ? result.runtime
                : result.episode_run_time
                ? result.episode_run_time[0]
                : ""}{" "}
              min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>

          {result.videos.results[0]?.key ? (
            <>
              <Button onClick={handleButton}>Trailer</Button>
              <Trailer isExist={button}>
                <Carousel key={result.id}>
                  {result.videos.results.map((index) => (
                    <Youtube
                      key={index.id}
                      id="ytplayer"
                      type="text/html"
                      src={`https://www.youtube.com/embed/${index.key}`}
                      frameborder="0"
                    ></Youtube>
                  ))}
                </Carousel>
              </Trailer>
            </>
          ) : (
            <> </>
          )}
        </Data>
      </Content>
      <CastTitle>Cast</CastTitle>
      <CastContainer>
        {credits.cast.map((cast) => (
          <CastPoster
            key={cast.id}
            imageUrl={cast.profile_path}
            character={cast.character}
            name={cast.name}
          ></CastPoster>
        ))}
      </CastContainer>
    </Container>
  );
DetailPresenter.propTypes = {
  result: PropTypes.object,
  credits: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  button: PropTypes.bool.isRequired,
  handleButton: PropTypes.func.isRequired,
};

export default DetailPresenter;
