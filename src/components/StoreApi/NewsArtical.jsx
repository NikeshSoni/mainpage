
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';

const NewsArtical = ({ setStoreApi, filterData }) => {


  // const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {

      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=603cac94f6754be3bcd0791c3f6ba9f6`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStoreApi(data.articles)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);



  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='row flex-wrap mx-auto my-4 container  gap-4 justify-content-center'>

      {filterData.map((article, index) => (
        <Card key={index} className='cardWapper' style={{ width: '18rem' }}>
          <Card.Img variant="top" src={article.urlToImage} />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>
              {article.description}
            </Card.Text>
            <Button variant="primary">
              <a href={article.url} className='text-white text-decoration-none' target="_blank" rel="noopener noreferrer ">Read more</a>
            </Button>
          </Card.Body>
        </Card>
      ))}

    </div>
  )
}

export default NewsArtical