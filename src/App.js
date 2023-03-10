import { useState, useEffect } from "react";

const App = () => {
  // state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
  const [url, setUrl] = useState(
    "http://hn.algolia.com/api/v1/search?query=react"
  );
  const [loading, setLoading] = useState(false);

  // fetch news
  const fetchNews = () => {
    fetch(url)
      .then((result) => result.json())
      .then((data) => (setNews(data.hits), setLoading(false)))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : "")

  const showForm = () => {
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchQuery} onChange={handleChange} />
      <button>Search</button>
    </form>;
  }

  const showNews = () => {
    return news.map((n, i) => (<p key={i}>{n.title}</p>));
  }

  return (
    <div>
      <h2>News</h2>
      {showLoading()}
      {showForm()}
      {showNews()}
    </div>
  );
};

// ***************** hook ********************
// const App = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     document.title = `Clicked ${count} times`;
//   })

//   const increment = () => {
//     setCount(count + 1);
//   };

//   return (
//     <div>
//       <h2>counter app</h2>
//       <button onClick={increment}>Click {count} times</button>
//     </div>
//   );
// };

export default App;

// function App() {
//   // eslint-disable-next-line no-undef
//   const state = {
//     count: 0
//   }
//   // eslint-disable-next-line no-undef
//   const increment = () => {
//     this.setState({
//       count: this.state.count + 1
//     })
//   }

//   return (
//     <div>
//      <h2>counter app</h2>
//      <button onClick={this.increment}>Click {this.state.count} times</button>
//     </div>
//   );
// }

// export default App;
