import { lazy, Suspense } from "react";
import PureLoader from "./PureLoader";

// Loads the app faster
const Providers = lazy(() => import("./Providers"));

const App = () => {
  return (
    <>
      <Suspense fallback={<PureLoader />}>
        <Providers />
      </Suspense>
    </>
  );
};

export default App;
