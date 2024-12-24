using KnowHubApp.Server.Data.DTOs;
using KnowHubApp.Server.Data.Entities;

namespace KnowHubApp.Server.Services.Interfaces
{
    public interface ICoursesService
    {

        Task<string> UploadCourse (UploadCourseDTO uploadCourseDTO, string userId);

        Task<List<ShowAllDTO>> ShowAll();

        Task<string> DeleteCourse (Guid Id);

    }
}
