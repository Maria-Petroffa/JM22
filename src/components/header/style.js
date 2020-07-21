import styled from 'styled-components';

export const Header = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
background: #FFFFFF;
height: 80px;
`;

export const HeaderItem = styled.div`

display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
margin-left: 22px;
margin-right: 22px;
font-weight: normal;
font-size: 18px;

color: rgba(0, 0, 0, 0.85);
`;

export const HeaderSignIn = styled.div`
color: rgba(0, 0, 0, 0.85);
margin-right: 10px;
`;

export const HeaderSignUp = styled.div`
display: block;
width: 110px;
height: 50px;
padding-top: 10px;
padding-left: 20px;

font-weight: normal;
font-size: 18px;

color: #52C41A;

border: 1px solid #52C41A;
border-radius: 5px;
`;
