namespace API.Extensions
{
    public static class MovieExtension
    {
        public static IQueryable<Movie> SortByRating(this IQueryable<Movie> query)
        {
            return query.OrderByDescending(m => m.Rating);
        }

        public static IQueryable<Movie> FilterByGenre(this IQueryable<Movie> query, string genre)
        {
            if (genre != "All")
            {
                query = query.Where(m => m.Genre == genre);
            }
            return query;
        }

        public static IQueryable<Movie> LowestMovieId(this IQueryable<Movie> query) //deletes the lowest rated movie
        {
            query = query.SortByRating();
            return query;
        }



    }
}