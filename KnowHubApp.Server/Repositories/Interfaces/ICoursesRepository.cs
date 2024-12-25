using KnowHubApp.Server.Data.Entities;

namespace KnowHubApp.Server.Repositories.Interfaces
{
    public interface ICoursesRepository
    {

        Task<List<CourseEntity>> ShowAll();
        Task<CourseEntity> UploadCourse(CourseEntity courseEntity);
        Task<string> DeleteCourse(Guid id);

        Task<CourseEntity> UpdateCourse(CourseEntity courseEntity, Guid id);

        Task<CourseEntity> GetCourseById(Guid id);
    }
}
