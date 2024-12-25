using System.ComponentModel.DataAnnotations;

namespace KnowHubApp.Server.Data.DTOs
{
    public class UpdateCourseDTO
    {
        [Key]
        public Guid UpdateCourseDtoId { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public IFormFile CourseFile { get; set; }

    }
}
