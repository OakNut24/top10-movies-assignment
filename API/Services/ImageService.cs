
namespace API.Services
{
    public class ImageService
    {
        private readonly Cloudinary _cloudinary;
        public ImageService(IConfiguration config)
        {
            // config.GetConnectionString("CloudName")

            var acc = new Account(config.GetSection("Cloudinary")["CloudName"], config.GetSection("Cloudinary")["APIKey"], config.GetSection("Cloudinary")["APISecret"]);
            _cloudinary = new Cloudinary(acc);
        }

        public async Task<ImageUploadResult> AddImageAsync(IFormFile file) //Adding an image to the cloud and getting the imgurl
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream)
                };
                uploadResult = await _cloudinary.UploadAsync(uploadParams);

            }
            return uploadResult;
        }

        public async Task<DeletionResult> DeleteImageAsync(string publicId)
        {
            var deletesPrams = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(deletesPrams);

            return result;
        }
    }
}