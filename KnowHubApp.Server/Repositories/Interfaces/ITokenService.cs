using KnowHubApp.Server.Data.Entities;

namespace KnowHubApp.Server.Repositories.Interfaces
{
    public interface ITokenService
    {

        string CreateToken(UserEntity user);

    }
}
