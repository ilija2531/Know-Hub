using KnowHubApp.Server.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace KnowHubApp.Server.Data.DTOs
{
    public class ShowAllDTO
    {

        [Key]
        public Guid CourseDTOID { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public string Path { get; set; }

        [Required]
        public string FullName { get; set; }

    }
}
