using System.ComponentModel.DataAnnotations;

namespace KnowHubApp.Server.Data.DTOs
{
    public class SearchedCourses
    {
        [Key]
        public Guid CourseEntityId { get; set; } = Guid.NewGuid();

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public string Path { get; set; }

        public string FullName { get; set; }
    }
}
