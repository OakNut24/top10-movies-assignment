namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {

        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public readonly ImageService _imageService;

        public MoviesController(StoreContext context, IMapper mapper, ImageService imageService)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }

        [HttpGet("{genre}", Name = "GetMovies")]
        public async Task<ActionResult<List<Movie>>> GetMovies(string genre) //Get the movies list by genre, if genre ='' then it will return ALL the movies
        {
            var query = _context.Movies
            .SortByRating()
            .FilterByGenre(genre)
            .AsQueryable();


            return await query.ToListAsync();
        }
        [HttpGet("details/{id}", Name = "GetMovie")]
        public async Task<ActionResult<Movie>> GetMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null) return NotFound();
            return movie;
        }

        [HttpPost]
        public async Task<ActionResult<List<Movie>>> AddMovie([FromForm] CreateMovieDto movieDto)
        {
            var movie = _mapper.Map<Movie>(movieDto); //Map movieDto object to the entity object
            if (movieDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(movieDto.File); //Adding the image to the cloud and getting its details

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                //Saving the image url for client side and publicid for future reference from the server side(deletion)
                movie.ImageUrl = imageResult.SecureUrl.ToString();
                movie.PublicId = imageResult.PublicId;
            }
            bool isNameTaken = await IsNameTaken(movie.Name);
            if (!isNameTaken)
            {
                _context.Movies.Add(movie);
                var result = await _context.SaveChangesAsync() > 0;
                var resultDeletion = await DeleteLowestRatingMovie(); //Awaiting for the deletion of the lowest rating movie

                if (result) return CreatedAtRoute("GetMovie", new { Id = movie.Id }, movie);
                return BadRequest(new ProblemDetails { Title = "Problem creating new product" });

            }
            else
            {
                return BadRequest(new ProblemDetails { Title = "Movie name is taken" });

            }



        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMovie(int id) //Deletes a movie, including its image on the cloud
        {
            var movie = await _context.Movies.FindAsync(id);

            if (movie == null) return NotFound();

            if (!string.IsNullOrEmpty(movie.PublicId))
                await _imageService.DeleteImageAsync(movie.PublicId);

            _context.Movies.Remove(movie);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting movie" });
        }
        [HttpDelete("action/deletelowest")]
        public async Task<ActionResult> DeleteLowestRatingMovie() //Finding the movie with the lowest rating and then initiating the DeleteMovie function
        {
            var query = _context.Movies
                       .SortByRating()
                       .AsQueryable();
            List<Movie> result = await query.ToListAsync();
            return await DeleteMovie(result[result.Count - 1].Id);
        }

        [HttpGet("action/isnametaken/{name}", Name = "IsNameTaken")]
        public async Task<bool> IsNameTaken(string name)
        {
            var query = _context.Movies
           .SortByRating()
           .AsQueryable();
            List<Movie> result = await query.ToListAsync();

            foreach (Movie movie in result)
            {
                if (movie.Name.ToLower() == name.ToLower())
                {
                    return true;
                }
            }
            return false;
        }

    }
}