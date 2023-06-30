import styled from "styled-components";
import Input from "./Input";
import StarsRating from "./StarsRating";
import Textarea from "./Textarea";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const SubTitle = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;

const ColsWrapper = styled.div`
 display: grid;
 grid-template-columns: 1fr;
 gap 20px;
 margin-bottom: 5px;
 @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap 40px;
 }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 1px 2px 2px rgba(25, 50, 47, 0.08),
    0px 3px 4px rgba(18, 71, 52, 0.02), 0px 1px 5px rgba(18, 71, 52, 0.03);
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const RevieWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid #eee;
  padding: 10px 0;
  h3 {
    margin: 3px 0;
    padding: 0;
    font-size: 1rem;
    color: #333;
    font-weight: semibold;
  }
  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1rem;
    color: #555;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time {
    font-size: 12px;
    color: #aaa;
  }
`;

export default function ProductReviews({ product }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [stars, seStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  function submitReview() {
    if (stars === 0) {
      alert("Selecione pelo menos uma estrela!");
      return;
    }
    if (title.trim() === "") {
      alert("Preencha o título!");
      return;
    }
    if (desc.trim() === "") {
      alert("Preencha a descrição!");
      return;
    }
    const data = { title, desc, stars, product: product._id };
    axios.post("/api/reviews", data).then((res) => {
      setTitle("");
      setDesc("");
      seStars(0);
      loadRewviews();
    });
  }
  useEffect(() => {
    loadRewviews();
  }, []);
  function loadRewviews() {
    setReviewsLoading(true);
    axios.get("/api/reviews?product=" + product._id).then((res) => {
      setReviews(res.data);
      setReviewsLoading(false);
    });
  }

  return (
    <div>
      <Title>Avaliações</Title>
      <ColsWrapper>
        <div>
          <Box>
            <SubTitle>Adicionar avaliação</SubTitle>
            <div>
              <StarsRating onChange={seStars} />
            </div>
            <Input
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="Título"
            />
            <Textarea
              value={desc}
              onChange={(ev) => setDesc(ev.target.value)}
              placeholder="Digite sua avaliação aqui"
            />
            <div>
              <Button onClick={submitReview} primary={true}>
                Enviar avaliação
              </Button>
            </div>
          </Box>
        </div>
        <div>
        <Box>
          <SubTitle>Avaliações recentes</SubTitle>
          {reviewsLoading && <Spinner fullWidth={true} />}
          {reviews.length === 0 && <p>Sem avaliações :(</p>}
          {reviews.length > 0 &&
            reviews.map((review) => (
              <RevieWrapper key={review._id}>
                <ReviewHeader>
                  <StarsRating
                    size={"sm"}
                    disabled={true}
                    defaultHowMany={review.stars}
                  />
                  <time>
                    {new Date(review.createdAt).toLocaleDateString("pt-BR")}
                  </time>
                </ReviewHeader>
                <h3>{review.title}</h3>
                <p>{review.desc}</p>
              </RevieWrapper>
            ))}
        </Box>
        </div>
      </ColsWrapper>
    </div>
  );
}
