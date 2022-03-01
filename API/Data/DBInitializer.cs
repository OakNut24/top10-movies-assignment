namespace API.Data
{
    public static class DBInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.Movies.Any()) return;

            var movies = new List<Movie>{
                new Movie
                {
                    Name ="The Amazing Spider-Man",
                    Genre="Action",
                    Rating= 5,
                    ImageUrl="/images/The_Amazing_Spiderman_1.jpeg"
                },
                 new Movie
                {
                    Name ="Sing",
                    Genre="Comedy",
                    Rating= 5,
                    ImageUrl="/images/Sing_1_poster.jpg"
                },
                 new Movie
                {
                    Name ="Encanto",
                    Genre="Comedy",
                    Rating= 4,
                    ImageUrl="/images/Encanto_poster.jpg"
                },
                new Movie
                {
                    Name ="Sing 2",
                    Genre="Comedy",
                    Rating= 4,
                    ImageUrl="/images/Sing_2_poster.jpg"
                },
                 new Movie
                {
                    Name ="The Silence",
                    Genre="Thriller",
                    Rating= 3,
                    ImageUrl="/images/The_Silence_Poster.jpg"
                },
                new Movie
                {
                    Name ="The Giver",
                    Genre="Thriller",
                    Rating= 1,
                    ImageUrl="/images/The_Giver_poster.jpg"
                },
                new Movie
                {
                    Name ="Die Hard",
                    Genre="Action",
                    Rating= 3,
                    ImageUrl="/images/Die_Hard_1.jpg"
                },
                new Movie
                {
                    Name ="Kingsman",
                    Genre="Action",
                    Rating= 2,
                    ImageUrl="/images/Kingsman_1.jpg"
                },
                 new Movie
                {
                    Name ="Star Trek Beyond",
                    Genre="Science Fiction",
                    Rating= 2,
                    ImageUrl="/images/Star_Trek_Beyond.png"
                },
                 new Movie
                {
                    Name ="Titanic",
                    Genre="Drama",
                    Rating= 1,
                    ImageUrl="/images/Titanic_(1997_film)_poster.png"
                }
            };

            foreach (var movie in movies)
            {
                context.Movies.Add(movie);
            }

            context.SaveChanges();
        }

    }
}