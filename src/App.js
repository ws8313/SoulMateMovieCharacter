import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { Loading } from "./components";

const MainPage = lazy(() => import("./pages/MainPage"));
const TestPage = lazy(() => import("./pages/TestPage"));
const TestCompletedPage = lazy(() => import("./pages/TestCompletedPage"));
const MbtiCharacterPage = lazy(() => import("./pages/MbtiCharacterPage"));
const MbtiCharacterMovieListPage = lazy(() =>
  import("./pages/MbtiCharacterMovieListPage")
);
const MbtiCompatiblePage = lazy(() => import("./pages/MbtiCompatiblePage"));
const MbtiCompatibleMovieListPage = lazy(() =>
  import("./pages/MbtiCompatibleMovieListPage")
);
const MbtiTop10Page = lazy(() => import("./pages/MbtiTop10Page"));
const MovieInfoPage = lazy(() => import("./pages/MovieInfoPage"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/TestPage" component={TestPage} />
          <Route path="/TestCompletedPage" component={TestCompletedPage} />
          <Route path="/MbtiCharacterPage" component={MbtiCharacterPage} />
          <Route
            path="/MbtiCharacterMovieListPage"
            component={MbtiCharacterMovieListPage}
          />
          <Route path="/MovieInfoPage" component={MovieInfoPage} />
          <Route path="/MbtiCompatiblePage" component={MbtiCompatiblePage} />
          <Route
            path="/MbtiCompatibleMovieListPage"
            component={MbtiCompatibleMovieListPage}
          />
          <Route path="/MbtiTop10Page" component={MbtiTop10Page} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
