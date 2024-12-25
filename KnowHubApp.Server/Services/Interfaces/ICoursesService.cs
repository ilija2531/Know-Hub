using KnowHubApp.Server.Data.DTOs;
using KnowHubApp.Server.Data.Entities;

namespace KnowHubApp.Server.Services.Interfaces
{
    public interface ICoursesService
    {

        Task<string> UploadCourse (UploadCourseDTO uploadCourseDTO, string userId);

        Task<List<ShowAllDTO>> ShowAll();

        Task<string> DeleteCourse (Guid Id);

        Task<UpdatedCourseDTO> UpdateCourse(UpdateCourseDTO updateCourseDTO, Guid id);

        Task<List<UserCourses>> GetUserCourses (string id);

        Task<List<SearchedCourses>> SearchCourses(string id);

        Task<ProfileDataDTO> GetProfileData (string id);

        Task<ProfileDataDTO> UpdateUserDetails(ProfileDataDTO profileDataDTO, string id);

    }
}
