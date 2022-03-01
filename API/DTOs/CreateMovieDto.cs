using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateMovieDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Genre { get; set; }
        [Required]
        [Range(0, 5)]
        public int Rating { get; set; }
        [Required]
        public IFormFile File { get; set; }
    }
}