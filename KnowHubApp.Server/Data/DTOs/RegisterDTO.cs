using System.ComponentModel.DataAnnotations;

namespace KnowHubApp.Server.Data.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public required string FullName { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        public required string Password { get; set; }

        [Required]
        public required string UserName { get; set; }

    }
}
