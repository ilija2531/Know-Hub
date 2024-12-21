using KnowHubApp.Server.Data.DTOs;

namespace KnowHubApp.Server.Services.Interfaces
{
    public interface ICoursesService
    {

        Task<string> UploadCourse (UploadCourseDTO uploadCourseDTO);

    }
}
