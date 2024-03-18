import { usePosts } from "../contexts/PostsContext";

function FiltersAndSearch() {
  const { searchQuery, setSearchQuery, handleFilter } = usePosts();

  return (
    <section className="filterAndSearchSection">
      <div className="filters">
        <button onClick={handleFilter}>All</button>
        <button onClick={handleFilter}>Web Development</button>
        <button onClick={handleFilter}>Data Science</button>
        <button onClick={handleFilter}>AI</button>
      </div>
      <input
        type="text"
        className="search"
        placeholder="Search for blog..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </section>
  );
}

export default FiltersAndSearch;
