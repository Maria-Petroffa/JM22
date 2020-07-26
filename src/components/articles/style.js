import styled from 'styled-components';

export const ArticleWrap = styled.div`
display: flex;
justify-content: space-between;
margin-top: 20px;
margin-right: 20px;
margin-left: 20px;
max-width: 941px;
min-height: 140px;
background: #FFFFFF;
border-radius: 5px;
`;

export const ArticleContent = styled.div`
margin-top: 15px;
margin-left: 20px;
margin-right: 20px;
`;

export const ArticleContentTitle = styled.div`
display: inline-block;
font-family: Inter;
font-weight: normal;
font-size: 20px;
color: #1890FF;
`;

export const ArticleContentFavorites = styled.div`
display: inline-block;
margin-left: 13px;
`;

export const ArticleContentFavoritesCount = styled.div`
display: inline-block;
margin-left: 5px;
font-style: normal;
font-size: 12px;
line-height: 22px;
color: rgba(0, 0, 0, 0.75);
`;

export const ArticleContentDescription = styled.div`
margin-top: 5px;
font-style: normal;
font-size: 12px;
color: rgba(0, 0, 0, 0.5);
`;

export const ArticleContentBody = styled.div`
margin-top: 5px;
font-style: normal;
font-size: 15px;
color: rgba(0, 0, 0, 0.75);
`;

export const ArticleContentTag = styled.div`
margin-top: 10px;
`;

export const ArticleAutor = styled.div`
display: flex;
flex-wrap: nowrap;
margin-top: 15px;
margin-right: 15px;
`;

export const ArticleAutorName = styled.div`
font-style: normal;
font-size: 18px;
color: rgba(0, 0, 0, 0.85);
`;

export const ArticleCreatedCount = styled.div`
margin-top: 10px;
font-style: normal;
font-size: 12px;
color: rgba(0, 0, 0, 0.5);
margin-bottom: 20px;
`;

export const ArticleAutorDescription = styled.div`
margin-right: 12px;
`;

export const ArticleAutorFoto = styled.img`
border-radius: 50%;
width: 46px;
height: 46px;
`;

export const ArticleHeader = styled.div`
margin-right: auto;
margin-left: auto;
font-weight: bold;
font-size: 20px;
margin-bottom: 20px;
color: #262626;
`;
