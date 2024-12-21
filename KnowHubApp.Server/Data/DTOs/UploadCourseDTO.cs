using KnowHubApp.Server.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace KnowHubApp.Server.Data.DTOs
{
    public class UploadCourseDTO
    {


        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public IFormFile CourseFile { get; set; }


    }
}
