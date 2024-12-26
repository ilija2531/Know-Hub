using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace KnowHubApp.Server.Data.Entities
{
    public class UserEntity : IdentityUser
    {
        [Required]
        public required string FullName { get; set; }

    }
}


