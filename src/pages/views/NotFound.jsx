import { Helmet } from 'react-helmet'

const NotFound = (props) => {
  return (
    <div className="not-found-container">
      <Helmet>
        <title>404 - Not Found</title>
      </Helmet>
      <h1>404</h1>
      <h2>OOPS! PAGE NOT FOUND</h2>
      <p>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</p>
    </div>
  );
};

export default NotFound
