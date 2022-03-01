namespace API.Entities
{
    public class Movie
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Genre { get; set; }
        public int Rating { get; set; }
        public string ImageUrl { get; set; }
        public string PublicId { get; set; }
    }
}