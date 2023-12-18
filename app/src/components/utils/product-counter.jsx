export const countGenres = (products) => {
    const genreCounts = {};

    products.forEach(product => {
      const genres = product.genres || [];

      genres.forEach(genre => {
        genreCounts[genre.name] = (genreCounts[genre.name] || 0) + 1;
      });
    });

    const genreCountsArray = Object.keys(genreCounts).map(genre => ({
      genre: genre,
      count: genreCounts[genre],
    }));

    return genreCountsArray.sort((a, b) => b.count - a.count);
  };