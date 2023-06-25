import styled from "styled-components";

const StyledOrder = styled.div`
  display: flex;
  margin: 10px 0;
  padding: 10px 0;
  gap: 20px;
  border-bottom: 1px solid #ddd;
  align-items: center;
  time {
    font-size: 0.9rem;
    font-weight: bold;
    color: #555;
  }
`;

const ProductRow = styled.div`
  span {
    color: #aaa;
  }
`;
const Adress = styled.div`
   font-size: .9rem;
   line-height: 1.1rem;
   margin-top: 5px;
   color: #888;
`;

export default function SingleOrder({ line_items, createdAt, ...rest }) {
  return (
    <StyledOrder>
      <div>
        <time>
          {new Date(createdAt).toLocaleString("pt-BR").replace(/\//g, "-")}
        </time>
        <Adress>
            {rest.name}<br/>
            {rest.email}<br/>
            {rest.streetAddress}<br/>
            {rest.district}, {rest.complement} <br/>
            {rest.city}, {rest.state}, {rest.zipCode}<br/>
        </Adress>
      </div>
      <div>
        {line_items.map((item) => (
          <ProductRow>
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
    </StyledOrder>
  );
}
