using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KnowHubApp.Server.Data.Entities
{
    public class CourseEntity
    {
        [Key]
        public Guid CourseEntityId {  get; set; } = Guid.NewGuid();

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public string Path { get; set; }


        // UserEntity Primary Key
        [ForeignKey("UserEntity")]
        public string Id { get; set; }

        public UserEntity UserEntity { get; set; }




    }
}
