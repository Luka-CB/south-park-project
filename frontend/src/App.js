import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ImageProvider from "./context/imageUpload";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import SeasonsPage from "./pages/SeasonsPage";
import { Spinner } from "./components/Spinner";
import SeasonCreate from "./pages/SeasonCreate";
import ErrorPage from "./pages/ErrorPage";
import SeasonUpdate from "./pages/SeasonUpdate";
import SeasonDetails from "./pages/SeasonDetails";
import CreateEpisode from "./pages/CreateEpisode";
import UpdateEpisode from "./pages/EditEpisode";
import Episode from "./pages/Episode";
import Footer from "./components/Footer";
import RatedEpisodes from "./pages/RatedEpisodes";
import FavoriteEpisodes from "./pages/FavoriteEpisodes";
import NewsPage from "./pages/NewsPage";
import SingleNews from "./pages/SingleNews";
import AboutPage from "./pages/AboutPage";

function App() {
  const { success: logoutSuccess, loading: logoutLoading } = useSelector(
    (state) => state.logout
  );

  useEffect(() => {
    if (logoutSuccess) window.location.reload();
  }, [logoutSuccess]);

  return (
    <Router>
      <Header />
      {logoutLoading && <Spinner />}
      <ImageProvider>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile/:name" component={Profile} exact />
          <Route
            path="/profile/:name/rated_episodes"
            component={RatedEpisodes}
          />
          <Route
            path={"/profile/:name/favorite_episodes"}
            component={FavoriteEpisodes}
          />
          <Route path="/seasons" component={SeasonsPage} exact />
          <Route path="/seasons/create" component={SeasonCreate} />
          <Route path="/seasons/:num/update" component={SeasonUpdate} />
          <Route path="/seasons/:num" component={SeasonDetails} exact />
          <Route path="/seasons/:id/create_episode" component={CreateEpisode} />
          <Route path="/seasons/episode/:id/edit" component={UpdateEpisode} />
          <Route path="/episode/:id" component={Episode} />
          <Route path="/news" component={NewsPage} exact />
          <Route path="/news/:id" component={SingleNews} />
          <Route path="/about" component={AboutPage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </ImageProvider>
      <Footer />
    </Router>
  );
}

export default App;
