import FiltersAndSearch from "./FiltersAndSearch";
import Blogs from "./Blogs";
import Hero from "./Hero";

function Main() {
  return (
    <main className="container main">
      <Hero />
      <FiltersAndSearch />
      <Blogs />
    </main>
  );
}

export default Main;
