import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styled from "styled-components";
import { Padding } from "@mui/icons-material";

const SplideCarousel = ({ users }) => {
  return (
    <Splide
      options={{ rewind: true, perPage: 2, focus: 0, omitEnd: true, }}
      aria-label="React Splide Example"
    >
      {users.map((row, id) => {
        return (
          <SplideSlide style={{backgroundColor: "purple"}}>
            <Display style={{backgroundImage: `url(${row.image})`}}/>
          </SplideSlide>
        );
      })}
    </Splide>
  );
};



export default SplideCarousel;

const Display = styled.div`
  border-radius: 10px;
  width: 215px;
  height: 150px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
`;
