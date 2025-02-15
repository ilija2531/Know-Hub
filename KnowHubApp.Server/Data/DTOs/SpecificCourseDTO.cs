using System.ComponentModel.DataAnnotations;

namespace KnowHubApp.Server.Data.DTOs
{
    public class SpecificCourseDTO
    {

        [Key]
        public Guid CourseDTOID { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public string Path { get; set; }

        


    }
}
