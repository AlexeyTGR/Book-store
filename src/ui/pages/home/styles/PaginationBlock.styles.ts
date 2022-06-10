import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 60px 0 60px;
  .back {
    transform: rotate(180deg);
  }

  .arrow {
    margin: 0 36px;
    cursor: pointer;
  }

  .page {
    width: 9px;
    height: 9px;
    border: 3px solid #0D1821;
    border-radius: 50%;
    margin: 0 36px;
    cursor: pointer;
  }

  .page__current {
    background-color: #0D1821
  }
`;

export default PaginationWrapper;